# api/gemini.py
import os
import json
from http.server import BaseHTTPRequestHandler
import google.generativeai as genai

# Initialize Gemini
def initialize_gemini_model():
    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        return None
        
    genai.configure(api_key=api_key)
    try:
        model = genai.GenerativeModel('gemini-pro')
        return model
    except Exception:
        return None

def get_ingredients(dish_name):
    model = initialize_gemini_model()
    if not model:
        return {"error": "Failed to initialize Gemini model"}
    
    system_instruction = "You are an ingredient list generator. For the requested dish, provide *only* the ingredients and their estimated quantities suitable for 3 servings. Format as a JSON array of objects with 'ingredient' and 'quantity' properties. Example: [{\"ingredient\":\"flour\",\"quantity\":\"2 cups\"}]"
    user_prompt = f"List the ingredients for the dish: {dish_name}"
    full_prompt = f"{system_instruction}\n\n{user_prompt}"

    try:
        generation_config = genai.types.GenerationConfig(
            max_output_tokens=250,
            temperature=0.7
        )

        response = model.generate_content(
            full_prompt,
            generation_config=generation_config
        )
        
        # Try to parse as JSON first
        try:
            # The response might be a JSON string or might contain markdown code blocks
            text = response.text.strip()
            # Remove markdown code block markers if present
            if text.startswith("```json"):
                text = text.replace("```json", "").replace("```", "").strip()
            elif text.startswith("```"):
                text = text.replace("```", "").strip()
                
            ingredients = json.loads(text)
            return {"ingredients": ingredients}
        except json.JSONDecodeError:
            # If not valid JSON, return as text
            return {"ingredients": response.text.strip()}
    except Exception as e:
        return {"error": f"Error generating content: {str(e)}"}

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)
        
        dish_name = data.get('dishName', '')
        if not dish_name:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": "dishName is required"}).encode())
            return
            
        result = get_ingredients(dish_name)
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(result).encode())
        return