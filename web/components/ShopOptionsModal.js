import React, { useState } from 'react';

export default function ShopOptionsModal({ ingredient, onClose }) {
  const [copied, setCopied] = useState(false);

  const foodpandaLink = `https://www.foodpanda.ph/darkstore/y3xs/pandamart-se/search?q=${encodeURIComponent(ingredient)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(ingredient);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="shop-modal bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl animate-fadeInModal text-center overflow-hidden">
        
        {/* Header with background */}
        <div className="bg-gray-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-700">Shop for:</h3>
          <p className="text-xl font-bold text-gray-900 break-words">{ingredient}</p>
        </div>

        {/* Main options */}
        <div className="px-6 py-8 space-y-6">
          <div>
            <button
              onClick={handleCopy}
              className="w-full text-lg text-black hover:underline flex justify-center items-center gap-2"
            >
              📋 Copy ingredient to clipboard
            </button>
            {copied && (
              <p className="text-green-600 text-sm mt-1">Copied!</p>
            )}
          </div>

          <div>
            <a
              href={foodpandaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-lg text-black hover:underline flex justify-center items-center gap-2"
            >
              🛍 Search in Foodpanda
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full text-sm text-gray-600 hover:text-black hover:underline flex justify-center items-center gap-2"
          >
            ✖ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
