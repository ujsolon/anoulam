# Ano Ulam?

Welcome to the **Ano Ulam?** repository! This project is a meal planning and grocery shopping assistant designed to help users discover recipes, generate shopping lists, and reduce food waste. It combines a user-friendly web interface with a FastAPI backend powered by AI to provide personalized meal suggestions and ingredient lists.

**Website:** [https://anoulam.vercel.app/](https://anoulam.vercel.app/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Ano Ulam? (Filipino for "What's for lunch/dinner?") is a web application that simplifies meal planning and grocery shopping. Users can input available ingredients to get recipe suggestions or specify a dish to generate a shopping list. The backend leverages AI to provide accurate and localized ingredient recommendations.

## Features

- **Recipe Suggestions**: Enter ingredients you have, and the app will suggest recipes you can make.
- **Shopping List Generator**: Specify a dish and servings to generate a shopping list.
- **Dietary Preferences**: Filter recipes based on dietary restrictions like vegetarian, vegan, or gluten-free.
- **Cooking Instructions**: Step-by-step cooking instructions for your selected dish.
- **AI-Powered Backend**: Uses Google's Gemini AI to generate ingredient lists and cooking steps for Filipino dishes.
- **Dish Image Fetching**: Automatically fetches a relevant image for your dish using the Unsplash API.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

### Prerequisites

- Node.js (v18 or later)
- Python (v3.11 or later)
- npm or yarn
- A Google API key for the AI backend
- An Unsplash API key for fetching dish images

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/anoulam.git
   cd anoulam
   ```

2. Install dependencies for the frontend:

   ```bash
   cd web
   npm install
   ```

3. Install dependencies for the backend:

   ```bash
   cd ../api-python
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create a `.env` file in the `api-python` directory and add your API keys:
     ```
     GOOGLE_API_KEY=your-google-api-key
     UNSPLASH_ACCESS_KEY=your-unsplash-api-key
     ```

5. Start the development servers:
   - Frontend:
     ```bash
     cd web
     npm run dev
     ```
   - Backend:
     ```bash
     cd ../api-python
     uvicorn main:app --reload
     ```

## Usage

1. Open the frontend in your browser at [http://localhost:3000](http://localhost:3000).
2. Use the "What to Cook?" feature to input ingredients and get recipe suggestions.
3. Use the "What to Buy?" feature to generate a shopping list based on the dish you want to cook.
4. Follow the step-by-step cooking instructions provided for your selected dish.

## Project Structure

```
anoulam/
├── README.md
├── .gitignore
├── api-python/
│   ├── main.py
│   ├── requirements.txt
│   ├── dishes.txt
├── web/
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   │   ├── what-to-cook/
│   │   │   └── page.js
│   │   ├── what-to-buy/
│   │   │   └── page.js
│   ├── components/
│   │   ├── DishPrefill.js
│   │   ├── Header.js
│   │   ├── ImageGrid.js
│   │   ├── RecipeSection.js
│   │   ├── ShopOptionsModal.js
│   │   ├── ShoppingSection.js
│   ├── globals.css
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   ├── next.config.ts
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.


## Feature List - What to Buy
Here are the features implemented in the WhatToBuy page:

1. Dish Name Input: Users can input the name of the dish they want to cook.
2. Servings Input: Users can specify the number of servings for the dish.
3. Ingredient Fetching: Fetches a list of ingredients for the specified dish and servings from the backend.
4. Cross-Out Ingredients: Users can cross out ingredients from the shopping list to mark them as purchased or unavailable.
5. Copy Shopping List: Users can copy the uncrossed items from the shopping list to their clipboard.
6. Cooking Steps Generation: Fetches step-by-step cooking instructions for the dish from the backend.
7. Mark Cooking Steps as Completed: Users can mark cooking steps as completed or undo them.
8. Copy Cooking Steps: Users can copy the unfinished cooking steps to their clipboard.
9. Finish Cooking: Marks all cooking steps as completed and fetches a relevant dish image from the Unsplash API.
10. Dish Image Display: Displays an image of the cooked dish fetched from Unsplash.
11. Start Over: Resets the form and all states to allow users to start a new session.
12. Unsaved Progress Warning: Warns users about unsaved progress when navigating away from the page.
13. Ingredient-Specific Options: Allows users to interact with individual ingredients (e.g., via a modal for shopping options).
14. Loading Indicators: Displays loading states for ingredient fetching, cooking steps generation, and dish image fetching.
15. Error Handling: Handles errors gracefully for ingredient fetching, cooking steps generation, and dish image fetching.
16. Responsive Design: Optimized for user interaction on various devices.