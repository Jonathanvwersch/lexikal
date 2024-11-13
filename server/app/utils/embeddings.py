import openai
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

# Ensure OpenAI API key is set
openai.api_key = os.getenv("OPENAI_API_KEY")

async def get_embedding(text: str) -> List[float]:
    """
    Convert text into a vector embedding using OpenAI's text-embedding-ada-002 model.
    
    Args:
        text (str): The text to convert into an embedding
        
    Returns:
        List[float]: A vector of 1536 dimensions representing the semantic meaning of the text
    """
    try:
        response = await openai.Embedding.create(
            model="text-embedding-ada-002",
            input=text.replace("\n", " ")  # Replace newlines with spaces for better embedding
        )
        # The embedding is a vector of 1536 dimensions
        return response.data[0].embedding
    except Exception as e:
        print(f"Error getting embedding: {e}")
        raise 