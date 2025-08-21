import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BlogHeader from "@/components/BlogHeader";
import BlogHero from "@/components/BlogHero";
import FeaturedPost from "@/components/FeaturedPost";
import BlogCard from "@/components/BlogCard";
import SearchAndNewsletter from "@/components/SearchAndNewsletter";
import { supabase } from '@/integrations/supabase/client';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  read_time: string;
  published_at: string;
}

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter articles based on search term
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredPost = articles.length > 0 ? {
    title: articles[0].title,
    excerpt: articles[0].excerpt,
    date: new Date(articles[0].published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    readTime: articles[0].read_time || '5 min read',
    category: articles[0].category || 'Blog',
    slug: articles[0].slug
  } : null;

  return (
    <>
      <Helmet>
        <title>Daily Blog - Your Source for Daily Insights</title>
        <meta name="description" content="Explore daily articles and subscribe for the latest insights on personal growth, productivity, and mindful living." />
        <meta name="keywords" content="daily blog, insights, personal growth, productivity, mindfulness, articles" />
        <meta property="og:title" content="Daily Blog - Your Source for Daily Insights" />
        <meta property="og:description" content="Explore daily articles and subscribe for the latest insights." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <BlogHeader />
        
        <main>
          <BlogHero />
          
          {/* Search and Newsletter Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SearchAndNewsletter 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </section>
          
          {/* Featured Post Section */}
          {featuredPost && (
            <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Featured Article</h2>
                  <FeaturedPost {...featuredPost} />
                </div>
              </div>
            </section>
          )}

          {/* Recent Posts Section */}
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
                  {searchTerm ? `Search Results for "${searchTerm}"` : 'Recent Articles'}
                </h2>
                
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading articles...</p>
                  </div>
                ) : filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      {searchTerm ? 'No articles found matching your search.' : 'No articles published yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredArticles.slice(featuredPost ? 1 : 0).map((article) => (
                      <BlogCard 
                        key={article.id} 
                        title={article.title}
                        excerpt={article.excerpt}
                        date={new Date(article.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                        readTime={article.read_time || '5 min read'}
                        category={article.category || 'Blog'}
                        slug={article.slug}
                      />
                    ))}
                  </div>
                )}
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
    </>
  );
};

export default Index;
