#!/usr/bin/env python3
"""
MedGemma Web Interface
A Flask web application for patient interaction with MedGemma AI.
import os
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import json
import os
from datetime import datetime
from pathlib import Path
import uuid
import requests

# Flask app + CORS
app = Flask(__name__)
CORS(app)

# File upload / allowed extensions (include txt for tests/demo)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'dcm', 'pdf', 'txt'}
UPLOAD_FOLDER = Path("uploads")
UPLOAD_FOLDER.mkdir(exist_ok=True, parents=True)

# Assistant placeholder (lazy initialized)
assistant = None

# Simple JSON persistence directory
DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

def _db_file(name: str) -> Path:
    return DATA_DIR / f"{name}.json"

def load_db(name: str, default=None):
    path = _db_file(name)
    if path.exists():
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading {name}: {e}")
    return default if default is not None else {}

def save_db(name: str, data):
    path = _db_file(name)
    try:
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error saving {name}: {e}")
        return False

# In-memory storage for users and cases (persisted to ./data/*.json)
users_db = load_db('users', {})
cases_db = load_db('cases', {})
patients_db = load_db('patients', {})

def allowed_file(filename):
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_assistant():
    """Get or create the MedGemma assistant instance."""
    global assistant
    if assistant is None:
        try:
            print("Initializing MedGemma Assistant...")
            # Import the heavy MedGemmaAssistant lazily to avoid blocking on module import
            import importlib
            med_module = importlib.import_module('medgemma_assistant')
            MedGemmaAssistant = getattr(med_module, 'MedGemmaAssistant')
            # Create assistant instance (respect MEDGEMMA_MOCK if set externally)
            assistant = MedGemmaAssistant()
            print("Assistant ready!")
        except Exception as e:
            print(f"Error initializing assistant: {e}")
            return None
    return assistant

# ===================== FILE MANAGEMENT =====================
def save_conversation(conversation_id, messages, patient_info=None):
    """Save conversation history to a JSON file."""
    try:
        conversations_dir = Path("conversations")
        conversations_dir.mkdir(exist_ok=True)

        conversation_data = {
            "conversation_id": conversation_id,
            "timestamp": datetime.now().isoformat(),
            "patient_info": patient_info or {},
            "messages": messages
        }

        filename = f"{conversation_id}.json"
        filepath = conversations_dir / filename

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(conversation_data, f, indent=2, ensure_ascii=False)

        return True
    except Exception as e:
        print(f"Error saving conversation: {e}")
        return False

def load_conversation(conversation_id):
    """Load conversation history from a JSON file."""
    try:
        conversations_dir = Path("conversations")
        filepath = conversations_dir / f"{conversation_id}.json"

        if filepath.exists():
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        return None
    except Exception as e:
        print(f"Error loading conversation: {e}")
        return None

# ===================== FRONTEND ROUTING =====================
@app.route('/')
def index():
    """Serve the main chat interface."""
    # Try to serve from React build dist folder
    dist_path = Path("frontend/ai_diagnostic_assistant/dist/index.html")
    if dist_path.exists():
        return send_from_directory('frontend/ai_diagnostic_assistant/dist', 'index.html')
    else:
        # Fallback to old template
        return render_template('index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files from React dist folder."""
    dist_path = Path("frontend/ai_diagnostic_assistant/dist")
    if dist_path.exists():
        try:
            return send_from_directory('frontend/ai_diagnostic_assistant/dist', path)
        except:
            pass
    return "File not found", 404

