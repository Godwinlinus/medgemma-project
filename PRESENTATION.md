# MedGemma Demo — 1-slide Talking Points

Title: MedGemma Clinical Assistant — Fast, Safe Demo

Key message:
- Live demo uses a secure AI assistant to analyze clinical cases and suggest differential diagnoses and next steps. For the hackathon we present a demo mode (mock responses) so the experience is reproducible without gated model access.

Slide bullets:
- Problem: Clinicians need fast, literature-aligned decision support at the bedside.
- Solution: MedGemma Web Interface — upload case notes or images, run AI analysis, view concise reasoning and recommended next steps.
- Tech: Flask backend + React frontend, local mock + Hugging Face Inference API fallback for real models.
- Demo details:
  - Mock mode enabled automatically when no HF access — ensures reliable demo.
  - File uploads supported (images, DICOM, PDF, TXT) and stored under `uploads/`.
  - API endpoints: `/api/cases`, `/api/inference`, `/api/upload`, `/api/patients`, `/api/status`.
- Safety & limitations: Not a substitute for clinical judgment; models are gated and may require HF access for real inference.

Call to action for judges:
- See the flow: create case → upload files → Run Analysis → review AI reasoning.
- We can switch to live HF model if granted access; otherwise mock provides deterministic outputs for evaluation.

Demo script (30–60s):
1. Open app at `http://localhost:5000` (server run via `run_demo.ps1`).
2. Create a case with symptoms (e.g., "fever, cough").
3. Upload a supporting file and click "Run Analysis".
4. Review the `Demo / Mock Mode` badge and the AI's recommended steps.

Contact / Notes:
- Repo root contains `run_demo.ps1` and README with run steps.
