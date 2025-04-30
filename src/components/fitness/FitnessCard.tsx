
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FitnessContent } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FitnessCardProps {
  content: FitnessContent;
}

const FitnessCard: React.FC<FitnessCardProps> = ({ content }) => {
  const navigate = useNavigate();
  
  const handleViewContent = () => {
    navigate(`/fitness/content/${content.id}`);
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="h-40 overflow-hidden relative">
        <img 
          src={content.thumbnail} 
          alt={content.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white font-medium">
              {content.duration} min
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getIntensityColor(content.intensity)}`}>
              {content.intensity.charAt(0).toUpperCase() + content.intensity.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-thrive-purple">
            {content.category}
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">
          {content.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {content.description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 px-4 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleViewContent}
        >
          Start Exercise
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FitnessCard;
