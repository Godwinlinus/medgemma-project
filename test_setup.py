#!/usr/bin/env python3
"""
Test script for MedGemma assistant.
"""

import sys
import os
from pathlib import Path
sys.path.insert(0, os.path.dirname(__file__))

from medgemma_assistant import MedGemmaAssistant

def test_basic_functionality():
    """Test basic functionality without loading the full model."""
    print("Testing MedGemma Assistant setup...")

    # Test that we can import and create the class
    try:
        assistant = MedGemmaAssistant.__new__(MedGemmaAssistant)
        print("✅ Class instantiation works")
    except Exception as e:
        print(f"❌ Class instantiation failed: {e}")
        return False

    # Test that required packages are available
    try:
        import torch
        import transformers
        from huggingface_hub import login
        print("✅ Required packages are installed")
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        return False

    # Test device detection
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"✅ Detected device: {device}")

    # Check if token is available
    token = os.getenv('HF_TOKEN') or os.getenv('access_token')
    if not token:
        # Try to load from .env.local file
        env_file = Path(__file__).parent / "venv" / ".env.local"
        if env_file.exists():
            try:
                with open(env_file, 'r') as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith('access_token ='):
                            token = line.split('=', 1)[1].strip().strip('"\'')
                            break
            except Exception:
                pass

    if token:
        print("✅ Hugging Face token found")
    else:
        print("❌ No Hugging Face token found - model loading will fail")

    print("\nSetup test completed!")
    return True

def test_model_loading():
    """Test actual model loading (requires token and good internet)."""
    print("\nTesting model loading...")

    try:
        # Try to create the assistant (this will load the model)
        assistant = MedGemmaAssistant()
        print("✅ Model loaded successfully")

        # Test a simple question
        test_question = "What is the normal range for blood pressure?"
        print(f"Testing with question: {test_question}")

        response = assistant.generate_response(test_question, max_length=100)
        print(f"Response: {response}")
        print("✅ Model inference works")

        return True

    except Exception as e:
        print(f"❌ Model loading/inference failed: {e}")
        return False

if __name__ == "__main__":
    print("🧪 MedGemma Assistant Test Suite")
    print("=" * 40)

    # Run basic tests
    basic_ok = test_basic_functionality()

    if basic_ok:
        # Ask user if they want to test model loading
        try:
            response = input("\nDo you want to test model loading? (y/N): ").strip().lower()
            if response == 'y':
                test_model_loading()
        except KeyboardInterrupt:
            print("\nTest cancelled.")
    else:
        print("\n❌ Basic setup failed. Please fix the issues above before proceeding.")

    print("\nTest suite completed!")