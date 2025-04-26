import Header from '../components/Header';
import ImageGrid from '../components/ImageGrid';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-col md:flex-row px-5 md:px-16 py-10 flex-grow">
        <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
            Discover meal ideas with ease
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get personalized meal suggestions based on what you have at home. Simple, quick, and delicious options await!
          </p>
        </div>
        
        <div className="w-full md:w-1/2">
          <ImageGrid />
        </div>
      </div>
    </main>
  );
}