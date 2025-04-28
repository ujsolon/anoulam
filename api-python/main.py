# main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
import random
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://anoulam.vercel.app", "http://localhost:3000"], #Remove localhost once prod-ready
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# (rest of your code here)


# --- Pydantic Request Model ---
class DishRequest(BaseModel):
    dish_name: str | None = None
    random: bool = False
    servings: int = 3  # Default to 3 if not provided

class CookingStepsRequest(BaseModel):
    dish_name: str
    ingredients: list[str]

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

# --- Generate Cooking Steps from Gemini ---
def get_cooking_steps_from_model(dish_name: str, ingredients: list[str], model):
    prompt = (
        "You are a Filipino recipe cooking assistant.\n\n"
        f"Given the dish '{dish_name}' and the following ingredients:\n"
        f"{', '.join(ingredients)}\n\n"
        "Generate clear, step-by-step cooking instructions. "
        "Be concise but complete, assume a home cook can follow basic steps. "
        "Use numbered steps like:\n"
        "1. Do this...\n2. Do that...\n"
        "Do NOT list ingredients again or add extra notes.\n\n"
        "Start now:"
    )

    generation_config = genai.types.GenerationConfig(
        max_output_tokens=300,
        temperature=0.7
    )

    try:
        response = model.generate_content(prompt, generation_config=generation_config)
        return response.text.strip()
    except Exception as e:
        raise RuntimeError(f"Error generating cooking steps: {e}")

# --- Endpoint: Generate Cooking Steps ---
@app.post("/get-cooking-steps/")
def get_cooking_steps(request: CookingStepsRequest):
    if not request.dish_name or not request.ingredients:
        raise HTTPException(status_code=400, detail="Dish name and ingredients must be provided.")

    try:
        model = initialize_gemini_model()
        steps = get_cooking_steps_from_model(request.dish_name, request.ingredients, model)
        return {
            "steps": steps
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))