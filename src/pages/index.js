// src/pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Home() {
  const [dishes, setDishes] = useState([
    'Adobo', 'Sinigang', 'Tinola', 'Nilaga', 'Kare-kare'
  ]);
  const [selectedDish, setSelectedDish] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [customDish, setCustomDish] = useState('');

  const handleRandomDish = () => {
    const randomIndex = Math.floor(Math.random() * dishes.length);
    setSelectedDish(dishes[randomIndex]);
  };

  const handleCustomDishChange = (e) => {
    setCustomDish(e.target.value);
  };

  const handleCustomDishSubmit = () => {
    if (customDish.trim()) {
      setSelectedDish(customDish);
    }
  };

  const getIngredients = async (dish) => {
    if (!dish) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/gemini', {
        dishName: dish
      });
      
      setIngredients(response.data.ingredients);
    } catch (err) {
      console.error('Error fetching ingredients:', err);
      setError('Failed to get ingredients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDish) {
      getIngredients(selectedDish);
    }
  }, [selectedDish]);

  return (
    <div className="container">
      <Head>
        <title>Ano Ulam? - Meal Preparation Assistant</title>
        <meta name="description" content="AI-powered meal suggestion app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Ano Ulam?</h1>
        <p className="description">Your Intelligent Meal Preparation Assistant</p>

        <div className="card">
          <h2>What should I cook today?</h2>
          
          <div className="actions">
            <button onClick={handleRandomDish} className="button">
              Give me a random dish
            </button>
            
            <div className="custom-input">
              <input
                type="text"
                value={customDish}
                onChange={handleCustomDishChange}
                placeholder="Or enter dish name here"
              />
              <button onClick={handleCustomDishSubmit} className="button">Go</button>
            </div>
          </div>

          {selectedDish && (
            <div className="result">
              <h3>Selected Dish: {selectedDish}</h3>
              
              {loading ? (
                <p>Loading ingredients...</p>
              ) : error ? (
                <p className="error">{error}</p>
              ) : (
                <div className="ingredients">
                  <h4>Ingredients (for 3 servings):</h4>
                  {Array.isArray(ingredients) ? (
                    <ul>
                      {ingredients.map((item, index) => (
                        <li key={index}>
                          {item.ingredient}: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <pre>{ingredients}</pre>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
        }

        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
          color: #0070f3;
        }

        .description {
          text-align: center;
          line-height: 1.5;
          font-size: 1.5rem;
          margin: 1rem 0;
        }

        .card {
          margin: 1rem;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: 100%;
        }

        .actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .custom-input {
          display: flex;
          gap: 0.5rem;
        }

        input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .button {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .button:hover {
          background-color: #0051a2;
        }

        .result {
          margin-top: 2rem;
          padding: 1rem;
          background-color: #f5f5f5;
          border-radius: 8px;
        }

        .ingredients {
          margin-top: 1rem;
        }

        .error {
          color: #d32f2f;
        }
      `}</style>
    </div>
  );
}