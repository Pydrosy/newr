
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import Avatar from '@/components/common/Avatar';
import { useAuth } from '@/context/AuthContext';
import { getBlogPosts, getTherapists } from '@/utils/api';
import { BlogPost, User } from '@/types';

const StoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [stories, setStories] = useState<BlogPost[]>([]);
  const [therapists, setTherapists] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const [blogsData, therapistsData] = await Promise.all([
          getBlogPosts(),
          getTherapists(),
        ]);
        
        setStories(blogsData);
        setTherapists(therapistsData);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, []);
  
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  return (
    <AppLayout title="Stories">
      <div className="p-4 space-y-6">
        {/* Story Circles */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Stories</h2>
            <button 
              className="text-sm text-thrive-purple"
              onClick={() => navigate('/create-meme')}
            >
              Create New
            </button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {/* Your Story */}
            <div className="flex flex-col items-center space-y-1 min-w-[72px]">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                <button
                  className="w-14 h-14 rounded-full bg-thrive-soft-purple flex items-center justify-center"
                  onClick={() => navigate('/create-meme')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14"/>
                    <path d="M5 12h14"/>
                  </svg>
                </button>
              </div>
              <span className="text-xs">Your Story</span>
            </div>
            
            {/* Therapist Stories */}
            {therapists.slice(0, 4).map(therapist => (
              <button
                key={therapist.id}
                className="flex flex-col items-center space-y-1 min-w-[72px]"
                onClick={() => navigate(`/therapist/${therapist.id}`)}
              >
                <div className="w-16 h-16 rounded-full border-2 border-thrive-purple p-0.5">
                  <Avatar
                    src={therapist.profileImage}
                    name={therapist.name}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-xs truncate w-16 text-center">{therapist.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Posts */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-10 h-10 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-gray-500">Loading stories...</p>
            </div>
          ) : (
            stories.map(story => (
              <Card key={story.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="flex items-center p-4">
                    <Avatar
                      src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`}
                      name={story.author}
                      size="sm"
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{story.author}</div>
                      <div className="text-xs text-gray-500">{formatTimeAgo(story.publishedDate)}</div>
                    </div>
                    <button className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1"/>
                        <circle cx="19" cy="12" r="1"/>
                        <circle cx="5" cy="12" r="1"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Post Image */}
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover"
                      onClick={() => navigate(`/blog/${story.id}`)}
                    />
                  </div>
                  
                  {/* Post Actions */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex space-x-4">
                      <button className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="text-sm">{Math.floor(Math.random() * 100) + 1}</span>
                      </button>
                      <button className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span className="text-sm">{Math.floor(Math.random() * 20) + 1}</span>
                      </button>
                    </div>
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Post Caption */}
                  <div className="px-4 pb-4">
                    <p className="text-sm line-clamp-2">
                      <span className="font-medium">{story.author}</span> {story.summary}
                    </p>
                    <button 
                      className="text-xs text-gray-500 mt-1"
                      onClick={() => navigate(`/blog/${story.id}`)}
                    >
                      View article
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default StoryScreen;
