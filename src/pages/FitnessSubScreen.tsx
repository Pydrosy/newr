
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import FitnessCard from '@/components/fitness/FitnessCard';
import { getFitnessContentByCategory } from '@/utils/api';
import { FitnessContent } from '@/types';
import { Input } from '@/components/ui/input';

const FitnessSubScreen: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<FitnessContent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadContent = async () => {
      if (!category) return;
      
      setLoading(true);
      try {
        const contentItems = await getFitnessContentByCategory(category);
        setContent(contentItems);
      } catch (error) {
        console.error('Error loading fitness content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [category]);
  
  const filteredContent = searchQuery
    ? content.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : content;
  
  // Get emoji for the category
  const getCategoryEmoji = () => {
    switch (category?.toLowerCase()) {
      case 'yoga':
        return '🧘‍♀️';
      case 'meditation':
        return '🧠';
      case 'cardio':
        return '🏃‍♂️';
      case 'strength':
        return '💪';
      default:
        return '🧘‍♀️';
    }
  };

  return (
    <AppLayout title={category || 'Fitness'} showBack>
      <div className="p-4 space-y-6">
        {/* Category Header */}
        <div className="text-center">
          <div className="text-4xl mb-2">{getCategoryEmoji()}</div>
          <h1 className="text-2xl font-bold">{category}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {content.length} {content.length === 1 ? 'workout' : 'workouts'} available
          </p>
        </div>
        
        {/* Search Input */}
        <div>
          <Input
            type="text"
            placeholder={`Search ${category} workouts...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        {/* Content List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Loading workouts...</p>
          </div>
        ) : filteredContent.length > 0 ? (
          <div className="space-y-4">
            {filteredContent.map(item => (
              <FitnessCard key={item.id} content={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery
                ? 'No workouts found matching your search'
                : `No ${category} workouts found`}
            </p>
          </div>
        )}
        
        {/* Fallback Content */}
        {content.length === 0 && !loading && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Try These Instead</h2>
            <div className="space-y-4">
              <FitnessCard 
                content={{
                  id: 'fitness-1',
                  title: 'Stress-Relief Yoga',
                  description: 'A gentle yoga sequence designed to release tension and calm the mind.',
                  category: 'Yoga',
                  duration: 20,
                  intensity: 'low',
                  thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3',
                  steps: [
                    'Start in a comfortable seated position',
                    'Focus on deep breathing for 1 minute',
                    'Move into gentle neck stretches'
                  ]
                }}
              />
              <FitnessCard 
                content={{
                  id: 'fitness-3',
                  title: 'Mindful Movement Meditation',
                  description: 'Combine gentle movement with mindfulness for stress reduction.',
                  category: 'Meditation',
                  duration: 10,
                  intensity: 'low',
                  thumbnail: 'https://images.unsplash.com/photo-1474418397713-003ec9f713a6',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default FitnessSubScreen;
