import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogHeader from '@/components/BlogHeader';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  read_time: string;
  published_at: string;
}

const Admin = () => {
  const { user, signOut } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    read_time: '',
    slug: ''
  });

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

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
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch articles"
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = formData.slug || generateSlug(formData.title);
      
      const { error } = await supabase
        .from('articles')
        .insert([{
          ...formData,
          slug,
          author_id: user.id
        }]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Article published successfully"
      });

      // Reset form
      setFormData({
        title: '',
        content: '',
        category: '',
        read_time: '',
        slug: ''
      });

      // Refresh articles
      fetchArticles();
    } catch (error: any) {
      console.error('Error publishing article:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to publish article"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Daily Blog</title>
        <meta name="description" content="Admin dashboard for managing Daily Blog articles and content." />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <BlogHeader />
        
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, {user.email}</p>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>

              <Tabs defaultValue="create" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="create">Create Article</TabsTrigger>
                  <TabsTrigger value="manage">Manage Articles</TabsTrigger>
                </TabsList>

                {/* Create Article Tab */}
                <TabsContent value="create" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Article</CardTitle>
                      <CardDescription>
                        Write and publish a new article for your daily blog.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                              id="title"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              placeholder="Enter article title"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                              id="category"
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              placeholder="e.g., Personal Growth"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="read_time">Read Time</Label>
                            <Input
                              id="read_time"
                              name="read_time"
                              value={formData.read_time}
                              onChange={handleChange}
                              placeholder="e.g., 5 min read"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="slug">URL Slug (optional)</Label>
                            <Input
                              id="slug"
                              name="slug"
                              value={formData.slug}
                              onChange={handleChange}
                              placeholder="auto-generated-from-title"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="content">Content *</Label>
                          <Textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your article content here..."
                            rows={12}
                            required
                          />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                          {loading ? 'Publishing...' : 'Publish Article'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Manage Articles Tab */}
                <TabsContent value="manage" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Published Articles</CardTitle>
                      <CardDescription>
                        Manage your published articles. You have {articles.length} article(s).
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {articles.length === 0 ? (
                          <p className="text-center text-muted-foreground py-8">
                            No articles published yet. Create your first article!
                          </p>
                        ) : (
                          articles.map((article) => (
                            <div
                              key={article.id}
                              className="border border-border rounded-lg p-4 hover:shadow-[var(--blog-shadow)] transition-shadow"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                                  <p className="text-muted-foreground text-sm mb-2">
                                    {article.excerpt}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{article.category}</span>
                                    <span>{article.read_time}</span>
                                    <span>{new Date(article.published_at).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="ml-4 space-x-2">
                                  <Button variant="outline" size="sm">
                                    Edit
                                  </Button>
                                  <Button variant="destructive" size="sm">
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Admin;