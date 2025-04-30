
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import MoodTracker from '@/components/journal/MoodTracker';
import { saveJournalEntry } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';

const AddJournal: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<'happy' | 'sad' | 'anxious' | 'calm' | 'angry' | 'neutral'>('neutral');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood as 'happy' | 'sad' | 'anxious' | 'calm' | 'angry' | 'neutral');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to add a journal entry.',
        variant: 'destructive'
      });
      return;
    }
    
    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Please add a title for your journal entry.',
        variant: 'destructive'
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: 'Error',
        description: 'Please write some content for your journal entry.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      const journalEntry = await saveJournalEntry({
        userId: currentUser.id,
        title,
        content,
        mood
      });
      
      toast({
        title: 'Success',
        description: 'Journal entry saved successfully!'
      });
      
      navigate(`/journal/${journalEntry.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save journal entry. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppLayout title="New Journal Entry" showBack>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Selector */}
          <MoodTracker 
            selectedMood={mood}
            onMoodSelect={handleMoodSelect}
          />
          
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title"
              required
            />
          </div>
          
          {/* Content Textarea */}
          <div className="space-y-2">
            <Label htmlFor="content">What's on your mind today?</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              rows={10}
              required
            />
          </div>
          
          {/* Save Button */}
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Entry'}
            </Button>
          </div>
          
          {/* Cancel Button */}
          <Button 
            type="button"
            variant="ghost" 
            className="w-full"
            onClick={() => navigate('/journal')}
          >
            Cancel
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

export default AddJournal;
