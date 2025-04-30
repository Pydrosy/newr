
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getFitnessContentById } from '@/utils/api';
import { FitnessContent as FitnessContentType } from '@/types';
import { useToast } from '@/hooks/use-toast';

const FitnessContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [content, setContent] = useState<FitnessContentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    const loadContent = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const fitnessContent = await getFitnessContentById(id);
        if (fitnessContent) {
          setContent(fitnessContent);
        }
      } catch (error) {
        console.error('Error loading fitness content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [id]);
  
  // Setup timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isStarted && !isCompleted && content) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          
          // Check if the workout is complete
          if (newTime >= content.duration * 60) {
            setIsCompleted(true);
            setIsStarted(false);
            clearInterval(timer);
            
            toast({
              title: "Workout Complete!",
              description: "Great job on completing the workout!",
            });
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [isStarted, isCompleted, content, toast]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getProgress = () => {
    if (!content) return 0;
    return Math.min((currentTime / (content.duration * 60)) * 100, 100);
  };
  
  const handleStart = () => {
    setIsStarted(true);
  };
  
  const handlePause = () => {
    setIsStarted(false);
  };
  
  const handleReset = () => {
    setIsStarted(false);
    setCurrentTime(0);
    setIsCompleted(false);
  };

  if (loading) {
    return (
      <AppLayout showBack>
        <div className="flex flex-col items-center justify-center p-6 h-full">
          <div className="w-12 h-12 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading workout...</p>
        </div>
      </AppLayout>
    );
  }

  if (!content) {
    return (
      <AppLayout showBack>
        <div className="text-center py-12">
          <p className="text-gray-500">Workout not found</p>
          <Button 
            onClick={() => navigate('/fitness')}
            className="mt-4"
          >
            Back to Fitness
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showBack>
      <div>
        {/* Header Image */}
        <div className="relative h-56 bg-gray-200">
          <img 
            src={content.thumbnail} 
            alt={content.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4 text-white">
            <div className="flex items-center">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 mr-2">
                {content.category}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">
                {content.intensity.charAt(0).toUpperCase() + content.intensity.slice(1)}
              </span>
            </div>
            <h1 className="text-2xl font-bold mt-1">{content.title}</h1>
            <p className="text-sm opacity-90">{content.duration} min</p>
          </div>
        </div>
        
        {/* Workout Content */}
        <div className="p-4 space-y-6">
          {/* Description */}
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">About this workout</h2>
              <p className="text-gray-600">{content.description}</p>
            </CardContent>
          </Card>
          
          {/* Timer */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <h2 className="font-semibold mb-4">Timer</h2>
                
                <div className="flex justify-between items-center mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(content.duration * 60)}</span>
                </div>
                
                <Progress value={getProgress()} className="h-2 mb-4" />
                
                <div className="flex gap-2 justify-center">
                  {isStarted ? (
                    <Button 
                      variant="outline" 
                      onClick={handlePause}
                    >
                      Pause
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      onClick={handleStart}
                      disabled={isCompleted}
                    >
                      {isCompleted ? 'Completed' : currentTime > 0 ? 'Resume' : 'Start'}
                    </Button>
                  )}
                  
                  {(currentTime > 0 || isCompleted) && (
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Steps */}
          {content.steps && content.steps.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-3">Steps</h2>
                <ol className="space-y-2 list-decimal pl-5">
                  {content.steps.map((step, index) => (
                    <li key={index} className="text-gray-600">{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          )}
          
          {/* Video */}
          {content.videoUrl && (
            <Card>
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2">Video Guide</h2>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md flex items-center justify-center">
                  {/* In a real app, this would be a video player */}
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    <p className="text-sm text-gray-500 mt-2">Video preview not available in demo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Related Workouts */}
          <div>
            <h2 className="font-semibold mb-3">You might also like</h2>
            <div className="flex overflow-x-auto space-x-3 pb-2">
              <div className="w-56 flex-shrink-0 rounded-lg overflow-hidden border">
                <div className="h-32">
                  <img 
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
                    alt="Related Workout" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium">Mood-Boosting HIIT</h3>
                  <p className="text-xs text-gray-500">15 min • High intensity</p>
                </div>
              </div>
              
              <div className="w-56 flex-shrink-0 rounded-lg overflow-hidden border">
                <div className="h-32">
                  <img 
                    src="https://images.unsplash.com/photo-1474418397713-003ec9f713a6"
                    alt="Related Workout" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium">Mindful Movement</h3>
                  <p className="text-xs text-gray-500">10 min • Low intensity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default FitnessContent;
