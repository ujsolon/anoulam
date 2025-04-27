import Image from 'next/image';

export default function ImageGrid() {
  return (
    <div className="image-grid w-full h-full">
      <div className="image-container big-image">
        <Image 
          src="/images/cooking-ingredients.jpg" 
          alt="Food ingredients on a table with hands preparing food"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
      
      <div className="image-container">
        <Image 
          src="/images/phone-app.jpg" 
          alt="Smartphone on a plate with a cooking app"
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
      
      <div className="image-container">
        <Image 
          src="/images/meal-plate.jpg" 
          alt="Delicious meal on a plate with utensils"
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}