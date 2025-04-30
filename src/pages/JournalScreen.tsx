
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { getJournalEntries } from '@/utils/api';
import { JournalEntry as JournalEntryType } from '@/types';
import JournalEntry from '@/components/journal/JournalEntry';

const JournalScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadEntries = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      try {
        const journalEntries = await getJournalEntries(currentUser.id);
        setEntries(journalEntries);
      } catch (error) {
        console.error('Error loading journal entries:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEntries();
  }, [currentUser]);
  
  const navigateToAddEntry = () => {
    navigate('/journal/add');
  };
  
  const getMoodCount = (mood: string) => {
    return entries.filter(entry => entry.mood === mood).length;
  };
  
  const getMostCommonMood = () => {
    const moodCounts = [
      { mood: 'happy', count: getMoodCount('happy') },
      { mood: 'sad', count: getMoodCount('sad') },
      { mood: 'anxious', count: getMoodCount('anxious') },
      { mood: 'calm', count: getMoodCount('calm') },
      { mood: 'angry', count: getMoodCount('angry') },
      { mood: 'neutral', count: getMoodCount('neutral') }
    ];
    
    return moodCounts.sort((a, b) => b.count - a.count)[0]?.mood || 'neutral';
  };
  
  const groupEntriesByMonth = () => {
    const grouped: Record<string, JournalEntryType[]> = {};
    
    entries.forEach(entry => {
      const date = new Date(entry.createdAt);
      const monthYear = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric'
      }).format(date);
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(entry);
    });
    
    // Sort entries within each month by date (newest first)
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
    
    return grouped;
  };
  
  const groupedEntries = groupEntriesByMonth();
  const monthGroups = Object.keys(groupedEntries).sort((a, b) => {
    // Sort months in reverse chronological order
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <AppLayout title="Journal">
      <div className="p-4 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Loading your journal...</p>
          </div>
        ) : (
          <>
            {/* Summary Card */}
            <Card className="bg-thrive-soft-purple">
              <CardContent className="p-4">
                <h3 className="font-semibold">Journal Summary</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total entries:</span>
                    <span className="font-medium">{entries.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most common mood:</span>
                    <span className="font-medium capitalize">{getMostCommonMood()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Streak:</span>
                    <span className="font-medium">3 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Add Entry Button */}
            <div>
              <Button 
                onClick={navigateToAddEntry} 
                className="w-full"
              >
                Add New Journal Entry
              </Button>
            </div>
            
            {/* Journal Entries */}
            <div className="space-y-6">
              {entries.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No journal entries yet</p>
                  <Button 
                    variant="outline" 
                    onClick={navigateToAddEntry}
                  >
                    Create Your First Entry
                  </Button>
                </div>
              ) : (
                monthGroups.map(month => (
                  <div key={month}>
                    <h3 className="font-semibold mb-3">{month}</h3>
                    <div className="space-y-3">
                      {groupedEntries[month].map(entry => (
                        <JournalEntry key={entry.id} entry={entry} />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default JournalScreen;
