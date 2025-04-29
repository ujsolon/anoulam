import React, { useState, useEffect } from 'react';

export default function ShopOptionsModal({ ingredient, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeStores, setActiveStores] = useState([]);

  const allStores = {
    foodpanda: {
      label: 'Foodpanda',
      icon: '🛍',
      link: `https://www.foodpanda.ph/darkstore/y3xs/pandamart-se/search?q=${encodeURIComponent(ingredient)}`
    },
    google: {
      label: 'Google Shopping',
      icon: '🔍',
      link: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(ingredient)}`
    },
    metromart: {
      label: 'Metromart',
      icon: '🛒',
      link: `https://www.metromart.com/welcome/shops/search-results?keyword=${encodeURIComponent(ingredient)}`
    },
    sm: {
      label: 'SM Markets',
      icon: '🏬',
      link: `https://smmarkets.ph/search.html?query=${encodeURIComponent(ingredient)}`
    },
    waltermart: {
      label: 'Waltermart',
      icon: '🛍️',
      link: `https://www.waltermartdelivery.com.ph/shop#!/?q=${encodeURIComponent(ingredient)}`
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('preferredStores');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setActiveStores(parsed);
      } catch {
        setActiveStores(Object.keys(allStores));
      }
    } else {
      setActiveStores(Object.keys(allStores));
    }
  }, [ingredient]);

  const handleCopy = () => {
    navigator.clipboard.writeText(ingredient);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-2xl animate-fadeInModal text-left overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-700">Shop for:</h3>
          <p className="text-xl font-bold text-gray-900 break-words">{ingredient}</p>
        </div>

        {/* Main options */}
        <div className="px-6 py-8 space-y-6">
          <div>
            <button
              onClick={handleCopy}
              className="w-full text-lg text-black hover:underline flex justify-start items-center gap-2"
            >
              <span>📋</span>
              <span>Copy ingredient to clipboard</span>
            </button>
            {copied && <p className="text-green-600 text-sm mt-1 pl-6">Copied!</p>}
          </div>

          {activeStores.map((storeKey) => {
            const store = allStores[storeKey];
            if (!store) return null;
            return (
              <div key={storeKey}>
                <a
                  href={store.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-lg text-black hover:underline flex justify-start items-center gap-2"
                >
                  <span>{store.icon}</span>
                  <span>Open {store.label}</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full text-sm text-gray-600 hover:text-black hover:underline flex justify-start items-center gap-2"
          >
            <span>✖</span>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
