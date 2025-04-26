'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-5 md:px-16 py-4 bg-black text-white">
      <Link href="/" className="flex items-center gap-2 font-bold text-lg">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
          <span className="text-black text-xl">★</span>
        </div>
        Ano Ulam?
      </Link>
      
      <nav className="hidden md:flex gap-8 items-center">
        <div className="relative">
          <button 
            className="flex items-center" 
            onClick={() => setFeaturesOpen(!featuresOpen)}
          >
            Features <span className="ml-1 text-xs">▼</span>
          </button>
          {featuresOpen && (
            <div className="absolute top-full left-0 bg-white text-black p-4 rounded shadow-lg">
              {/* Dropdown content */}
              <Link href="#" className="block py-2">Feature 1</Link>
              <Link href="#" className="block py-2">Feature 2</Link>
            </div>
          )}
        </div>
        
        <Link href="/about">About</Link>
        <Link href="/news">News</Link>
        
        <div className="relative">
          <button 
            className="flex items-center" 
            onClick={() => setHelpOpen(!helpOpen)}
          >
            Help <span className="ml-1 text-xs">▼</span>
          </button>
          {helpOpen && (
            <div className="absolute top-full right-0 bg-white text-black p-4 rounded shadow-lg">
              {/* Dropdown content */}
              <Link href="#" className="block py-2">FAQ</Link>
              <Link href="#" className="block py-2">Contact</Link>
            </div>
          )}
        </div>
      </nav>
      
      <Link href="/start" className="bg-[#d9de49] text-black px-6 py-2 rounded-full font-bold">
        Start
      </Link>
    </header>
  );
}