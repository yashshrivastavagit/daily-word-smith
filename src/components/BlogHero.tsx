import { Button } from "@/components/ui/button";
import heroImage from "@/assets/blog-hero.jpg";

const BlogHero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Daily Insights for the
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"> Modern Mind</span>
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Discover thought-provoking articles, insights, and stories that inspire growth and spark meaningful conversations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300">
              Start Reading
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300">
              Subscribe to Newsletter
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;