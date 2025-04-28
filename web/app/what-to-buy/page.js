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
  const [removedItems, setRemovedItems] = useState([]);
  const [loading, setLoading] = useState(false); // NEW!

  const handleSubmit = async () => {
    setLoading(true); // start loading
    try {
      const response = await axios.post('https://anoulam.onrender.com/get-ingredients/', {
        dish_name: dishName,
        servings: servings,
      });
      const ingredientList = response.data.ingredients.split('\n').filter(item => item.trim() !== '');
      setIngredients(ingredientList);
      setCrossedOut(new Set());
      setRemovedItems([]);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      setIngredients(['Error generating ingredients.']);
      setCrossedOut(new Set());
      setRemovedItems([]);
    } finally {
      setLoading(false); // end loading
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

  const handleRemoveCrossedOut = () => {
    const newIngredients = ingredients.filter((_, index) => !crossedOut.has(index));
    const deletedItems = ingredients.filter((_, index) => crossedOut.has(index));
    setIngredients(newIngredients);
    setRemovedItems(deletedItems);
    setCrossedOut(new Set());
  };

  const handleUndoRemove = () => {
    setIngredients(prev => [...prev, ...removedItems]);
    setRemovedItems([]);
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
                  className="button-secondary" 
                  onClick={handleRemoveCrossedOut}
                  disabled={crossedOut.size === 0}
                >
                  Remove Crossed Ingredients
                </button>

                {removedItems.length > 0 && (
                  <button 
                    className="button-secondary" 
                    onClick={handleUndoRemove}
                  >
                    Undo Remove
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
