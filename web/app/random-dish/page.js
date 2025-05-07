'use client';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';
import dishes from './dishes.json'; // Import from the same directory

export default function RandomDish() {
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getRandomDish = () => {
    setLoading(true);
    try {
      // Get a random dish from the dishes array
      const randomIndex = Math.floor(Math.random() * dishes.length);
      const randomDish = dishes[randomIndex];
      setDish(randomDish);
    } catch (error) {
      console.error("Failed to get random dish:", error);
      setDish({ dish_name: 'Error loading dish' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomDish();
  }, []);

  useEffect(() => {
    setImageLoaded(false); // reset on new image
  }, [dish]);

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <div className="back-link">
            <Link href="/">← Back to Home</Link>
          </div>

          <h1 className="page-title">Random Dish Suggestion</h1>
          <div className="card">
            {loading ? (
              <h2 className="card-title">Loading...</h2>
            ) : (
              <>
                <h2 className="card-title">{dish?.dish_name || 'No dish found'}</h2>
                {dish?.image && (
                  <div className="mt-4 mb-4 relative">
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
                    )}
                    <img 
                      src={dish.image}
                      alt={dish.dish_name}
                      className={`rounded-lg w-full h-auto transition-opacity duration-300 cursor-pointer ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(true)}
                      onClick={() => setIsModalOpen(true)}
                    />
                  </div>
                )}
                {dish?.description && (
                  <p className="mb-4">{dish.description}</p>
                )}
              </>
            )}

            <div className="flex flex-col gap-4 mt-4">
              {dish && dish.dish_name && !dish.dish_name.startsWith('Error') && dishes.some(d => d.dish_name === dish.dish_name) && (
                <Link
                  href={`/what-to-buy?dish=${encodeURIComponent(dish.dish_name)}`}
                  className="button-primary w-full text-center"
                >
                  ➡️ Cook This Dish
                </Link>
              )}
              <button onClick={getRandomDish} className="button-secondary w-full">
                🔄 Get Another
              </button>
            </div>
          </div>
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
              onClick={() => setIsModalOpen(false)}
            >
              <img
                src={dish.image}
                alt={dish.dish_name}
                className="max-w-full max-h-full object-contain p-4"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}