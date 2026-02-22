#!/usr/bin/env python3
"""
Example usage of the MedGemma assistant.
"""

from medgemma_assistant import MedGemmaAssistant

def main():
    # Initialize the assistant
    print("Initializing MedGemma Assistant...")
    assistant = MedGemmaAssistant()

    # Example medical questions
    questions = [
        "What are the common symptoms of the flu?",
        "How is blood pressure measured?",
        "What should I do if I have a fever?",
        "Explain the difference between viral and bacterial infections.",
        "What are the risk factors for heart disease?"
    ]

    print("\n🤖 MedGemma Medical Q&A Examples")
    print("=" * 50)

    for i, question in enumerate(questions, 1):
        print(f"\nQ{i}: {question}")
        print("Thinking...")

        try:
            response = assistant.generate_response(question, max_length=200)
            print(f"A{i}: {response}")
        except Exception as e:
            print(f"Error: {e}")

        print("-" * 50)

    print("\nExample completed! 🎉")

if __name__ == "__main__":
    main()