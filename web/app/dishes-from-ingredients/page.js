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
  const [dishCache, setDishCache] = useState({});
  const [generatingIngredients, setGeneratingIngredients] = useState(false);
  const [ingredientsModified, setIngredientsModified] = useState(false);
  const [crossedOut, setCrossedOut] = useState(new Set());
  // 0 = normal, 1 = crossed, 2 = user-provided (green box)
  const [ingredientStates, setIngredientStates] = useState(new Map());
  const [copied, setCopied] = useState(false);


  const handleAddIngredient = () => {
    setIngredientsModified(true);
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredientsModified(true);
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
        const response = await axios.post(`https://anoulam-api-220347503635.us-east1.run.app/dishes-from-ingredients/`, {
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
        setIngredientsModified(false);
        } catch (err) {
        console.error('Error fetching suggestions:', err);
    } finally {
        setLoading(false);
        setSubmitClicked(false);
    }
  };  

  const handleDishClick = async (dish, servings) => {
    if (!servings || isNaN(servings) || servings < 1) {
        alert("Please enter a valid number of servings.");
        return;
      }
    const dishKey = `${dish.dish.toLowerCase()}_${servings}`;
    // If cached, use it
    if (dishCache[dishKey]) {
        const cachedIngredients = dishCache[dishKey];
        setDishSelected({
          name: dish.dish,
          detailedIngredients: cachedIngredients,
        });
        
        // Re-init ingredientStates from cache
        const initialStates = new Map();
        cachedIngredients.forEach((item, idx) => {
          if (item.isUserProvided) {
            initialStates.set(idx, 2);
          }
        });
        setIngredientStates(initialStates);
      return;
    }
    setGeneratingIngredients(true);
    try {
      const response = await axios.post(`https://anoulam-api-220347503635.us-east1.run.app/get-ingredients/`, {
        dish_name: dish.dish,
        servings,
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
  
      const processedIngredients = parsed.map(item => ({
        ...item,
        isMissing: missingSet.has(item.name) || !Array.from(userSet).some(userIng => item.name.includes(userIng)),
        isUserProvided: Array.from(userSet).some(userIng => item.name.includes(userIng)),
      }));
  
      // Save to state and cache
      setDishSelected({
        name: dish.dish,
        detailedIngredients: processedIngredients,
      });
      
      // Re-init ingredientStates from API result
      const initialStates = new Map();
      processedIngredients.forEach((item, idx) => {
        if (item.isUserProvided) {
          initialStates.set(idx, 2);
        }
      });
      setIngredientStates(initialStates);
      
      setDishCache(prev => ({
        ...prev,
        [dishKey]: processedIngredients,
      }));
    } catch (err) {
      console.error('Failed to fetch full ingredients:', err);
      setDishSelected(null);
    }
    setGeneratingIngredients(false);
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
                {loading
                    ? 'Generating Suggestions...'
                    : ingredientsModified
                    ? 'Suggest Dishes (Updated Ingredients)'
                    : 'Suggest Dishes'}
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
                    onClick={() => {
                        const dishKey = `${dish.dish.toLowerCase()}_${servings}`;
                        setHighlightedDish(dish);
                        if (dishCache[dishKey]) {
                            // Immediately show cached ingredients
                            setDishSelected({
                              name: dish.dish,
                              detailedIngredients: dishCache[dishKey],
                            });
                          } else {
                            // Clear view for ungenerated dish
                            setDishSelected(null);
                          }
                    }}
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
            className={`button-primary ${generatingIngredients ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handleDishClick(highlightedDish, servings)}
            disabled={generatingIngredients}
            >
            {generatingIngredients ? 'Loading...' : 'Get Ingredients'}
            </button>
            </div>
        </div>
        )}


          {dishSelected?.detailedIngredients?.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <h2 className="card-title">
                    Ingredients for: {dishSelected.name} — {servings || 1} serving{servings > 1 ? 's' : ''}
                </h2>
                <button
                    onClick={() => {
                    const toCopy = dishSelected.detailedIngredients
                        .filter((_, idx) => {
                        const state = ingredientStates.get(idx);
                        return state !== 1 && state !== 2; // exclude crossed out and user-provided (green)
                        })
                        .map(item => `${item.name} — ${item.quantity}`)
                        .join('\n');

                    const fullText = `Ingredients for: ${dishSelected.name} (${servings || 1} serving${servings > 1 ? 's' : ''})\n${toCopy}`;
                    navigator.clipboard.writeText(fullText);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-lg hover:text-gray-700"
                    title="Copy uncrossed + unconfirmed items"
                >
                    {copied ? <span className="text-green-600 text-sm">✔ Copied!</span> : '📋'}
                </button>
                </div>
            
              <ul className="ingredients-list">
                {dishSelected.detailedIngredients.map((item, idx) => (
                  <li
                  key={idx}
                  onClick={() => {
                    setIngredientStates(prev => {
                        const newMap = new Map(prev);
                        const current = newMap.get(idx) ?? 0;
                        const next = (current + 1) % 3;
                        newMap.set(idx, next);
                      
                        // If toggling into green, add to ingredients[] if not present
                        const normalizedName = item.name.trim().toLowerCase();
                    
                        // Check if normalizedName is already in ingredients before adding
                        if (next === 2 && !ingredients.includes(normalizedName)) {
                          setIngredients(prevIngredients => 
                            prevIngredients.some(i => i.trim().toLowerCase() === normalizedName) 
                              ? prevIngredients // If already exists (case insensitive), don't add
                              : [...prevIngredients, normalizedName]
                          );
                        }
                    
                        // If toggling out of green, remove from ingredients
                        if (current === 2 && next !== 2) {
                          setIngredients(prev =>
                            prev.filter(i => i.trim().toLowerCase() !== normalizedName)
                          );
                        }
                    
                        return newMap;
                      });
                  }}
                  className={`ingredient-item rounded-md p-2 cursor-pointer
                    ${ingredientStates.get(idx) === 1 ? 'crossed' : ''}
                    ${ingredientStates.get(idx) === 2 ? 'ingredient-user' : ''}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span>{item.name} — {item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent click from toggling state
                        setSelectedIngredient(item.name);
                      }}
                      className="text-sm text-blue-600 hover:underline ml-4"
                    >
                      🛒
                    </button>
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