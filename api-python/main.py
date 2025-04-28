# main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
import random
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# --- Pydantic Request Model ---
class DishRequest(BaseModel):
    dish_name: str | None = None
    random: bool = False
    servings: int = 3  # Default to 3 if not provided


@app.get("/")
def root():
    return {"message": "API is running"}

# --- Gemini Model Initialization ---
def initialize_gemini_model():
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        raise ValueError("Google API key not found.")
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-2.0-flash-lite-preview')

# --- Generate Ingredients from Gemini ---
def get_ingredients_from_model(dish_name: str, servings: int, model):
    prompt = (
        "You are an ingredient list generator for a Philippine audience. "
        f"For the requested dish, provide *only* the ingredients and their estimated quantities suitable for {servings} servings. "
        "Format as a simple list. Exclude all other information like cooking steps, introductions, or notes.\n\n"
        f"List the ingredients for the dish: {dish_name}"
    )

    generation_config = genai.types.GenerationConfig(
        max_output_tokens=150,
        temperature=0.7
    )

    try:
        response = model.generate_content(prompt, generation_config=generation_config)
        return response.text.strip()
    except Exception as e:
        raise RuntimeError(f"Error generating ingredients: {e}")

# --- Load Dishes from File ---
def get_dish_list(filename="dishes.txt"):
    if not os.path.exists(filename):
        with open(filename, "w") as f:
            f.write("Adobo\nSinigang\nKare-Kare\nPancit\nHalo-Halo\n")
    with open(filename, "r") as f:
        return [line.strip() for line in f if line.strip()]

# --- Endpoint: Generate Ingredients ---
@app.post("/get-ingredients/")
def get_ingredients(request: DishRequest):
    dish_list = get_dish_list()

    if request.random:
        request.dish_name = random.choice(dish_list)

    if not request.dish_name:
        raise HTTPException(status_code=400, detail="Dish name not provided and random not selected.")

    try:
        model = initialize_gemini_model()
        ingredients = get_ingredients_from_model(request.dish_name, request.servings, model)
        return {
            "dish": request.dish_name,
            "ingredients": ingredients
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
