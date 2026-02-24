from app import app
import json

client = app.test_client()

def pretty(resp):
    try:
        data = resp.get_json()
        return f"{resp.status_code} {json.dumps(data)[:800]}"
    except Exception:
        return f"{resp.status_code} {resp.data[:800]}"

print('GET /api/patients ->', pretty(client.get('/api/patients')))
print('GET /api/cases ->', pretty(client.get('/api/cases')))

# Create case
resp = client.post('/api/cases', json={
    'patient_name': 'Test Patient',
    'symptoms': 'fever, cough',
    'medical_history': 'none'
})
print('POST /api/cases ->', pretty(resp))
case = resp.get_json() if resp.is_json else None
case_id = case.get('id') if case else None

# Run inference (needs symptoms)
resp = client.post('/api/inference', json={'symptoms': 'fever and cough', 'medical_history': 'none', 'case_id': case_id or 'test'})
print('POST /api/inference ->', pretty(resp))

# Upload using test client (multipart)
with open('test_upload.txt', 'rb') as f:
    data = {
        'file': (f, 'test_upload.txt'),
        'case_id': case_id or 'test'
    }
    resp = client.post('/api/upload', data=data, content_type='multipart/form-data')
    print('POST /api/upload ->', pretty(resp))

print('Done')
