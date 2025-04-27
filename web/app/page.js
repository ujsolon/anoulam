import Header from '../components/Header';
import ImageGrid from '../components/ImageGrid';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <main className="flex-grow flex flex-col md:flex-row items-center md:items-stretch px-5 md:px-16 py-10 md:py-16">
        
        {/* Left Side: Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
            Discover meal ideas with ease
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            Get personalized meal suggestions based on what you have at home. Simple, quick, and delicious options await!
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-6">
            <div>
              <Link href="/what-to-cook" className="primary-btn">
                <span className="mr-2">🍳</span> What to Cook?
              </Link>
              <p className="mt-2 text-gray-600 ml-2">Tell us what stuff you have!</p>
            </div>

            <div>
              <Link href="/what-to-buy" className="secondary-btn">
                <span className="mr-2">🛒</span> What to Buy?
              </Link>
              <p className="mt-2 text-gray-600 ml-2">Tell us what dish you want to cook today!</p>
            </div>
          </div>
        </div>

        {/* Right Side: Image Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
          <ImageGrid />
        </div>

      </main>
    </div>
  );
}
