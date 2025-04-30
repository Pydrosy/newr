
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FitnessCard from '@/components/fitness/FitnessCard';
import { getFitnessContent } from '@/utils/api';
import { FitnessContent } from '@/types';

const FitnessScreen: React.FC = () => {
  const navigate = useNavigate();
  const [fitnessContent, setFitnessContent] = useState<FitnessContent[]>([]);
  const [loading, setLoading] = useState(true);
  
  const categories = [
    {
      name: 'Yoga',
      icon: '🧘‍♀️',
      color: 'bg-thrive-soft-purple'
    },
    {
      name: 'Meditation',
      icon: '🧠',
      color: 'bg-thrive-soft-blue'
    },
    {
      name: 'Cardio',
      icon: '🏃‍♂️',
      color: 'bg-thrive-soft-orange'
    },
    {
      name: 'Strength',
      icon: '💪',
      color: 'bg-thrive-soft-green'
    }
  ];
  
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const content = await getFitnessContent();
        setFitnessContent(content);
      } catch (error) {
        console.error('Error loading fitness content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, []);
  
  const navigateToCategory = (category: string) => {
    navigate(`/fitness/category/${category.toLowerCase()}`);
  };

  return (
    <AppLayout title="Fitness & Wellness">
      <div className="p-4 space-y-6">
        {/* Categories */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <div className="grid grid-cols-4 gap-2">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => navigateToCategory(category.name)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg ${category.color}`}
              >
                <span className="text-2xl mb-1">{category.icon}</span>
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured Workout */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Today's Pick</h2>
          <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3"
                alt="Featured Workout" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-bold">Stress-Relief Yoga</h3>
                <p className="text-sm opacity-90">20 min • Beginner</p>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                A gentle yoga sequence designed to release tension and calm the mind.
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate('/fitness/content/fitness-1')}
              >
                Start Workout
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Workouts */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Recent Workouts</h2>
            <button 
              className="text-sm text-thrive-purple"
              onClick={() => navigate('/fitness/history')}
            >
              View All
            </button>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-10 h-10 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-gray-500">Loading workouts...</p>
            </div>
          ) : fitnessContent.length > 0 ? (
            <div className="space-y-3">
              {fitnessContent.slice(0, 2).map(content => (
                <FitnessCard key={content.id} content={content} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No recent workouts</p>
            </div>
          )}
        </div>
        
        {/* Recommended For You */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Recommended For You</h2>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-md bg-thrive-soft-blue flex items-center justify-center text-2xl">
                  🧠
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Mindful Movement Meditation</h3>
                  <p className="text-xs text-gray-500">10 min • Low intensity</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/fitness/content/fitness-3')}
                >
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Wellness Tips */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Wellness Tips</h2>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Breathing Technique: 4-7-8</h3>
              <p className="text-sm text-gray-600 mb-3">
                This breathing exercise can help reduce anxiety, help you fall asleep, and re-center yourself during stressful moments.
              </p>
              <ol className="text-sm space-y-2 list-decimal pl-5">
                <li>Place the tip of your tongue against the ridge behind your upper front teeth.</li>
                <li>Exhale completely through your mouth, making a whoosh sound.</li>
                <li>Close your mouth and inhale quietly through your nose to a count of 4.</li>
                <li>Hold your breath for a count of 7.</li>
                <li>Exhale completely through your mouth to a count of 8.</li>
                <li>Repeat the cycle 3-4 times.</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default FitnessScreen;
