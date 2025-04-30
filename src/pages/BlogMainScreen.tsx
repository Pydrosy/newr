
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import BlogCard from '@/components/blog/BlogCard';
import { getBlogPosts } from '@/utils/api';
import { BlogPost } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BlogMainScreen: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const blogPosts = await getBlogPosts();
        setBlogs(blogPosts);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogs();
  }, []);
  
  const filterBlogs = (category: string = 'all') => {
    let filtered = [...blogs];
    
    // Filter by search query if provided
    if (searchQuery) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category if not "all"
    if (category !== 'all') {
      filtered = filtered.filter(blog => 
        blog.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  // Get all unique categories/tags
  const allTags = Array.from(
    new Set(blogs.flatMap(blog => blog.tags.map(tag => tag.toLowerCase())))
  );

  return (
    <AppLayout title="Wellness Articles">
      <div className="p-4 space-y-6">
        {/* Search Input */}
        <div>
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Loading articles...</p>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="w-full mb-4 overflow-x-auto flex whitespace-nowrap pb-1">
              <TabsTrigger value="all" className="flex-shrink-0">All</TabsTrigger>
              <TabsTrigger value="mental health" className="flex-shrink-0">Mental Health</TabsTrigger>
              <TabsTrigger value="mindfulness" className="flex-shrink-0">Mindfulness</TabsTrigger>
              <TabsTrigger value="self-care" className="flex-shrink-0">Self-Care</TabsTrigger>
              <TabsTrigger value="resilience" className="flex-shrink-0">Resilience</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filterBlogs('all').length > 0 ? (
                filterBlogs('all').map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No articles found</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="mental health" className="space-y-4">
              {filterBlogs('mental health').length > 0 ? (
                filterBlogs('mental health').map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No articles in this category</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="mindfulness" className="space-y-4">
              {filterBlogs('mindfulness').length > 0 ? (
                filterBlogs('mindfulness').map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No articles in this category</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="self-care" className="space-y-4">
              {filterBlogs('self-care').length > 0 ? (
                filterBlogs('self-care').map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No articles in this category</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="resilience" className="space-y-4">
              {filterBlogs('resilience').length > 0 ? (
                filterBlogs('resilience').map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No articles in this category</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AppLayout>
  );
};

export default BlogMainScreen;
