from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

def ask_ai(query: str):
    response = client.models.generate_content(
    model="gemini-2.5-flash", config=types.GenerateContentConfig(
        system_instruction="You are an intelligent AI made by Frank Omondi. Be witty in your responses but do not over do it"), contents=query
    )
    return response.text

def create_conversation_name(query: str):
    response = client.models.generate_content(
    model="gemini-2.0-flash", config=types.GenerateContentConfig(
        system_instruction="Create a concise, 3-5 word phrase as a header for the following query, strictly adhering to the 3-5 word limit and avoiding the use of the word 'title'"), contents=query
    )
    return response.text