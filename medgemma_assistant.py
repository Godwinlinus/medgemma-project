#!/usr/bin/env python3
"""
MedGemma Medical AI Assistant
A simple interface for Google's MedGemma model for medical question answering.
"""

import os
import torch
import argparse
from pathlib import Path
from requests.exceptions import HTTPError

class MedGemmaAssistant:
    def __init__(self, model_name="google/medgemma-4b-it", device="auto"):
        """
        Initialize the MedGemma assistant.

        Args:
            model_name (str): Hugging Face model name
            device (str): Device to run the model on ('auto', 'cpu', 'cuda')
        """
        self.model_name = model_name
        self.device = self._get_device(device)

        # Support a mock mode for hackathons / offline testing
        mock_flag = os.getenv("MEDGEMMA_MOCK", "0").strip()
        if mock_flag in ("1", "true", "yes"):
            self.mock = True
            self.tokenizer = None
            self.model = None
            print("MedGemmaAssistant running in MOCK mode (no HF model will be loaded).")
            return

        # Login to Hugging Face using a variety of supported env vars
        token = self._get_hf_token()
        if token:
            try:
                from huggingface_hub import login
                login(token)
            except Exception:
                # login may already be configured or fail harmlessly
                pass
        else:
            raise ValueError("No Hugging Face token found. Set HUGGINGFACEHUB_API_TOKEN or HF_TOKEN environment variable and ensure access to the gated model.")

        print(f"Loading {model_name} on {self.device}...")
        try:
            # Import here to avoid module-level import
            from transformers import AutoTokenizer, AutoModelForCausalLM
            # Some models require `trust_remote_code=True`; pass device_map for accelerators
            self.tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=True)
            self.model = AutoModelForCausalLM.from_pretrained(
                model_name,
                torch_dtype=torch.float16 if self.device != "cpu" else torch.float32,
                device_map="auto" if self.device == "auto" else self.device,
                trust_remote_code=True
            )
        except HTTPError as e:
            # Provide a clearer error when model is gated / access denied
            msg = str(e)
            if "403" in msg or "gated" in msg.lower() or "access" in msg.lower():
                raise PermissionError(
                    f"Access to model {model_name} is gated or denied.\n"
                    "Make sure your Hugging Face token has access to the model and is set in the environment as HUGGINGFACEHUB_API_TOKEN or HF_TOKEN.\n"
                    "Visit the model page to request access: https://huggingface.co/google/medgemma-4b-it"
                )
            raise
        except Exception as e:
            raise RuntimeError(f"Failed to load model {model_name}: {e}")

        print("Model loaded successfully!")
        self.mock = False

    def _get_hf_token(self):
        """Get Hugging Face token from environment or .env.local file."""
        # Try environment variables first (support common names)
        token = (
            os.getenv('HUGGINGFACEHUB_API_TOKEN') or
            os.getenv('HUGGINGFACE_TOKEN') or
            os.getenv('HF_TOKEN') or
            os.getenv('access_token') or
            os.getenv('HF_ACCESS_TOKEN')
        )
        if token:
            return token

        # Try to load from .env.local file
        env_file = Path(__file__).parent / "venv" / ".env.local"
        if env_file.exists():
            try:
                with open(env_file, 'r') as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith('access_token ='):
                            token = line.split('=', 1)[1].strip().strip('"\'')
                            if token:
                                return token
            except Exception:
                pass

        return None

    def _get_device(self, device):
        """Determine the appropriate device to use."""
        if device == "auto":
            return "cuda" if torch.cuda.is_available() else "cpu"
        return device

    def generate_response(self, question, max_length=512, temperature=0.7):
        """
        Generate a response to a medical question.

        Args:
            question (str): The medical question to answer
            max_length (int): Maximum length of the response
            temperature (float): Sampling temperature

        Returns:
            str: The model's response
        """
        # Mock mode: return a deterministic templated response useful for UI/testing
        if getattr(self, 'mock', False):
            resp = (
                "Possible diagnoses:\n1. Viral upper respiratory infection (60%)\n"
                "2. Community-acquired pneumonia (20%)\n\n"
                "Clinical reasoning:\nPatient presents with fever and cough; consider viral causes vs bacterial given duration. Recommend chest X-ray and CBC.\n\n"
                "Recommended next steps:\n- Chest X-ray\n- Empiric supportive care\n- Follow-up in 48 hours or earlier if worse"
            )
            return resp

        # Format the input for MedGemma
        prompt = f"Question: {question}\nAnswer:"

        inputs = self.tokenizer(prompt, return_tensors="pt")
        if hasattr(inputs, 'to'):
            try:
                inputs = inputs.to(self.device)
            except Exception:
                pass

        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_length=max_length,
                temperature=temperature,
                do_sample=True,
                pad_token_id=getattr(self.tokenizer, 'eos_token_id', None)
            )

        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        # Extract just the answer part
        if "Answer:" in response:
            response = response.split("Answer:")[-1].strip()

        return response

    def interactive_mode(self):
        """Run the assistant in interactive mode."""
        print("\n🤖 MedGemma Medical Assistant")
        print("Ask me medical questions! Type 'quit' to exit.\n")

        while True:
            try:
                question = input("Your question: ").strip()
                if question.lower() in ['quit', 'exit', 'q']:
                    print("Goodbye! 👋")
                    break

                if not question:
                    continue

                print("Thinking... 🤔")
                response = self.generate_response(question)
                print(f"\nAnswer: {response}\n")

            except KeyboardInterrupt:
                print("\nGoodbye! 👋")
                break
            except Exception as e:
                print(f"Error: {e}")
                continue

def main():
    parser = argparse.ArgumentParser(description="MedGemma Medical AI Assistant")
    parser.add_argument("--model", default="google/medgemma-1.5",
                       help="Hugging Face model name")
    parser.add_argument("--device", default="auto",
                       choices=["auto", "cpu", "cuda"],
                       help="Device to run the model on")
    parser.add_argument("--question", type=str,
                       help="Single question to answer (non-interactive mode)")

    args = parser.parse_args()

    try:
        assistant = MedGemmaAssistant(args.model, args.device)

        if args.question:
            # Single question mode
            response = assistant.generate_response(args.question)
            print(f"Question: {args.question}")
            print(f"Answer: {response}")
        else:
            # Interactive mode
            assistant.interactive_mode()

    except Exception as e:
        print(f"Error initializing MedGemma: {e}")
        print("Make sure you have:")
        print("1. A valid Hugging Face access token")
        print("2. Sufficient RAM/VRAM for the model")
        print("3. Internet connection for downloading the model")
        return 1

    return 0

if __name__ == "__main__":
    exit(main())