
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { getBlogPostById } from '@/utils/api';
import { BlogPost } from '@/types';

const OpenBlogScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadBlog = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const blogPost = await getBlogPostById(id);
        if (blogPost) {
          setBlog(blogPost);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlog();
  }, [id]);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <AppLayout showBack>
        <div className="flex flex-col items-center justify-center p-6 h-full">
          <div className="w-12 h-12 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading article...</p>
        </div>
      </AppLayout>
    );
  }

  if (!blog) {
    return (
      <AppLayout showBack>
        <div className="text-center py-12">
          <p className="text-gray-500">Article not found</p>
          <Button 
            onClick={() => navigate('/blog')}
            className="mt-4"
          >
            Back to Articles
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showBack>
      <div className="pb-6">
        {/* Cover Image */}
        <div className="h-56 bg-gray-200">
          <img 
            src={blog.coverImage} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Article Content */}
        <div className="px-4 pt-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-thrive-soft-purple px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-2xl font-bold mb-1">{blog.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>By {blog.author}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(blog.publishedDate)}</span>
            <span className="mx-2">•</span>
            <span>{blog.readTime} min read</span>
          </div>
          
          <div className="prose max-w-none">
            {/* In a real app, this would be properly formatted HTML or Markdown */}
            <p className="mb-4">
              {blog.content.substring(0, 250)}...
            </p>
            
            <p className="mb-4">
              Mental health is a crucial aspect of our overall wellbeing, yet it's often overlooked in our daily lives. Taking time to understand and care for our mental health can lead to significant improvements in our quality of life, relationships, and even physical health.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">The Mind-Body Connection</h2>
            
            <p className="mb-4">
              Research consistently shows that our mental and physical health are deeply interconnected. When we experience stress, anxiety, or depression, our bodies respond with physical symptoms like headaches, muscle tension, and digestive issues. Similarly, physical health problems can trigger or worsen mental health challenges.
            </p>
            
            <p className="mb-4">
              By recognizing this connection, we can adopt holistic approaches to wellness that address both our mental and physical needs.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Practical Strategies for Mental Wellness</h2>
            
            <p className="mb-4">
              Here are some evidence-based strategies for maintaining and improving mental health:
            </p>
            
            <ul className="list-disc pl-5 mb-4">
              <li className="mb-2">
                <strong>Practice mindfulness meditation:</strong> Even just 5-10 minutes daily can reduce stress and improve focus.
              </li>
              <li className="mb-2">
                <strong>Maintain social connections:</strong> Regular meaningful interactions with others are vital for emotional wellbeing.
              </li>
              <li className="mb-2">
                <strong>Prioritize sleep:</strong> Adequate, quality sleep is essential for cognitive function and emotional regulation.
              </li>
              <li className="mb-2">
                <strong>Move your body:</strong> Regular physical activity releases endorphins and can be as effective as medication for mild to moderate depression.
              </li>
              <li className="mb-2">
                <strong>Journaling:</strong> Recording thoughts and feelings helps process emotions and identify patterns.
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">When to Seek Help</h2>
            
            <p className="mb-4">
              While self-care strategies are valuable, professional help is sometimes needed. Consider reaching out to a mental health professional if you experience:
            </p>
            
            <ul className="list-disc pl-5 mb-4">
              <li>Persistent feelings of sadness or hopelessness</li>
              <li>Overwhelming anxiety or worry</li>
              <li>Significant changes in sleep or appetite</li>
              <li>Difficulty functioning in daily life</li>
              <li>Thoughts of harming yourself or others</li>
            </ul>
            
            <p className="mb-4">
              Remember that seeking help is a sign of strength, not weakness.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Conclusion</h2>
            
            <p className="mb-4">
              Mental health is an essential component of overall wellness. By incorporating mental health practices into our daily routines and seeking support when needed, we can build resilience and lead more fulfilling lives.
            </p>
          </div>
          
          {/* Share Buttons */}
          <div className="mt-8 pt-4 border-t">
            <h3 className="font-medium mb-2">Share this article</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                Facebook
              </Button>
              <Button variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
                LinkedIn
              </Button>
            </div>
          </div>
          
          {/* Related Articles */}
          <div className="mt-8 pt-4 border-t">
            <h3 className="font-medium mb-4">Related Articles</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
                    alt="Meditation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium line-clamp-2">The Science of Mindfulness Meditation</h4>
                  <p className="text-xs text-gray-500 mt-1">7 min read</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
                    alt="Resilience" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium line-clamp-2">Building Resilience Through Difficult Times</h4>
                  <p className="text-xs text-gray-500 mt-1">6 min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OpenBlogScreen;
