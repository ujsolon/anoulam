import Header from '../components/Header';
import ImageGrid from '../components/ImageGrid';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <main className="hero-section">
        <div className="hero-text">
          <h1>Discover meal ideas with ease</h1>
          <p>Get personalized meal suggestions based on what you have at home. Simple, quick, and delicious options await!</p>
          <div className="button-group">
            <div>
              <Link href="/dishes-from-ingredients" className="primary-button">
                🍳 What to Cook?
              </Link>
              <p className="button-description">Enter the ingredients you have, and we’ll suggest dishes.</p>
            </div>
            <div>
              <Link href="/what-to-buy" className="primary-button">
                🛒 What to Buy?
              </Link>
              <p className="button-description">Pick a dish, and we’ll show you what to shop for.</p>
            </div>
            <div>
              <Link href="/random-dish" className="primary-button">
                🎲 Surprise Me!
              </Link>
              <p className="button-description">Get a random dish idea to try today.</p>
            </div>
          </div>
        </div>
        <div className="hero-images">
          <ImageGrid />
        </div>
      </main>
    </div>
  );
}
