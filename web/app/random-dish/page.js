'use client';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

export default function RandomDish() {
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await fetch('https://anoulam.onrender.com/random-dish/');
        const data = await response.json();
        setDish(data.dish_name || 'No dish found');
      } catch (error) {
        console.error("Failed to fetch random dish:", error);
        setDish('Error loading dish');
      }
    };

    fetchDish();
  }, []);

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <h1 className="page-title">Random Dish Suggestion</h1>
        <div className="card">
          <h2 className="card-title">{dish || "Loading..."}</h2>
          <p className="page-subtitle">(Picture and description coming soon!)</p>

          {dish && !dish.startsWith('Error') && (
            <Link
              href={`/what-to-buy?dish=${encodeURIComponent(dish)}`}
              className="button-primary mt-4 inline-block"
            >
              ➡️ Cook This Dish
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
