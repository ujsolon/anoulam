'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';
import axios from 'axios';

export default function WhatToBuy() {
  const [dishName, setDishName] = useState('');
  const [servings, setServings] = useState(3);
  const [ingredients, setIngredients] = useState([]);
  const [crossedOut, setCrossedOut] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [cookingSteps, setCookingSteps] = useState([]);
  const [cookingLoading, setCookingLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://anoulam.onrender.com/get-ingredients/', {
        dish_name: dishName,
        servings: servings,
      });
      const ingredientList = response.data.ingredients.split('\n').filter(item => item.trim() !== '');
      setIngredients(ingredientList);
      setCrossedOut(new Set());
      setCookingSteps([]);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      setIngredients(['Error generating ingredients.']);
      setCrossedOut(new Set());
      setCookingSteps([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCrossOut = (index) => {
    const newCrossedOut = new Set(crossedOut);
    if (newCrossedOut.has(index)) {
      newCrossedOut.delete(index);
    } else {
      newCrossedOut.add(index);
    }
    setCrossedOut(newCrossedOut);
  };

  const handleCookDish = async () => {
    setCookingLoading(true);
    try {
      const response = await axios.post('https://anoulam.onrender.com/get-cooking-steps/', {
        dish_name: dishName,
        ingredients: ingredients,
      });
  
      const rawSteps = response.data.steps;
      // Split by a regex that finds numbers followed by dot and space
      const stepsList = rawSteps.split(/(?<=\d\.)\s+/).filter(step => step.trim() !== '');
      
      setCookingSteps(stepsList);
    } catch (error) {
      console.error('Error fetching cooking steps:', error);
      setCookingSteps(['Error generating cooking instructions.']);
    } finally {
      setCookingLoading(false);
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

              <button 
                className="button-primary" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Ingredients'}
              </button>
            </div>
          </div>

          {/* Output Section */}
          {ingredients.length > 0 && (
            <div className="card">
              <h2 className="card-title">Shopping List:</h2>

              <ul className="ingredients-list">
                {ingredients.map((item, index) => (
                  <li
                    key={index}
                    className={`ingredient-item ${crossedOut.has(index) ? 'crossed' : ''}`}
                    onClick={() => toggleCrossOut(index)}
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="button-group">
                <button 
                  className="button-primary"
                  onClick={handleCookDish}
                  disabled={cookingLoading}
                >
                  {cookingLoading ? 'Generating Steps...' : 'Cook This Dish'}
                </button>
              </div>
            </div>
          )}

          {/* Cooking Instructions */}
          {cookingSteps.length > 0 && (
            <div className="card">
              <h2 className="card-title">How to Cook: {dishName}</h2>
              <div className="cooking-steps-output">
                {cookingSteps}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
