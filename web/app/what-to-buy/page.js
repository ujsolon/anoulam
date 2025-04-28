'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';
import axios from 'axios'; // You may need to install axios

export default function WhatToBuy() {
  const [dishName, setDishName] = useState('');
  const [servings, setServings] = useState(3);
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://anoulam.onrender.com/get-ingredients/', {
        dish_name: dishName,
        servings: servings,
      });
      setIngredients(response.data.ingredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      setIngredients('Error generating ingredients.');
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <div className="back-link">
            <Link href="/">← Back to Home</Link>
          </div>

          <h1 className="page-title">What to Buy?</h1>
          <p className="page-subtitle">
            Enter the dish you want to cook and how many servings!
          </p>

          <div className="card">
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter dish name (e.g., Adobo)"
                className="input-field"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Servings"
                className="input-field"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                min="1"
              />
              <button className="button-primary" onClick={handleSubmit}>
                Get Ingredients
              </button>
            </div>
          </div>

          {ingredients && (
            <div className="card">
              <h2 className="card-title">Shopping List:</h2>
              <pre>{ingredients}</pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
