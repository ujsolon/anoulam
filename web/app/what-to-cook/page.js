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
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-10 px-5 md:px-16">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-8">
            <Link href="/" className="text-blue-600 hover:underline flex items-center">
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">What can I cook?</h1>
          <p className="text-lg text-gray-600 mb-8">
            Enter the ingredients you have, and we'll suggest recipes you can make.
          </p>
          
          {/* Ingredients Input */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">Ingredients I have:</h2>
            <div className="flex mb-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
                placeholder="Add an ingredient (e.g., chicken, rice, tomatoes)"
                className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleAddIngredient}
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            
            {/* Ingredients Tags */}
            <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
              {ingredients.map((ingredient, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
                >
                  {ingredient}
                  <button 
                    onClick={() => handleRemoveIngredient(index)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
              {ingredients.length === 0 && (
                <p className="text-gray-500 italic">No ingredients added yet</p>
              )}
            </div>
          </div>
          
          {/* Dietary Preferences */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">Dietary preferences (optional):</h2>
            <div className="flex flex-wrap gap-3">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Keto'].map((preference) => (
                <button
                  key={preference}
                  onClick={() => toggleDietaryPreference(preference)}
                  className={`px-4 py-2 rounded-full border ${
                    dietaryPreferences.includes(preference)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {preference}
                </button>
              ))}
            </div>
          </div>
          
          {/* Cooking Time */}
          <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">Cooking time:</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'any', label: 'Any time' },
                { value: '15', label: 'Under 15 min' },
                { value: '30', label: 'Under 30 min' },
                { value: '60', label: 'Under 1 hour' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCookingTime(option.value)}
                  className={`px-4 py-2 rounded-full border ${
                    cookingTime === option.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <button className="primary-btn mb-8">
            Find Recipes
          </button>
        </div>
      </main>
    </div>
  );
}