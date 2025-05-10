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
    try {
      const response = await axios.post('https://anoulam.onrender.com/dishes-from-ingredients/', {
        ingredients,
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
    }
  };

  const handleDishClick = (dish) => {
    setDishSelected({
      name: dish.dish,
      allIngredients: [...ingredients, ...dish.missing.filter(i => !ingredients.includes(i))],
      missing: dish.missing,
    });
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <h1 className="page-title">Dishes from Ingredients</h1>

          <div className="card">
            <h2 className="card-title">Ingredients List</h2>
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
            <div className="tags-group">
              {ingredients.map((item, i) => (
                <div key={i} className="tag">
                  {item}
                  <button onClick={() => handleRemoveIngredient(i)} className="tag-remove">×</button>
                </div>
              ))}
              {ingredients.length === 0 && <p className="empty-state">No ingredients added yet</p>}
            </div>
            <button className="button-primary mt-4" onClick={fetchSuggestions}>Suggest Dishes</button>
          </div>

          {suggestions.length > 0 && (
            <div className="card">
              <h2 className="card-title">Suggested Dishes</h2>
              <div className="button-group">
                {suggestions.map((dish, idx) => (
                  <button key={idx} className="button-secondary" onClick={() => handleDishClick(dish)}>
                    {dish.dish}
                  </button>
                ))}
              </div>
            </div>
          )}

          {dishSelected && (
            <div className="card">
              <h2 className="card-title">Shopping List for: {dishSelected.name}</h2>
              <ul className="ingredients-list">
                {dishSelected.allIngredients.map((item, idx) => (
                  <li key={idx} className="ingredient-item">
                    <div className="flex justify-between items-center">
                      <span>{item}</span>
                      {dishSelected.missing.includes(item) && (
                        <button
                          onClick={() => setSelectedIngredient(item)}
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
