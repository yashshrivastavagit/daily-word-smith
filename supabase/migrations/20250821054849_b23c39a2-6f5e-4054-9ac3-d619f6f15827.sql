-- Create articles table for blog posts
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug TEXT UNIQUE NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category TEXT,
  read_time TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscriptions table for newsletter
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  active BOOLEAN DEFAULT true
);

-- Create contact_messages table for contact form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_number TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for articles (public read, authenticated write)
CREATE POLICY "Articles are viewable by everyone" 
ON public.articles 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create articles" 
ON public.articles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own articles" 
ON public.articles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own articles" 
ON public.articles 
FOR DELETE 
TO authenticated
USING (auth.uid() = author_id);

-- RLS Policies for subscriptions (public insert)
CREATE POLICY "Anyone can subscribe" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Subscriptions are viewable by authenticated users" 
ON public.subscriptions 
FOR SELECT 
TO authenticated
USING (true);

-- RLS Policies for contact messages (public insert, authenticated read)
CREATE POLICY "Anyone can submit contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Contact messages are viewable by authenticated users" 
ON public.contact_messages 
FOR SELECT 
TO authenticated
USING (true);

-- Create function to auto-update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on articles
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Generate excerpts from content (first 100 characters)
CREATE OR REPLACE FUNCTION public.generate_excerpt()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.excerpt IS NULL OR NEW.excerpt = '' THEN
    NEW.excerpt = LEFT(NEW.content, 100) || '...';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate excerpts
CREATE TRIGGER generate_article_excerpt
  BEFORE INSERT OR UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_excerpt();