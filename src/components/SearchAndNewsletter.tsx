import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SearchAndNewsletterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchAndNewsletter = ({ searchTerm, onSearchChange }: SearchAndNewsletterProps) => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address"
      });
      return;
    }

    setSubscribing(true);

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email: email.trim() }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            variant: "destructive",
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter!"
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to subscribe. Please try again."
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Search Section */}
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-foreground">Search Articles</h2>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search articles by title..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Never Miss an Article</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of readers who get fresh insights delivered to their inbox every day.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={subscribing}>
              {subscribing ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchAndNewsletter;