import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const BlogCard = ({ title, excerpt, date, readTime, category, slug }: BlogCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-[var(--blog-hover-shadow)] border-border">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {date} · {readTime}
          </span>
        </div>
        <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {excerpt}
        </p>
      </CardContent>
    </Card>
  );
};

export default BlogCard;