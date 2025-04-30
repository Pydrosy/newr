
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const moods = [
  { name: 'happy', emoji: '😊', label: 'Happy' },
  { name: 'calm', emoji: '😌', label: 'Calm' },
  { name: 'neutral', emoji: '😐', label: 'Neutral' },
  { name: 'sad', emoji: '😢', label: 'Sad' },
  { name: 'anxious', emoji: '😰', label: 'Anxious' },
  { name: 'angry', emoji: '😠', label: 'Angry' }
];

interface MoodTrackerProps {
  selectedMood?: string;
  onMoodSelect: (mood: string) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ 
  selectedMood,
  onMoodSelect
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-sm font-medium mb-3">How are you feeling today?</div>
        <div className="grid grid-cols-3 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => onMoodSelect(mood.name)}
              className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                selectedMood === mood.name
                  ? 'bg-thrive-purple text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs mt-1">{mood.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
