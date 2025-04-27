'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

export default function WhatToBuy() {
  const [mealCount, setMealCount] = useState(3);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [peopleCount, setPeopleCount] = useState(2);
  const [checkPantry, setCheckPantry] = useState(false);
  
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">What should I buy?</h1>
          <p className="text-lg text-gray-600 mb-8">
            Plan your grocery shopping with a personalized list based on recipes you want to make.
          </p>
          
          {/* Number of Meals */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">Number of meals to plan for:</h2>
            <div className="flex items-center">
              <button 
                onClick={() => setMealCount(Math.max(1, mealCount - 1))}
                className="px-4 py-2 border rounded-l-lg bg-gray-100 hover:bg-gray-200"
                disabled={mealCount <= 1}
              >
                -
              </button>
              <span className="px-6 py-2 border-t border-b text-center min-w-[60px]">
                {mealCount}
              </span>
              <button 
                onClick={() => setMealCount(Math.min(14, mealCount + 1))}
                className="px-4 py-2 border rounded-r-lg bg-gray-100 hover:bg-gray-200"
                disabled={mealCount >= 14}
              >
                +
              </button>
              <span className="ml-3 text-gray-600">meals</span>
            </div>
          </div>
          
          {/* Number of People */}
          <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-3">Number of people:</h2>
            <div className="flex items-center">
              <button 
                onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                className="px-4 py-2 border rounded-l-lg bg-gray-100 hover:bg-gray-200"
                disabled={peopleCount <= 1}
              >
                -
              </button>
              <span className="px-6 py-2 border-t border-b text-center min-w-[60px]">
                {peopleCount}
              </span>
              <button 
                onClick={() => setPeopleCount(Math.min(12, peopleCount + 1))}
                className="px-4 py-2 border rounded-r-lg bg-gray-100 hover:bg-gray-200"
                disabled={peopleCount >= 12}
              >
                +
              </button>
              <span className="ml-3 text-gray-600">people</span>
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
          
          {/* Pantry Check Option */}
          <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded" 
                checked={checkPantry}
                onChange={() => setCheckPantry(!checkPantry)}
              />
              <span className="ml-2 text-lg">Check against my pantry to avoid buying duplicates</span>
            </label>
          </div>
          
          {/* Submit Button */}
          <button className="primary-btn mb-8">
            Generate Shopping List
          </button>
        </div>
      </main>
    </div>
  );
}