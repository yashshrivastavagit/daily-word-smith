import BlogHeader from "@/components/BlogHeader";
import BlogHero from "@/components/BlogHero";
import FeaturedPost from "@/components/FeaturedPost";
import BlogCard from "@/components/BlogCard";

const Index = () => {
  // Sample blog data - in a real app, this would come from an API or CMS
  const featuredPost = {
    title: "The Art of Mindful Writing: How Daily Blogging Transformed My Perspective",
    excerpt: "Discover how the simple practice of daily writing can reshape your thoughts, clarify your goals, and connect you with a community of like-minded readers. This journey into mindful expression reveals surprising insights about creativity and personal growth.",
    date: "Dec 21, 2024",
    readTime: "8 min read",
    category: "Personal Growth",
    slug: "mindful-writing-daily-blogging"
  };

  const recentPosts = [
    {
      title: "Building Habits That Stick: A Science-Based Approach",
      excerpt: "Explore the neuroscience behind habit formation and discover practical strategies that actually work for creating lasting positive changes in your life.",
      date: "Dec 20, 2024",
      readTime: "6 min read",
      category: "Productivity",
      slug: "building-habits-that-stick"
    },
    {
      title: "The Power of Deep Work in a Distracted World",
      excerpt: "In an age of constant notifications and endless scrolling, learn how to reclaim your focus and achieve meaningful productivity through deep work principles.",
      date: "Dec 19, 2024",
      readTime: "7 min read",
      category: "Focus",
      slug: "power-of-deep-work"
    },
    {
      title: "Minimalism Beyond Aesthetics: A Mental Framework",
      excerpt: "True minimalism isn't just about having fewer things—it's about creating mental space for what truly matters. Discover how to apply minimalist principles to your thoughts and decisions.",
      date: "Dec 18, 2024",
      readTime: "5 min read",
      category: "Lifestyle",
      slug: "minimalism-mental-framework"
    },
    {
      title: "The Science of Creativity: Unlocking Your Innovative Potential",
      excerpt: "Recent research reveals fascinating insights about how creativity works in the brain. Learn practical techniques to enhance your creative thinking and problem-solving abilities.",
      date: "Dec 17, 2024",
      readTime: "9 min read",
      category: "Creativity",
      slug: "science-of-creativity"
    },
    {
      title: "Digital Wellness: Finding Balance in the Connected Age",
      excerpt: "Technology should enhance our lives, not dominate them. Explore strategies for maintaining a healthy relationship with your devices while staying connected to what matters.",
      date: "Dec 16, 2024",
      readTime: "6 min read",
      category: "Wellness",
      slug: "digital-wellness-balance"
    },
    {
      title: "The Art of Thoughtful Communication in Modern Times",
      excerpt: "In a world of instant messaging and quick reactions, learn how to communicate with intention, empathy, and clarity. Transform your relationships through mindful dialogue.",
      date: "Dec 15, 2024",
      readTime: "8 min read",
      category: "Communication",
      slug: "thoughtful-communication"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main>
        <BlogHero />
        
        {/* Featured Post Section */}
        <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Featured Article</h2>
              <FeaturedPost {...featuredPost} />
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Recent Articles</h2>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post, index) => (
                  <BlogCard key={index} {...post} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Never Miss an Article</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of readers who get fresh insights delivered to their inbox every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Daily Word Smith. Crafted with care for thoughtful readers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
