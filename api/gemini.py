import google.generativeai as genai
import os
import json
import random
from dotenv import load_dotenv

load_dotenv()

def get_dish_list(filename="dishes.txt"):
    if not os.path.exists(filename):
        with open(filename, "w") as f:
            f.write("Adobo\nSinigang\nKare-Kare\nPancit\nHalo-Halo\n")
    with open(filename, "r") as f:
        return [line.strip() for line in f if line.strip()]

def initialize_gemini_model():
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        raise Exception("GOOGLE_API_KEY is missing")
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-2.0-flash-lite-preview')

def get_ingredients_gemini(dish_name, model):
    prompt = (
        "You are an ingredient list generator for a Philippine audience. "
        "For the requested dish, provide *only* the ingredients and their estimated quantities suitable for 3 servings. "
        "Format as a simple list. Exclude all other information like cooking steps, introductions, or notes.\n\n"
        f"List the ingredients for the dish: {dish_name}"
    )
    generation_config = genai.types.GenerationConfig(max_output_tokens=150, temperature=0.7)
    response = model.generate_content(prompt, generation_config=generation_config)
    return response.text.strip()

# --- Main handler function for Vercel ---
def handler(request, response):
    try:
        if request.method != "POST":
            return response.status(405).send("Method Not Allowed")

        body = request.json()

        dish_name = body.get("dish_name")
        random_flag = body.get("random", False)

        dish_list = get_dish_list()
        if random_flag:
            dish_name = random.choice(dish_list)

        if not dish_name:
            return response.status(400).json({"error": "Dish name not provided and random not selected."})

        model = initialize_gemini_model()
        ingredients = get_ingredients_gemini(dish_name, model)

        return response.status(200).json({
            "dish": dish_name,
            "ingredients": ingredients
        })

    except Exception as e:
        return response.status(500)
