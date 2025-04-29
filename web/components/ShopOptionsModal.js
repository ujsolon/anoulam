import React from 'react';

export default function ShopOptionsModal({ ingredient, onClose }) {
  const foodpandaSearch = `https://www.foodpanda.ph/darkstore/y3xs/pandamart-se/search?q=${encodeURIComponent(ingredient)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(foodpandaSearch);
    alert('Link copied to clipboard!');
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center z-50 px-4">
  <div className="shop-modal bg-white rounded-xl p-6 w-full max-w-md shadow-xl animate-fadeInModal text-center">
    <h3 className="text-lg font-semibold mb-1">Shop for:</h3>
    <p className="text-gray-800 font-medium mb-6 break-words">{ingredient}</p>

    <ul className="space-y-4">
      <li>
        <a
          href={foodpandaSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-sm text-black hover:underline"
        >
          🔎 Open Foodpanda Search
        </a>
      </li>
      <li>
        <button
          onClick={copyToClipboard}
          className="block w-full text-sm text-black hover:underline"
        >
          📋 Copy Link to Clipboard
        </button>
      </li>
      <li>
        <a
          href="https://www.foodpanda.ph/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-sm text-black hover:underline"
        >
          🛍 Open Foodpanda Home
        </a>
      </li>
    </ul>

    <button
      onClick={onClose}
      className="mt-6 w-full text-sm text-gray-500 hover:text-black hover:underline"
    >
      Cancel
    </button>
  </div>
</div>

  );
}
