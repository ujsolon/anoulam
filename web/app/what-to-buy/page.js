'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';
import axios from 'axios';

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

          {/* Form Section */}
          <div className="card">
            <div className="input-group">
              <div className="input-wrapper">
                <label className="input-label" htmlFor="dishName">Dish Name</label>
                <input
                  id="dishName"
                  type="text"
                  placeholder="e.g., Adobo"
                  className="input-field"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                />
              </div>

              <div className="input-wrapper">
                <label className="input-label" htmlFor="servings">Servings</label>
                <input
                  id="servings"
                  type="number"
                  placeholder="3"
                  className="input-field"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  min="1"
                />
              </div>

              <button className="button-primary" onClick={handleSubmit}>
                Get Ingredients
              </button>
            </div>
          </div>

          {/* Output Section */}
          {ingredients && (
            <div className="card">
              <h2 className="card-title">Shopping List:</h2>
              <div className="ingredients-list">
                {ingredients}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
