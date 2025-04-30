
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TherapistCard from '@/components/common/TherapistCard';
import BlogCard from '@/components/blog/BlogCard';
import FitnessCard from '@/components/fitness/FitnessCard';
import { getRecommendedTherapists, getBlogPosts, getFitnessContent } from '@/utils/api';
import { TherapistMatch, BlogPost, FitnessContent, User } from '@/types';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [therapistMatches, setTherapistMatches] = useState<TherapistMatch[]>([]);
  const [therapists, setTherapists] = useState<User[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [fitnessContent, setFitnessContent] = useState<FitnessContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      if (!currentUser) return;

      try {
        // Load recommended therapists
        const matches = await getRecommendedTherapists(currentUser.id);
        setTherapistMatches(matches);
        
        // Load blog posts
        const blogPosts = await getBlogPosts();
        setBlogs(blogPosts.slice(0, 3));
        
        // Load fitness content
        const fitness = await getFitnessContent();
        setFitnessContent(fitness.slice(0, 3));
        
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, [currentUser]);

  if (loading) {
    return (
      <AppLayout title="Home">
        <div className="flex flex-col items-center justify-center p-6 h-full">
          <div className="w-16 h-16 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading your wellness dashboard...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Home">
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <section>
          <Card className="bg-gradient-to-br from-thrive-purple to-thrive-dark-purple text-white">
            <CardContent className="p-6">
              <h1 className="text-xl font-bold mb-2">
                Welcome back, {currentUser?.name?.split(' ')[0]}!
              </h1>
              <p className="mb-4">
                How are you feeling today?
              </p>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/journal/add')}
                className="w-full"
              >
                Record Your Mood
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Therapist Recommendations */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Recommended Therapists</h2>
            <button 
              className="text-sm text-thrive-purple"
              onClick={() => navigate('/therapist')}
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {therapistMatches.slice(0, 1).map(match => (
              <TherapistCard 
                key={match.therapistId}
                therapist={
                  {
                    id: 'therapist-1',
                    name: 'Dr. Sarah Johnson',
                    email: 'sarah.johnson@thrive.com',
                    userType: 'therapist',
                    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
                    bio: 'Licensed psychologist with 10+ years of experience in cognitive behavioral therapy.',
                    specializations: ['Anxiety', 'Depression', 'Trauma'],
                    rating: 4.9
                  }
                }
                matchScore={match.matchScore}
                matchReason={match.matchReason}
              />
            ))}
          </div>
        </section>

        {/* Wellness Resources */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Wellness Articles</h2>
            <button 
              className="text-sm text-thrive-purple"
              onClick={() => navigate('/blog')}
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {blogs.slice(0, 1).map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>

        {/* Fitness Content */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Mindful Movement</h2>
            <button 
              className="text-sm text-thrive-purple"
              onClick={() => navigate('/fitness')}
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {fitnessContent.slice(0, 1).map(content => (
              <FitnessCard key={content.id} content={content} />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default HomeScreen;
