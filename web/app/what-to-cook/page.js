'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

export default function WhatToCook() {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [cookingTime, setCookingTime] = useState('any');

  const handleAddIngredient = () => {
    if (inputValue.trim() !== '' && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const toggleDietaryPreference = (preference) => {
    if (dietaryPreferences.includes(preference)) {
      setDietaryPreferences(dietaryPreferences.filter(p => p !== preference));
    } else {
      setDietaryPreferences([...dietaryPreferences, preference]);
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

          <h1 className="page-title">What can I cook?</h1>
          <p className="page-subtitle">
            Enter the ingredients you have, and we'll suggest recipes you can make.
          </p>

          {/* Ingredients Input */}
          <div className="card">
            <h2 className="card-title">Ingredients I have:</h2>
            <div className="input-group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
                placeholder="Add an ingredient (e.g., chicken, rice, tomatoes)"
                className="input-field"
              />
              <button 
                onClick={handleAddIngredient}
                className="button-primary"
              >
                Add
              </button>
            </div>

            <div className="tags-group">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="tag">
                  {ingredient}
                  <button 
                    onClick={() => handleRemoveIngredient(index)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                </div>
              ))}
              {ingredients.length === 0 && (
                <p className="empty-state">No ingredients added yet</p>
              )}
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="card">
            <h2 className="card-title">Dietary preferences (optional):</h2>
            <div className="button-group">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Keto'].map((preference) => (
                <button
                  key={preference}
                  onClick={() => toggleDietaryPreference(preference)}
                  className={`button-secondary ${dietaryPreferences.includes(preference) ? 'active' : ''}`}
                >
                  {preference}
                </button>
              ))}
            </div>
          </div>

          {/* Cooking Time */}
          <div className="card">
            <h2 className="card-title">Cooking time:</h2>
            <div className="button-group">
              {[
                { value: 'any', label: 'Any time' },
                { value: '15', label: 'Under 15 min' },
                { value: '30', label: 'Under 30 min' },
                { value: '60', label: 'Under 1 hour' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCookingTime(option.value)}
                  className={`button-secondary ${cookingTime === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button className="button-primary">
            Find Recipes
          </button>
        </div>
      </main>
    </div>
  );
}
