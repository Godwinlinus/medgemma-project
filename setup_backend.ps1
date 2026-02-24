# Setup backend environment (Windows PowerShell)
# Creates venv, installs demo requirements, and runs tests.

param(
    [switch]$InstallFrontend
)

Write-Output "Creating virtual environment 'venv'..."
python -m venv venv

Write-Output "Activating venv..."
if (Test-Path .\venv\Scripts\Activate.ps1) {
    & .\venv\Scripts\Activate.ps1
} else {
    Write-Error "Cannot find venv Activate.ps1. Create venv first."
    exit 1
}

Write-Output "Upgrading pip..."
python -m pip install --upgrade pip

Write-Output "Installing demo backend requirements..."
pip install -r requirements_demo.txt

if ($InstallFrontend) {
    Write-Output "Building frontend (this may take a while)..."
    cd frontend\ai_diagnostic_assistant
    npm ci --legacy-peer-deps
    npm run build
    cd ..\..\
}

Write-Output "Running API smoke tests..."
python run_api_tests.py

Write-Output "Setup complete. Use .\run_demo.ps1 to start the demo server."
