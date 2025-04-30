
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { JournalEntry as JournalEntryType } from '@/types';
import { Button } from '@/components/ui/button';

const moodEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  anxious: '😰',
  calm: '😌',
  angry: '😠',
  neutral: '😐'
};

interface JournalEntryProps {
  entry: JournalEntryType;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry }) => {
  const navigate = useNavigate();
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(entry.createdAt));
  
  const handleViewEntry = () => {
    navigate(`/journal/${entry.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{entry.title}</h3>
          <div className="text-xl" aria-label={`Mood: ${entry.mood}`}>
            {moodEmojis[entry.mood] || '😐'}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">
          {entry.content}
        </p>
        
        <div className="text-xs text-gray-400">
          {formattedDate}
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={handleViewEntry}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalEntry;
