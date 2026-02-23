#!/usr/bin/env python3
"""
MedGemma Web Interface
A Flask web application for patient interaction with MedGemma AI.
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime
from pathlib import Path
import sys

# Add the current directory to the path so we can import medgemma_assistant
sys.path.insert(0, os.path.dirname(__file__))
from medgemma_assistant import MedGemmaAssistant

app = Flask(__name__)
CORS(app)

# Global variable to hold the assistant (lazy loading)
assistant = None

def get_assistant():
    """Get or create the MedGemma assistant instance."""
    global assistant
    if assistant is None:
        try:
            print("Initializing MedGemma Assistant...")
            assistant = MedGemmaAssistant()
            print("Assistant ready!")
        except Exception as e:
            print(f"Error initializing assistant: {e}")
            return None
    return assistant

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

@app.route('/')
def index():
    """Serve the main chat interface."""
    # Check if React build exists, otherwise serve template
    build_path = Path("frontend/build/index.html")
    if build_path.exists():
        return send_from_directory('frontend/build', 'index.html')
    else:
        return render_template('index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files from React build."""
    build_path = Path("frontend/build")
    if build_path.exists():
        return send_from_directory('frontend/build', path)
    else:
        return "File not found", 404

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

if __name__ == '__main__':
    print("🚀 Starting MedGemma Web Interface...")
    print("📱 Open your browser to: http://localhost:5000")
    print("⚠️  Remember: This is for educational purposes only. Always consult healthcare professionals.")
    app.run(debug=True, host='0.0.0.0', port=5000)