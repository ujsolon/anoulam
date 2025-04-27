import Image from 'next/image';
import Link from 'next/link';

export default function ShoppingSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <Image 
              src="/images/shopping-list.jpg" 
              alt="Shopping list and grocery items"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Right side - Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold mb-6">What to buy?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Never wonder what groceries to get again. Our smart shopping list creator helps you:
          </p>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span>Generate shopping lists based on your meal plans</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span>Find the best deals at local grocery stores</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span>Reduce food waste by buying exactly what you need</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 font-bold mr-2">✓</span>
              <span>Track pantry inventory so you never buy duplicates</span>
            </li>
          </ul>
          
          <Link href="/shopping" className="inline-block bg-[#d9de49] text-black px-8 py-3 rounded-full font-bold">
            Create Shopping List
          </Link>
        </div>
      </div>
    </div>
  );
}