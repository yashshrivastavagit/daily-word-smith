import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BlogHeader from '@/components/BlogHeader';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_number: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields."
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        contact_number: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Daily Blog</title>
        <meta name="description" content="Get in touch with Daily Blog via our contact form. We'd love to hear from you!" />
        <meta name="keywords" content="contact, get in touch, daily blog, contact form" />
        <meta property="og:title" content="Contact Us - Daily Blog" />
        <meta property="og:description" content="Get in touch with Daily Blog via our contact form." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <BlogHeader />
        
        <main className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <header className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">Get in Touch</h1>
                <p className="text-xl text-muted-foreground">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </header>

              {/* Contact Form */}
              <Card className="shadow-[var(--blog-shadow)]">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Form</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={errors.name ? "border-destructive" : ""}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={errors.email ? "border-destructive" : ""}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact_number" className="text-sm font-medium">
                        Contact Number
                      </Label>
                      <Input
                        id="contact_number"
                        name="contact_number"
                        type="tel"
                        value={formData.contact_number}
                        onChange={handleChange}
                        placeholder="Your phone number (optional)"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us what you'd like to discuss..."
                        rows={5}
                        className={errors.message ? "border-destructive" : ""}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Contact Info */}
              <div className="mt-12 text-center">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Other Ways to Reach Us</h2>
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-border">
                  <p className="text-muted-foreground mb-2">
                    For urgent matters or direct inquiries, you can also reach us at:
                  </p>
                  <p className="text-lg font-medium text-foreground">
                    yashshrivastava2701@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
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

export default Contact;