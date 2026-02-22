# MedGemma Medical AI Assistant

A Python application that provides an easy-to-use interface for Google's MedGemma model, a specialized AI model for medical question answering and healthcare assistance.

## Features

- 🏥 Medical question answering using Google's MedGemma model
- 💻 Interactive command-line interface
- 🔧 Single question mode for automation
- 🚀 GPU acceleration support (CUDA)
- 🔐 Secure Hugging Face authentication

## Prerequisites

- Python 3.8+
- Hugging Face account with **access to MedGemma models** (see below)
- Sufficient RAM/VRAM (at least 16GB recommended for 4B model)

### Getting Access to MedGemma

MedGemma models are gated and require approval from Google. To get access:

1. Visit the [MedGemma model page](https://huggingface.co/google/medgemma-4b-it)
2. Click "Request access" and fill out the form
3. Wait for approval (may take a few days)
4. Once approved, your Hugging Face token will work with the model

### Alternative Models

If you don't have access to MedGemma yet, you can use alternative open medical models:

- `medicalai/ClinicalBERT` - Clinical text understanding
- `Cannae-AI/MedicalLlama3.2-vision-11B-IT` - Medical vision model
- `Intelligent-Internet/II-Medical-8B` - General medical assistant

Use these with: `python medgemma_assistant.py --model medicalai/ClinicalBERT`

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd medgemma-project
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up your Hugging Face token:
   - Copy `venv/.env.local` to `.env` in the project root
   - Or set the `HF_TOKEN` environment variable
   - Or modify the `.env.local` file with your token

## Usage

### Interactive Mode
```bash
python medgemma_assistant.py
```

### Single Question Mode
```bash
python medgemma_assistant.py --question "What are the symptoms of diabetes?"
```

### Advanced Options
```bash
# Use CPU instead of GPU
python medgemma_assistant.py --device cpu

# Use a different model (if available)
python medgemma_assistant.py --model google/medgemma-4b-it
```

## Model Information

- **Model**: MedGemma-4B-IT (Instruction Tuned)
- **Provider**: Google
- **Purpose**: Medical question answering and healthcare assistance
- **Size**: ~8GB (4B parameter model)

## Important Notes

⚠️ **Medical Disclaimer**: This tool is for educational and research purposes only. Always consult qualified medical professionals for actual medical advice and treatment decisions.

🔒 **Privacy**: Be careful with sensitive medical information. The model responses should not be considered as medical advice.

## Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Ensure your Hugging Face token is valid and has access to MedGemma
   - Check that the token is properly set in `.env.local`

2. **"CUDA out of memory"**
   - Use `--device cpu` to run on CPU
   - Or use a machine with more VRAM

3. **"Model download failed"**
   - Check your internet connection
   - Ensure you have sufficient disk space (~4GB)

### Performance Tips

- Use GPU acceleration for faster responses
- For CPU-only machines, consider using smaller quantized models
- Close other applications to free up memory

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google for the MedGemma model
- Hugging Face for the transformers library
- The open-source AI community