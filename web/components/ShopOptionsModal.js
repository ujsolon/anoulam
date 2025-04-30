import React, { useState } from 'react';

export default function ShopOptionsModal({ ingredient, onClose }) {
  const [copied, setCopied] = useState(false);

  const allStores = {
    foodpanda: {
      label: 'Foodpanda',
      icon: '/icons/foodpanda_logo.png',
      link: `https://www.foodpanda.ph/darkstore/y3xs/pandamart-se/search?q=${encodeURIComponent(ingredient)}`
    },
    google: {
      label: 'Google Shopping',
      icon: '/icons/google_shopping_logo.png',
      link: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(ingredient)}`
    },
    metromart: {
      label: 'Metromart',
      icon: '/icons/metromart_logo.png',
      link: `https://www.metromart.com/welcome/shops/search-results?keyword=${encodeURIComponent(ingredient)}`
    },
    sm: {
      label: 'SM Markets',
      icon: '/icons/sm_logo.png',
      link: `https://smmarkets.ph/search.html?query=${encodeURIComponent(ingredient)}`
    },
    waltermart: {
      label: 'Waltermart',
      icon: '/icons/waltermart_logo.png',
      link: `https://www.waltermartdelivery.com.ph/shop#!/?q=${encodeURIComponent(ingredient)}`
    }
  };

  const activeStores = Object.keys(allStores);

  const handleCopy = () => {
    navigator.clipboard.writeText(ingredient);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white border border-gray-200 w-full max-w-md shadow-2xl animate-fadeInModal text-left overflow-hidden px-6 pt-6 pb-4">
        {/* Header */}
        <div className="bg-gray-100 -mx-6 px-6 py-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Shop for:</h3>
          <p className="text-xl font-bold text-gray-900 break-words">{ingredient}</p>
        </div>

        {/* Main actions */}
        <div className="space-y-6">
          {/* Copy button */}
          <div>
            <button
              onClick={handleCopy}
              className="w-full text-lg text-black hover:underline flex items-center gap-3"
            >
              <span>📋</span>
              <span>Copy ingredient to clipboard</span>
            </button>
            {copied && (
              <p className="text-green-600 text-sm mt-1 pl-6">Copied!</p>
            )}
          </div>

          {/* Store links */}
          {activeStores.map((storeKey) => {
            const store = allStores[storeKey];
            return (
              <a
                key={storeKey}
                href={store.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-lg text-black hover:underline flex items-center gap-3"
              >
                <img src={store.icon} alt={store.label} className="w-6 h-6 object-contain" />
                <span>Open {store.label}</span>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 -mx-6 px-6 py-4 mt-8">
          <button
            onClick={onClose}
            className="w-full text-sm text-gray-600 hover:text-black hover:underline flex items-center gap-2"
          >
            <span>✖</span>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
