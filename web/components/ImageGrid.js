import Image from 'next/image';

export default function ImageGrid() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
      {/* Big Image (spans two rows) */}
      <div className="relative row-span-2">
        <Image 
          src="/images/prepare-ingredients.jpg" 
          alt="Food ingredients on a table with hands preparing food"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
      
      {/* Two Smaller Images */}
      <div className="relative">
        <Image 
          src="/images/phone-app.jpg" 
          alt="Smartphone on a plate with a cooking app"
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
      
      <div className="relative">
        <Image 
          src="/images/grilled-cheese-sandwich-plus-cherry-skyr-with-musli.jpg" 
          alt="Grilled cheese sandwich plus cherry skyr with musli"
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
