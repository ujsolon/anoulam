'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from '../../components/Header';
import ShopOptionsModal from '../../components/ShopOptionsModal';
import axios from 'axios';

export default function DishesFromIngredients() {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [dishSelected, setDishSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [highlightedDish, setHighlightedDish] = useState(null);
  const [servings, setServings] = useState(1);

  const handleAddIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const fetchSuggestions = async () => {
    if (!ingredients.length) return;
  
    // Preprocess: trim, lowercase, remove punctuation, split on "+"
    const cleanedIngredients = ingredients.flatMap(item =>
      item
        .split('+')
        .map(sub => sub.trim().toLowerCase().replace(/[^\w\s]/g, '')) // remove punctuation
        .filter(Boolean)
    );
  
    // Update visible ingredients to reflect cleaned version
    setIngredients(cleanedIngredients);
  
    setLoading(true);
    setSubmitClicked(true);
    try {
    const response = await axios.post('https://anoulam.onrender.com/dishes-from-ingredients/', {
        ingredients: cleanedIngredients,
    });
  
      const lines = response.data.suggestions.trim().split(/\n\n/);
      const parsed = lines.map(entry => {
        const [titleLine, missingLine] = entry.split('\n');
        return {
          dish: titleLine?.replace(/^\d+\.\s*/, '').trim(),
          missing: (missingLine?.replace(/^Missing:\s*/, '') || '')
            .split(',')
            .map(i => i.trim())
            .filter(Boolean),
        };
      });
      setSuggestions(parsed);
    } catch (err) {
        console.error('Error fetching suggestions:', err);
    } finally {
    setLoading(false);
    setSubmitClicked(false);
    }
  };  

  const handleDishClick = async (dish, servings) => {
    try {
      const response = await axios.post('https://anoulam.onrender.com/get-ingredients/', {
        dish_name: dish.dish,
        servings: servings,
      });

      const lines = response.data.ingredients.split('\n').map(line => line.trim()).filter(Boolean);
      const parsed = lines.map(line => {
        const clean = line.replace(/^\*\s*/, '');
        const [name, quantity] = clean.split(/\s*-\s*/);
        return {
          name: name?.trim().toLowerCase() || '',
          quantity: quantity?.trim() || '',
        };
      });

      const missingSet = new Set(dish.missing.map(i => i.toLowerCase()));
      const userSet = new Set(ingredients.map(i => i.toLowerCase()));

      setDishSelected({
        name: dish.dish,
        detailedIngredients: parsed.map(item => ({
          ...item,
          isMissing: missingSet.has(item.name) || !Array.from(userSet).some(userIng => item.name.includes(userIng)),
          isUserProvided: Array.from(userSet).some(userIng => item.name.includes(userIng)),
        })),
      });
    } catch (err) {
      console.error('Failed to fetch full ingredients:', err);
      setDishSelected(null);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <h1 className="page-title">Dishes from Ingredients</h1>

            <div className="card">
                <h2 className="card-title">Ingredients List</h2>
                <div className="input-wrapper" style={{ marginBottom: '1rem' }}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
                            placeholder="Type and press Enter"
                            className="input-field"
                        />
                        <button onClick={handleAddIngredient} className="button-primary">Add</button>
                    </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    You can input each ingredient separately, or separate them with <strong>+</strong>
                </p>
                <div className="tags-group">
                {ingredients.map((item, i) => (
                    <div key={i} className="tag">
                    {item}
                    <button onClick={() => handleRemoveIngredient(i)} className="tag-remove">×</button>
                    </div>
                ))}
                {ingredients.length === 0 && <p className="empty-state">No ingredients added yet</p>}
                </div>
                <div className="button-group mt-4">
                    <button 
                        className={`button-primary ${submitClicked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={fetchSuggestions}
                        disabled={loading || submitClicked}
                    >
                        {loading ? 'Generating Suggestions...' : 'Suggest Dishes'}
                    </button>
                </div>
            </div>

          {suggestions.length > 0 && (
            <div className="card">
              <h2 className="card-title">Suggested Dishes</h2>
              <div className="button-group">
                {suggestions.map((dish, idx) => (
                    <button
                    key={idx}
                    className={`button-secondary ${highlightedDish?.dish === dish.dish ? 'active' : ''}`}
                    onClick={() => setHighlightedDish(dish)}
                    >
                    {dish.dish}
                    </button>
                ))}
                </div>
            </div>
          )}

        {highlightedDish && (
        <div className="card">
            <h2 className="card-title">How many servings for {highlightedDish.dish}?</h2>
            <div className="input-group">
            <input
            type="number"
            min="1"
            value={servings === '' ? '' : String(servings)}
            onChange={(e) => {
                const val = e.target.value;
                setServings(val === '' ? '' : parseInt(val, 10));
            }}
            className="input-field"
            placeholder="e.g. 3"
            />
            <button
                className="button-primary"
                onClick={() => handleDishClick(highlightedDish, servings)}
            >
                Get Ingredients
            </button>
            </div>
        </div>
        )}


          {dishSelected?.detailedIngredients?.length > 0 && (
            <div className="card">
              <h2 className="card-title">
                Ingredients for: {dishSelected.name}
                    - {servings || 1} serving{servings > 1 ? 's' : ''}
                </h2>
              <ul className="ingredients-list">
                {dishSelected.detailedIngredients.map((item, idx) => (
                  <li
                    key={idx}
                    className={`ingredient-item ${item.isUserProvided ? 'ingredient-user' : 'ingredient-missing'} rounded-md p-2`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.name} — <strong>{item.quantity}</strong></span>
                      {item.isMissing && (
                        <button
                          onClick={() => setSelectedIngredient(item.name)}
                          className="text-sm text-blue-600 hover:underline ml-4"
                        >
                          🛒
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedIngredient && (
            <ShopOptionsModal
              ingredient={selectedIngredient}
              onClose={() => setSelectedIngredient(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
}