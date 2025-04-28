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
              <Link href="/what-to-cook" className="primary-button">
                🍳 What to Cook?
              </Link>
              <p className="button-description">Tell us what stuff you have!</p>
            </div>
            <div>
              <Link href="/what-to-buy" className="secondary-button">
                🛒 What to Buy?
              </Link>
              <p className="button-description">Tell us what dish you want to cook today!</p>
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
