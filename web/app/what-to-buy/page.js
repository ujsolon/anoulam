'use client';
import { useState, Suspense } from 'react';
import Header from '../../components/Header';
import ShopOptionsModal from '../../components/ShopOptionsModal';
import Link from 'next/link';
import axios from 'axios';
import DishPrefill from '../../components/DishPrefill';

export default function WhatToBuy() {
  const [dishName, setDishName] = useState('');
  const [servings, setServings] = useState(3);
  const [ingredients, setIngredients] = useState([]);
  const [crossedOut, setCrossedOut] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [cookingSteps, setCookingSteps] = useState([]);
  const [cookingLoading, setCookingLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [dishImage, setDishImage] = useState('');
  const [finishedCooking, setFinishedCooking] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  
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
      setCompletedSteps(new Set());
      setFinishedCooking(false);
      setDishImage('');
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      setIngredients(['Error generating ingredients.']);
      setCrossedOut(new Set());
      setCookingSteps([]);
      setCompletedSteps(new Set());
      setFinishedCooking(false);
      setDishImage('');
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
      const matches = rawSteps.match(/\d+\.\s.*?(?=(\d+\.\s)|$)/gs);
      const cleanedSteps = matches ? matches.map(step => step.replace(/^\d+\.\s/, '').trim()) : [];
      setCookingSteps(cleanedSteps);
    } catch (error) {
      console.error('Error fetching cooking steps:', error);
      setCookingSteps(['Error generating cooking instructions.']);
    } finally {
      setCookingLoading(false);
    }
  };

  const handleStepClick = (index) => {
    const currentCompletedCount = completedSteps.size;
    if (index === currentCompletedCount) {
      const newCompletedSteps = new Set(completedSteps);
      newCompletedSteps.add(index);
      setCompletedSteps(newCompletedSteps);
    } else if (index === currentCompletedCount - 1) {
      const newCompletedSteps = new Set(completedSteps);
      newCompletedSteps.delete(index);
      setCompletedSteps(newCompletedSteps);
    }
  };

  const fetchDishImage = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: dishName + ' food',
          client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
          per_page: 1,
        },
      });
      
      console.log('Unsplash search result:', response.data);
  
      if (response.data.results && response.data.results.length > 0) {
        setDishImage(response.data.results[0].urls.regular);
      } else {
        setDishImage('');
      }
    } catch (error) {
      console.error('Error fetching dish image:', error);
      setDishImage('');
    }
  };
  
  const handleFinishCooking = async () => {
    const allSteps = new Set(cookingSteps.map((_, index) => index));
    setCompletedSteps(allSteps);

    await fetchDishImage();
    setFinishedCooking(true);
  };

  return (
    <div className="page-container">
      <Header />
      <Suspense fallback={null}>
        <DishPrefill onSetDish={setDishName} />
      </Suspense>
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

          {/* Ingredients List */}
          {ingredients.length > 0 && (
            <div className="card">
              <h2 className="card-title">Shopping List:</h2>

              <ul className="ingredients-list">
                {ingredients.map((item, index) => (
                  <li key={index} className={`ingredient-item ${crossedOut.has(index) ? 'crossed' : ''}`}>
                  <div className="flex justify-between items-center">
                    <span onClick={() => toggleCrossOut(index)} className="flex-1 cursor-pointer">{item}</span>
                    <button
                      onClick={() => setSelectedIngredient(item)}
                      className="text-sm text-blue-600 hover:underline ml-4"
                    >
                      🛒
                    </button>
                  </div>
                </li>
                
                ))}
              </ul>
              
              {selectedIngredient && (
                <ShopOptionsModal
                  ingredient={selectedIngredient}
                  onClose={() => setSelectedIngredient(null)}
                />
              )}
              
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
              <ol className="cooking-steps">
              {cookingSteps.map((step, index) => (
                <li
                  key={index}
                  className={`cooking-step-item ${completedSteps.has(index) ? 'completed' : ''}`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="step-inner">
                    <span className="step-text">{step}</span>
                    <span className="checkbox">
                      {completedSteps.has(index) ? '☑' : '☐'}
                    </span>
                  </div>
                </li>
              ))}
              </ol>

              {/* Finish Cooking Button (always after steps generated) */}
              {!finishedCooking && (
                <div className="button-group">
                  <button 
                    className="button-primary"
                    onClick={handleFinishCooking}
                  >
                    Finish Cooking
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Congratulations Section */}
          {finishedCooking && (
            <div className="card congratulations">
              <h2 className="card-title">🎉 Enjoy your {dishName}!</h2>
              {dishImage && (
                <img 
                  src={dishImage} 
                  alt={dishName || 'Delicious meal'} 
                  className="dish-image"
                  onError={(e) => {
                    console.error('Dish image failed to load.');
                    e.target.style.display = 'none'; // Hide the image if it fails
                  }}
                />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
