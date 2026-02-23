#!/usr/bin/env python3
"""
Test Hugging Face authentication with the token.
"""

from huggingface_hub import login, HfApi
from pathlib import Path
import os

def test_authentication():
    print("🔑 Testing Hugging Face Authentication")
    print("=" * 40)

    # Load token from file
    env_file = Path('venv/.env.local')
    token = None
    if env_file.exists():
        print("📄 Found .env.local file")
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('access_token ='):
                    token = line.split('=', 1)[1].strip().strip('"\'')
                    break

    if token:
        masked_token = token[:8] + "..." + token[-4:] if len(token) > 12 else token
        print(f"🔑 Found token: {masked_token}")

        print("🔐 Logging in...")
        try:
            login(token)
            print("✅ Login successful")

            api = HfApi()
            print("🔍 Checking authentication...")

            user = api.whoami()
            print(f"✅ Authenticated as: {user['name']}")
            print(f"📧 Email: {user.get('email', 'Not provided')}")

            # Test access to MedGemma
            print("🧠 Testing MedGemma access...")
            try:
                # Try to get model info (this will fail if no access)
                model_info = api.model_info("google/medgemma-4b-it")
                print("✅ MedGemma access granted!")
                return True
            except Exception as e:
                if "403" in str(e) or "gated" in str(e).lower():
                    print("❌ MedGemma access not granted yet")
                    print("   Please ensure you've been approved on Hugging Face")
                    return False
                else:
                    print(f"❓ Unexpected error: {e}")
                    return False

        except Exception as e:
            print(f"❌ Authentication failed: {e}")
            return False
    else:
        print("❌ No token found in venv/.env.local")
        return False

if __name__ == "__main__":
    success = test_authentication()
    if success:
        print("\n🎉 Ready to use MedGemma!")
        print("Run: python medgemma_assistant.py")
    else:
        print("\n⚠️  Please check your setup and try again.")