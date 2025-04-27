'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <header className="bg-black text-white py-4 px-5 md:px-16">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <span className="text-black text-xl">★</span>
          </div>
          What&apos;s for Dinner?
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <button 
              className="flex items-center" 
              onClick={() => {
                setFeaturesOpen(!featuresOpen);
                setHelpOpen(false);
              }}
            >
              Features <span className="ml-1 text-xs">▼</span>
            </button>
            {featuresOpen && (
              <div className="absolute top-full mt-1 left-0 bg-white text-black p-4 rounded shadow-lg z-10 min-w-[160px]">
                <Link href="#" className="block py-2 hover:text-gray-600">Recipe Search</Link>
                <Link href="#" className="block py-2 hover:text-gray-600">Meal Planning</Link>
                <Link href="#" className="block py-2 hover:text-gray-600">Shopping Lists</Link>
              </div>
            )}
          </div>
          
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/news" className="hover:text-gray-300">News</Link>
          
          <div className="relative">
            <button 
              className="flex items-center" 
              onClick={() => {
                setHelpOpen(!helpOpen);
                setFeaturesOpen(false);
              }}
            >
              Help <span className="ml-1 text-xs">▼</span>
            </button>
            {helpOpen && (
              <div className="absolute top-full mt-1 right-0 bg-white text-black p-4 rounded shadow-lg z-10 min-w-[160px]">
                <Link href="#" className="block py-2 hover:text-gray-600">FAQ</Link>
                <Link href="#" className="block py-2 hover:text-gray-600">Contact Us</Link>
                <Link href="#" className="block py-2 hover:text-gray-600">Support</Link>
              </div>
            )}
          </div>
          
          <Link href="/start" className="bg-[#d9de49] text-black px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all">
            Start
          </Link>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 pb-2">
          <Link href="#" className="block py-2 border-b border-gray-700">Features</Link>
          <Link href="/about" className="block py-2 border-b border-gray-700">About</Link>
          <Link href="/news" className="block py-2 border-b border-gray-700">News</Link>
          <Link href="#" className="block py-2 border-b border-gray-700">Help</Link>
          <Link href="/start" className="inline-block mt-4 bg-[#d9de49] text-black px-6 py-2 rounded-full font-bold">
            Start
          </Link>
        </nav>
      )}
    </header>
  );
}