# Quick demo runner for Windows PowerShell
# Usage: Open PowerShell, then run: .\run_demo.ps1

# Enable demo mock mode so inference works without HF access
$Env:MEDGEMMA_MOCK = "1"

# If you have a HF token and want to enable it as well, set it in your environment
# $Env:HUGGINGFACEHUB_API_TOKEN = "hf_xxx"

# Activate venv (assumes created at .\venv)
if (Test-Path .\venv\Scripts\Activate.ps1) {
    & .\venv\Scripts\Activate.ps1
}

python app.py
