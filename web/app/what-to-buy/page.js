'use client';

import Header from '../../components/Header';
import Link from 'next/link';

export default function WhatToBuy() {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <div className="back-link">
            <Link href="/">← Back to Home</Link>
          </div>

          <h1 className="page-title">What to Buy?</h1>
          <p className="page-subtitle">
            Never wonder what groceries to get again. Our smart shopping list creator helps you:
          </p>

          <div className="card">
            <ul className="list-group">
              <li className="list-item">✓ Generate shopping lists based on your meal plans</li>
              <li className="list-item">✓ Find the best deals at local grocery stores</li>
              <li className="list-item">✓ Reduce food waste by buying exactly what you need</li>
              <li className="list-item">✓ Track pantry inventory so you never buy duplicates</li>
            </ul>
          </div>

          <Link href="/shopping" className="button-primary link-button">
            Create Shopping List
          </Link>
        </div>
      </main>
    </div>
  );
}
