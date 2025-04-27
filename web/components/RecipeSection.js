import Image from 'next/image';
import Link from 'next/link';

export default function RecipeSection() {
  // Sample recipe cards data
  const recipeCards = [
    { 
      id: 1, 
      title: "Quick Pasta Primavera", 
      time: "20 mins", 
      difficulty: "Easy",
      image: "/images/recipe-pasta.jpg"
    },
    { 
      id: 2, 
      title: "Grilled Chicken Salad", 
      time: "25 mins", 
      difficulty: "Medium",
      image: "/images/recipe-salad.jpg"
    },
    { 
      id: 3, 
      title: "Vegetable Stir Fry", 
      time: "15 mins", 
      difficulty: "Easy",
      image: "/images/recipe-stirfry.jpg"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">What to cook?</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Find the perfect recipe based on ingredients you already have, dietary preferences, and time constraints.
        </p>
      </div>
      
      {/* Recipe Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {recipeCards.map(recipe => (
          <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image 
                src={recipe.image} 
                alt={recipe.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{recipe.title}</h3>
              <div className="flex justify-between text-sm text-gray-500">
                <span>⏱️ {recipe.time}</span>
                <span>📊 {recipe.difficulty}</span>
              </div>
              <Link href={`/recipes/${recipe.id}`} className="mt-4 inline-block text-blue-600 font-medium">
                View Recipe →
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Link href="/recipes" className="inline-block bg-[#d9de49] text-black px-8 py-3 rounded-full font-bold">
          Browse All Recipes
        </Link>
      </div>
    </div>
  );
}