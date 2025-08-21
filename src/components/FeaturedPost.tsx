import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedPostProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const FeaturedPost = ({ title, excerpt, date, readTime, category, slug }: FeaturedPostProps) => {
  return (
    <article className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-border shadow-[var(--blog-shadow)] transition-all duration-300 hover:shadow-[var(--blog-hover-shadow)]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Badge className="bg-accent text-accent-foreground">
            Featured
          </Badge>
          <Badge variant="secondary">
            {category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {date} · {readTime}
          </span>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-foreground">
            {title}
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        </div>
        
        <Button className="group">
          Read Full Article
          <svg 
            className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </article>
  );
};

export default FeaturedPost;