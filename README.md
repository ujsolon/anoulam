# Ano Ulam?

Welcome to the **Ano Ulam?** repository! This project is a meal planning and grocery shopping assistant designed to help users discover recipes, generate shopping lists, and reduce food waste. It combines a user-friendly web interface with a FastAPI backend powered by AI to provide personalized meal suggestions and ingredient lists.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Ano Ulam? (Filipino for "What's for lunch?") is a web application that simplifies meal planning and grocery shopping. Users can input available ingredients to get recipe suggestions or specify a dish to generate a shopping list. The backend leverages AI to provide accurate and localized ingredient recommendations.

## Features

- **Recipe Suggestions**: Enter ingredients you have, and the app will suggest recipes you can make.
- **Shopping List Generator**: Specify a dish and servings to generate a shopping list.
- **Dietary Preferences**: Filter recipes based on dietary restrictions like vegetarian, vegan, or gluten-free.
- **AI-Powered Backend**: Uses Google's Gemini AI to generate ingredient lists for Filipino dishes.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

### Prerequisites

- Node.js (v18 or later)
- Python (v3.9 or later)
- npm or yarn
- A Google API key for the AI backend

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
   - Create a `.env` file in the `api-python` directory and add your Google API key:
     ```
     GOOGLE_API_KEY=your-google-api-key
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
│   │   ├── Header.js
│   │   ├── ImageGrid.js
│   │   ├── RecipeSection.js
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