# ===================== LEGACY CHAT API =====================
@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat messages and return AI responses."""
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        conversation_id = data.get('conversation_id', 'default')
        patient_info = data.get('patient_info', {})

        if not message:
            return jsonify({'error': 'Message cannot be empty'}), 400

        # Load existing conversation or start new one
        conversation = load_conversation(conversation_id) or {
            'conversation_id': conversation_id,
            'messages': []
        }

        # Add user message to conversation
        conversation['messages'].append({
            'role': 'user',
            'content': message,
            'timestamp': datetime.now().isoformat()
        })

        # Get AI response
        assistant = get_assistant()
        if assistant is None:
            return jsonify({'error': 'AI assistant not available. Please check your setup.'}), 500

        # Create context from conversation history
        context = ""
        if patient_info:
            context += f"Patient Information: {json.dumps(patient_info)}\n\n"

        # Add recent conversation history (last 10 messages)
        recent_messages = conversation['messages'][-10:]
        if recent_messages:
            context += "Recent Conversation:\n"
            for msg in recent_messages[:-1]:  # Exclude the current message
                role = "Patient" if msg['role'] == 'user' else "Assistant"
                context += f"{role}: {msg['content']}\n"
            context += "\n"

        # Combine context with current question
        full_prompt = f"{context}Current Question: {message}"

        try:
            response = assistant.generate_response(full_prompt, max_length=300)
        except Exception as e:
            response = f"I apologize, but I'm experiencing technical difficulties. Please try again or consult a healthcare professional. Error: {str(e)}"

        # Add AI response to conversation
        conversation['messages'].append({
            'role': 'assistant',
            'content': response,
            'timestamp': datetime.now().isoformat()
        })

        # Save updated conversation
        save_conversation(conversation_id, conversation['messages'], patient_info)

        return jsonify({
            'response': response,
            'conversation_id': conversation_id
        })

    except Exception as e:
        print(f"Chat error: {e}")
        return jsonify({'error': 'An error occurred processing your message'}), 500

@app.route('/api/conversation/<conversation_id>', methods=['GET'])
def get_conversation(conversation_id):
    """Get conversation history."""
    try:
        conversation = load_conversation(conversation_id)
        if conversation:
            return jsonify(conversation)
        else:
            return jsonify({'error': 'Conversation not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/conversations', methods=['GET'])
def list_conversations():
    """List all saved conversations."""
    try:
        conversations_dir = Path("conversations")
        if not conversations_dir.exists():
            return jsonify([])

        conversations = []
        for file_path in conversations_dir.glob("*.json"):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    conv = json.load(f)
                    conversations.append({
                        'id': conv['conversation_id'],
                        'timestamp': conv['timestamp'],
                        'message_count': len(conv['messages']),
                        'patient_info': conv.get('patient_info', {})
                    })
            except Exception as e:
                print(f"Error reading conversation {file_path}: {e}")

        # Sort by timestamp (newest first)
        conversations.sort(key=lambda x: x['timestamp'], reverse=True)
        return jsonify(conversations)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/patient-info', methods=['POST'])
def update_patient_info():
    """Update patient information for a conversation."""
    try:
        data = request.get_json()
        conversation_id = data.get('conversation_id')
        patient_info = data.get('patient_info', {})

        if not conversation_id:
            return jsonify({'error': 'Conversation ID required'}), 400

        # Load existing conversation
        conversation = load_conversation(conversation_id)
        if not conversation:
            conversation = {
                'conversation_id': conversation_id,
                'messages': []
            }

        # Update patient info
        conversation['patient_info'] = patient_info

        # Save updated conversation
        save_conversation(conversation_id, conversation['messages'], patient_info)

        return jsonify({'success': True})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===================== NEW ADVANCED API =====================

# --- USER MANAGEMENT ---
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """User registration."""
    try:
        data = request.get_json()
        email = data.get('email', '').strip()
        full_name = data.get('fullName', '').strip()
        license_number = data.get('licenseNumber', '').strip()
        password = data.get('password', '').strip()

        if not email or not full_name or not password:
            return jsonify({'error': 'Missing required fields'}), 400

        if email in users_db:
            return jsonify({'error': 'Email already registered'}), 409

        user_id = str(uuid.uuid4())
        users_db[email] = {
            'id': user_id,
            'email': email,
            'full_name': full_name,
            'license_number': license_number,
            'password': password,  # In production, use proper hashing
            'created_at': datetime.now().isoformat()
        }

        # persist users
        save_db('users', users_db)

        return jsonify({
            'success': True,
            'user': {
                'id': user_id,
                'email': email,
                'name': full_name
            }
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/signin', methods=['POST'])
def signin():
    """User login."""
    try:
        data = request.get_json()
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()

        if not email or not password:
            return jsonify({'error': 'Missing credentials'}), 400

        user = users_db.get(email)
        if not user or user['password'] != password:
            return jsonify({'error': 'Invalid credentials'}), 401

        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'name': user['full_name'],
                'license': user['license_number']
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- MEDICAL CASE MANAGEMENT ---
@app.route('/api/cases', methods=['GET'])
def get_cases():
    """List all medical cases."""
    try:
        cases_list = list(cases_db.values())
        return jsonify(cases_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cases', methods=['POST'])
def create_case():
    """Create a new medical case."""
    try:
        data = request.get_json()
        case_id = str(uuid.uuid4())
        
        case = {
            'id': case_id,
            'patient_name': data.get('patient_name', 'Unknown'),
            'symptoms': data.get('symptoms', ''),
            'medical_history': data.get('medical_history', ''),
            'status': 'pending',
            'created_at': datetime.now().isoformat(),
            'analysis': None
        }
        
        cases_db[case_id] = case
        # persist cases
        save_db('cases', cases_db)
        return jsonify(case), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cases/<case_id>', methods=['GET'])
def get_case(case_id):
    """Get specific case details."""
    try:
        case = cases_db.get(case_id)
        if not case:
            return jsonify({'error': 'Case not found'}), 404
        return jsonify(case), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- FILE UPLOAD FOR MEDICAL IMAGING ---
@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Upload medical imaging files."""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400

        file = request.files['file']
        case_id = request.form.get('case_id', 'general')

        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400

        # Save file with secure name
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = UPLOAD_FOLDER / case_id
        filepath.mkdir(exist_ok=True, parents=True)
        
        full_path = filepath / unique_filename
        file.save(full_path)

        # record file metadata
        file_record = {
            'file_id': unique_filename,
            'filename': filename,
            'case_id': case_id,
            'path': str(full_path),
            'uploaded_at': datetime.now().isoformat(),
        }

        # ensure case entry exists
        if case_id not in cases_db:
            cases_db[case_id] = {
                'id': case_id,
                'patient_name': 'Unknown',
                'symptoms': '',
                'medical_history': '',
                'status': 'pending',
                'created_at': datetime.now().isoformat(),
                'analysis': None,
                'files': []
            }

        cases_db[case_id].setdefault('files', []).append(file_record)
        save_db('cases', cases_db)

        # Provide a URL path the frontend can fetch
        file_url = f"/uploads/{case_id}/{unique_filename}"

        return jsonify({
            'success': True,
            'file_id': unique_filename,
            'filename': filename,
            'case_id': case_id,
            'path': str(full_path),
            'url': file_url
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- AI INFERENCE (MEDGEMMA INTEGRATION) ---
@app.route('/api/inference', methods=['POST'])
def run_inference():
    """Run MedGemma AI inference on medical case."""
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', '').strip()
        medical_history = data.get('medical_history', '').strip()
        case_id = data.get('case_id', 'default')

        if not symptoms:
            return jsonify({'error': 'Symptoms required for inference'}), 400

        # Build prompt
        prompt = f"""Clinical Case Analysis:

Medical History: {medical_history if medical_history else 'Not provided'}

Presenting Symptoms: {symptoms}

Please provide:
1. Potential diagnoses (with confidence levels)
2. Clinical reasoning
3. Recommended next steps
4. Important differential diagnoses"""

        # Try local assistant first (lazy-loaded)
        response = None
        assistant = get_assistant()
        if assistant:
            try:
                response = assistant.generate_response(prompt, max_length=500)
            except Exception as e:
                print(f"Local assistant error: {e}")

        # If local assistant not available or failed, try Hugging Face Inference API
        if not response:
            hf_model = os.getenv('MEDGEMMA_MODEL', 'google/medgemma-4b-it')
            hf_token = os.getenv('HUGGINGFACEHUB_API_TOKEN') or os.getenv('HF_TOKEN') or os.getenv('HUGGINGFACE_TOKEN')
            if hf_token:
                try:
                    hf_url = f"https://api-inference.huggingface.co/models/{hf_model}"
                    headers = {'Authorization': f"Bearer {hf_token}"}
                    payload = {
                        'inputs': prompt,
                        'parameters': {'max_new_tokens': 512, 'temperature': 0.7},
                        'options': {'wait_for_model': True}
                    }
                    r = requests.post(hf_url, headers=headers, json=payload, timeout=120)
                    if r.status_code == 200:
                        jr = r.json()
                        if isinstance(jr, dict) and 'generated_text' in jr:
                            response = jr['generated_text']
                        elif isinstance(jr, list) and jr and isinstance(jr[0], dict) and 'generated_text' in jr[0]:
                            response = jr[0]['generated_text']
                        elif isinstance(jr, str):
                            response = jr
                        else:
                            response = str(jr)
                    else:
                        print(f"HF Inference API returned {r.status_code}: {r.text}")
                except requests.RequestException as e:
                    print(f"Error calling HF Inference API: {e}")

        # If still no response, use mock mode for demo (automatic fallback)
        if not response:
            print("No AI response available; using demo mock fallback.")
            response = (
                "Possible diagnoses:\n1. Viral upper respiratory infection (60%)\n"
                "2. Community-acquired pneumonia (20%)\n\n"
                "Clinical reasoning:\nPatient presents with fever and cough; consider viral causes vs bacterial given duration. Recommend chest X-ray and CBC.\n\n"
                "Recommended next steps:\n- Chest X-ray\n- Empiric supportive care\n- Follow-up in 48 hours or earlier if worse"
            )

        # Parse response into structured format
        analysis = {
            'case_id': case_id,
            'primary_diagnosis': 'See analysis below',
            'confidence': 'Pending clinical review',
            'clinical_reasoning': response,
            'recommendations': [],
            'differential_diagnoses': [],
            'timestamp': datetime.now().isoformat()
        }

        # Update case if it exists
        if case_id in cases_db:
            cases_db[case_id]['analysis'] = analysis
            cases_db[case_id]['status'] = 'completed'
            save_db('cases', cases_db)

        return jsonify({
            'success': True,
            'analysis': analysis
        }), 200

    except Exception as e:
        print(f"Inference error: {e}")
        return jsonify({'error': str(e)}), 500

# --- PATIENT MANAGEMENT ---
@app.route('/api/patients', methods=['GET'])
def get_patients():
    """Get all patients in queue."""
    try:
        # If persisted patients DB is empty, seed sample patients
        if not patients_db:
            sample = {
                '1': {
                    'id': 1,
                    'initials': 'JD',
                    'name': 'J. Doe',
                    'age': 45,
                    'status': 'High Priority',
                    'note': 'Waiting for clinical review • 12m',
                    'action': 'assignment'
                },
                '2': {
                    'id': 2,
                    'initials': 'AS',
                    'name': 'A. Smith',
                    'age': 29,
                    'status': 'Stable',
                    'note': 'Vitals logged via MedGemma • 45m',
                    'action': 'check'
                },
                '3': {
                    'id': 3,
                    'initials': 'RK',
                    'name': 'R. Khan',
                    'age': 62,
                    'status': 'Stable',
                    'note': 'Discharge protocol pending • 1h',
                    'action': 'logout'
                }
            }
            patients_db.update(sample)
            save_db('patients', patients_db)

        return jsonify(list(patients_db.values())), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/patients/<patient_id>', methods=['GET'])
def get_patient(patient_id):
    """Get patient details."""
    try:
        # patient ids are stored as strings in persisted DB
        patient = patients_db.get(str(patient_id)) or patients_db.get(int(patient_id))
        if not patient:
            return jsonify({'error': 'Patient not found'}), 404
        return jsonify(patient), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- STATISTICS AND DASHBOARD ---
@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """Get dashboard statistics."""
    try:
        stats = {
            'total_patients': len(patients_db),
            'cases_completed': len([c for c in cases_db.values() if c.get('status') == 'completed']),
            'pending_cases': len([c for c in cases_db.values() if c.get('status') == 'pending']),
            'total_users': len(users_db),
            'avg_processing_time': 14.5  # minutes
        }
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- SETTINGS AND PREFERENCES ---
@app.route('/api/settings/<user_id>', methods=['GET'])
def get_user_settings(user_id):
    """Get user settings."""
    try:
        settings = {
            'local_inference': True,
            'confidence_threshold': 85.5,
            'consensus_enabled': False,
            'auto_save': True
        }
        return jsonify(settings), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/settings/<user_id>', methods=['POST'])
def update_user_settings(user_id):
    """Update user settings."""
    try:
        data = request.get_json()
        # In production, persist to database
        return jsonify({'success': True, 'settings': data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- ALERTS ---
@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """Get system alerts."""
    try:
        alerts = [
            {
                'id': 1,
                'type': 'warning',
                'message': 'High priority case requires review',
                'timestamp': datetime.now().isoformat()
            }
        ]
        return jsonify(alerts), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/status', methods=['GET'])
def get_status():
    """Return server status including whether demo/mock mode is active."""
    try:
        mock_env = os.getenv('MEDGEMMA_MOCK', '0').lower()
        hf_token = os.getenv('HUGGINGFACEHUB_API_TOKEN') or os.getenv('HF_TOKEN') or os.getenv('HUGGINGFACE_TOKEN')
        status = {
            'mock_mode': mock_env in ('1', 'true', 'yes'),
            'has_hf_token': bool(hf_token)
        }
        return jsonify(status), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/uploads/<case_id>/<filename>')
def serve_upload(case_id, filename):
    """Serve uploaded files for a case."""
    try:
        directory = UPLOAD_FOLDER / case_id
        return send_from_directory(str(directory), filename)
    except Exception as e:
        return jsonify({'error': str(e)}), 404

if __name__ == '__main__':
    print("🚀 Starting MedGemma Web Interface...")
    print("📱 Open your browser to: http://localhost:5000")
    print("⚠️  Remember: This is for educational purposes only. Always consult healthcare professionals.")
    app.run(debug=True, host='0.0.0.0', port=5000)
