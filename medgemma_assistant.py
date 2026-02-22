#!/usr/bin/env python3
"""
MedGemma Medical AI Assistant
A simple interface for Google's MedGemma model for medical question answering.
"""

import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from huggingface_hub import login
import argparse
from pathlib import Path

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

        # Login to Hugging Face
        token = self._get_hf_token()
        if token:
            login(token)
        else:
            raise ValueError("No Hugging Face token found. Please set HF_TOKEN environment variable or add token to venv/.env.local")

        print(f"Loading {model_name} on {self.device}...")
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float16 if self.device != "cpu" else torch.float32,
            device_map="auto" if self.device == "auto" else self.device
        )
        print("Model loaded successfully!")

    def _get_hf_token(self):
        """Get Hugging Face token from environment or .env.local file."""
        # Try environment variables first
        token = os.getenv('HF_TOKEN') or os.getenv('access_token')
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
        # Format the input for MedGemma
        prompt = f"Question: {question}\nAnswer:"

        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)

        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_length=max_length,
                temperature=temperature,
                do_sample=True,
                pad_token_id=self.tokenizer.eos_token_id
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