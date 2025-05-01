'use client';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

export default function RandomDish() {
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDish = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://your-backend-url/random-dish/');
      const data = await response.json();
      setDish(data.dish_name || 'No dish found');
    } catch (error) {
      console.error("Failed to fetch random dish:", error);
      setDish('Error loading dish');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDish();
  }, []);

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
            <h2 className="card-title">{loading ? 'Loading...' : dish}</h2>
            <p className="page-subtitle">(Picture and description coming soon!)</p>

            <div className="button-group">
              <button onClick={fetchDish} className="button-secondary">
                🔄 Get Another
              </button>

              {dish && !dish.startsWith('Error') && (
                <Link
                  href={`/what-to-buy?dish=${encodeURIComponent(dish)}`}
                  className="button-primary"
                >
                  ➡️ Cook This Dish
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
