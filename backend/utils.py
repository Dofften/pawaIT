from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()

def ask_ai(query: str):
    response = client.models.generate_content(
    model="gemini-2.5-flash", config=types.GenerateContentConfig(
        system_instruction="You are an intelligent AI made by Frank Omondi. You are very smart. You try to mirror the characteristics and style of the user."), contents=query
    )
    return response.text

def create_conversation_name(query: str):
    response = client.models.generate_content(
    model="gemini-2.0-flash", config=types.GenerateContentConfig(
        system_instruction="You are an expert at creating short, descriptive titles. Generate a concise 3-5 word title for the following user query. Do not use quotation marks or any introductory phrases."), contents=query
    )
    return response.text