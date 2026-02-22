#!/usr/bin/env python3
"""
Demo script showing MedGemma assistant functionality without loading the full model.
This demonstrates the code structure and can be used for testing.
"""

import os
from pathlib import Path

def demo_token_loading():
    """Demo the token loading functionality."""
    print("🔑 Testing token loading...")

    # Simulate the token loading logic from MedGemmaAssistant
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
            except Exception as e:
                print(f"Error reading token file: {e}")

    if token:
        # Mask the token for security
        masked_token = token[:8] + "..." + token[-4:] if len(token) > 12 else token
        print(f"✅ Token loaded successfully: {masked_token}")
        return True
    else:
        print("❌ No token found")
        return False

def demo_dependencies():
    """Demo that all required dependencies are available."""
    print("\n📦 Testing dependencies...")

    required_packages = [
        'torch',
        'transformers',
        'huggingface_hub',
        'pathlib'
    ]

    missing_packages = []
    for package in required_packages:
        try:
            if package == 'pathlib':
                import pathlib
            else:
                __import__(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package}")
            missing_packages.append(package)

    return len(missing_packages) == 0

def demo_project_structure():
    """Demo that the project structure is correct."""
    print("\n📁 Testing project structure...")

    required_files = [
        'medgemma_assistant.py',
        'requirements.txt',
        'README.md',
        'test_setup.py',
        'example.py',
        '.gitignore',
        'venv/.env.local'
    ]

    missing_files = []
    for file_path in required_files:
        if Path(file_path).exists():
            print(f"✅ {file_path}")
        else:
            print(f"❌ {file_path}")
            missing_files.append(file_path)

    return len(missing_files) == 0

def demo_interactive_interface():
    """Demo the interactive interface structure."""
    print("\n💻 Demo interactive interface...")

    print("Welcome to MedGemma Medical Assistant!")
    print("This is a demo of the interface.")
    print()
    print("Example questions you could ask:")
    print("• What are the symptoms of diabetes?")
    print("• How is blood pressure measured?")
    print("• What should I do if I have a fever?")
    print()
    print("Type 'quit' to exit (in real usage)")
    print("✅ Interface structure ready")

    return True

def main():
    print("🧪 MedGemma Project Demo")
    print("=" * 40)

    tests = [
        ("Token Loading", demo_token_loading),
        ("Dependencies", demo_dependencies),
        ("Project Structure", demo_project_structure),
        ("Interface Demo", demo_interactive_interface)
    ]

    results = []
    for test_name, test_func in tests:
        print(f"\n🔍 Running {test_name} test...")
        try:
            result = test_func()
            results.append(result)
        except Exception as e:
            print(f"❌ Test failed with error: {e}")
            results.append(False)

    print("\n" + "=" * 40)
    print("📊 Demo Results:")

    passed = sum(results)
    total = len(results)

    for i, (test_name, _) in enumerate(tests):
        status = "✅ PASS" if results[i] else "❌ FAIL"
        print(f"{test_name}: {status}")

    print(f"\nOverall: {passed}/{total} tests passed")

    if passed == total:
        print("\n🎉 All systems ready! Your MedGemma project is properly set up.")
        print("\nNext steps:")
        print("1. Request access to MedGemma models on Hugging Face")
        print("2. Run: python medgemma_assistant.py")
        print("3. Or try: python example.py")
    else:
        print("\n⚠️  Some issues found. Please check the failed tests above.")

if __name__ == "__main__":
    main()