
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getJournalEntries } from '@/utils/api';
import { JournalEntry } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const moodEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  anxious: '😰',
  calm: '😌',
  angry: '😠',
  neutral: '😐'
};

const DisplayJournal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntry = async () => {
      if (!currentUser || !id) return;
      
      setLoading(true);
      try {
        const entries = await getJournalEntries(currentUser.id);
        const foundEntry = entries.find(e => e.id === id);
        
        if (foundEntry) {
          setEntry(foundEntry);
        } else {
          toast({
            title: 'Error',
            description: 'Journal entry not found',
            variant: 'destructive'
          });
          navigate('/journal');
        }
      } catch (error) {
        console.error('Error loading journal entry:', error);
        toast({
          title: 'Error',
          description: 'Failed to load journal entry',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadEntry();
  }, [currentUser, id, navigate, toast]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <AppLayout title="Journal Entry" showBack>
        <div className="flex flex-col items-center justify-center p-6 h-full">
          <div className="w-12 h-12 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading journal entry...</p>
        </div>
      </AppLayout>
    );
  }

  if (!entry) {
    return (
      <AppLayout title="Journal Entry" showBack>
        <div className="text-center py-12">
          <p className="text-gray-500">Entry not found</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Journal Entry" showBack>
      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{entry.title}</h1>
              <div className="text-3xl">{moodEmojis[entry.mood] || '😐'}</div>
            </div>
            
            <div className="text-sm text-gray-500 mb-6">
              {formatDate(entry.createdAt)}
            </div>
            
            <div className="prose max-w-none">
              {entry.content.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate(`/journal/edit/${entry.id}`)}
          >
            Edit
          </Button>
          
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={() => {
              // Mock delete functionality
              toast({
                title: 'Journal Entry Deleted',
                description: 'Your journal entry has been deleted.'
              });
              navigate('/journal');
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default DisplayJournal;
