
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(blog.publishedDate));
  
  const handleReadBlog = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="h-40 overflow-hidden">
        <img 
          src={blog.coverImage} 
          alt={blog.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs text-thrive-purple font-medium">
            {formattedDate} • {blog.readTime} min read
          </div>
        </div>
        
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">
          {blog.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">
          {blog.summary}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {blog.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="text-xs bg-thrive-soft-purple px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          By {blog.author}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 px-4 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleReadBlog}
        >
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
