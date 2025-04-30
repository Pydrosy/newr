
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import Avatar from './Avatar';
import { Button } from '@/components/ui/button';

interface TherapistCardProps {
  therapist: User;
  matchScore?: number;
  matchReason?: string;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ 
  therapist, 
  matchScore,
  matchReason
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/therapist/${therapist.id}`);
  };

  const handleStartChat = () => {
    navigate(`/chat/${therapist.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar 
            src={therapist.profileImage} 
            name={therapist.name} 
            size="lg"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{therapist.name}</h3>
            
            {therapist.specializations && (
              <div className="flex flex-wrap gap-1 mt-1">
                {therapist.specializations.slice(0, 3).map(specialization => (
                  <span 
                    key={specialization} 
                    className="text-xs bg-thrive-soft-purple px-2 py-0.5 rounded-full"
                  >
                    {specialization}
                  </span>
                ))}
              </div>
            )}
            
            {therapist.rating && (
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(therapist.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs font-medium text-gray-600">
                  {therapist.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {matchScore && (
          <div className="mb-3 bg-thrive-soft-purple p-2 rounded-md">
            <div className="flex items-center mb-1">
              <span className="text-sm font-medium">Match Score:</span>
              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded">
                <div 
                  className="h-full bg-thrive-purple rounded" 
                  style={{ width: `${matchScore * 100}%` }} 
                />
              </div>
              <span className="text-sm font-medium">
                {Math.round(matchScore * 100)}%
              </span>
            </div>
            {matchReason && (
              <p className="text-xs text-gray-600">{matchReason}</p>
            )}
          </div>
        )}
        
        {therapist.bio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {therapist.bio}
          </p>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={handleStartChat}
          >
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TherapistCard;
