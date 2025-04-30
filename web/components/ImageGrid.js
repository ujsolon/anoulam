'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ImageGrid() {
  const router = useRouter();

  const handleImageClick = (altText) => {
    const dishNames = altText.split('plus').map(d => d.trim());
    const chosenDish = dishNames[Math.floor(Math.random() * dishNames.length)];
    router.push(`/what-to-buy?dish=${encodeURIComponent(chosenDish)}`);
  };

  const images = [
    {
      src: '/images/taiwanese-whole-fried-chicken.jpg',
      alt: 'Taiwanese whole fried chicken',
      span: 'row-span-2'
    },
    {
      src: '/images/phone-app.jpg',
      alt: 'Smartphone on a plate with a cooking app'
    },
    {
      src: '/images/grilled-cheese-sandwich-plus-cherry-skyr-with-musli.jpg',
      alt: 'Grilled cheese sandwich plus cherry skyr with musli'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 w-full h-full">
      {images.map((img, index) => (
        <div
          key={index}
          className={`relative cursor-pointer group overflow-hidden ${img.span || ''}`}
          onClick={() => handleImageClick(img.alt)}
        >
          <Image 
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg transition-all duration-300 group-hover:blur-sm"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-white text-lg font-semibold text-center drop-shadow-lg px-2">
              {img.alt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
