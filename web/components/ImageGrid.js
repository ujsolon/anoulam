import Image from 'next/image';

export default function ImageGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div className="row-span-2">
        <div className="relative w-full h-full min-h-[300px]">
          <Image 
            src="/images/cooking-ingredients.jpg" 
            alt="Food ingredients on a table with hands preparing food"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            priority
          />
        </div>
      </div>
      
      <div>
        <div className="relative w-full h-full min-h-[150px]">
          <Image 
            src="/images/phone-app.jpg" 
            alt="Smartphone on a plate with a cooking app"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      </div>
      
      <div>
        <div className="relative w-full h-full min-h-[150px]">
          <Image 
            src="/images/meal-plate.jpg" 
            alt="Delicious meal on a plate with utensils"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}