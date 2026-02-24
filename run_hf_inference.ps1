# Run with real Hugging Face Inference API (not mock)
# Requires: HF token with access to google/medgemma-4b-it gated model

# Set your HF token here (or set it in your system environment)
$env:HUGGINGFACEHUB_API_TOKEN = $env:HUGGINGFACEHUB_API_TOKEN -or "hf_YOUR_TOKEN_HERE"

# Explicitly disable mock mode so real HF inference is used
Remove-Item env:MEDGEMMA_MOCK -ErrorAction SilentlyContinue

# Verify token is set
if (-not $env:HUGGINGFACEHUB_API_TOKEN -or $env:HUGGINGFACEHUB_API_TOKEN -eq "hf_YOUR_TOKEN_HERE") {
    Write-Host "ERROR: HUGGINGFACEHUB_API_TOKEN not set or still placeholder." -ForegroundColor Red
    Write-Host "Please set your HF token first:" -ForegroundColor Yellow
    Write-Host '  $env:HUGGINGFACEHUB_API_TOKEN = "hf_YOUR_ACTUAL_TOKEN"' -ForegroundColor Cyan
    exit 1
}

# Activate venv
if (Test-Path .\venv\Scripts\Activate.ps1) {
    & .\venv\Scripts\Activate.ps1
}

Write-Host "Starting MedGemma with real HF Inference API..." -ForegroundColor Green
Write-Host "Token set: $($env:HUGGINGFACEHUB_API_TOKEN.Substring(0, 10))..." -ForegroundColor Cyan
Write-Host "Model: google/medgemma-4b-it (gated - ensure you have access)" -ForegroundColor Yellow
Write-Host

python app.py
