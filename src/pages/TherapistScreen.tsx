
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TherapistCard from '@/components/common/TherapistCard';
import { Input } from '@/components/ui/input';
import { getTherapists, getRecommendedTherapists } from '@/utils/api';
import { User, TherapistMatch } from '@/types';
import { useAuth } from '@/context/AuthContext';

const TherapistScreen: React.FC = () => {
  const { currentUser } = useAuth();
  const [therapists, setTherapists] = useState<User[]>([]);
  const [therapistMatches, setTherapistMatches] = useState<Record<string, TherapistMatch>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTherapists = async () => {
      setLoading(true);
      
      try {
        const [allTherapists, recommendedMatches] = await Promise.all([
          getTherapists(),
          currentUser ? getRecommendedTherapists(currentUser.id) : Promise.resolve([])
        ]);
        
        setTherapists(allTherapists);
        
        // Convert matches array to a map for easy lookup
        const matchesMap: Record<string, TherapistMatch> = {};
        recommendedMatches.forEach(match => {
          matchesMap[match.therapistId] = match;
        });
        setTherapistMatches(matchesMap);
        
      } catch (error) {
        console.error('Error loading therapists:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTherapists();
  }, [currentUser]);

  const filteredTherapists = searchQuery
    ? therapists.filter(therapist =>
        therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        therapist.specializations?.some(spec => 
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : therapists;
  
  // Sort therapists by match score if available
  const sortedTherapists = [...filteredTherapists].sort((a, b) => {
    const matchA = therapistMatches[a.id]?.matchScore || 0;
    const matchB = therapistMatches[b.id]?.matchScore || 0;
    return matchB - matchA;
  });

  return (
    <AppLayout title="Find a Therapist" showBack>
      <div className="p-4 space-y-4">
        {/* Search Input */}
        <div>
          <Input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        {/* Therapist List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Finding therapists for you...</p>
          </div>
        ) : sortedTherapists.length > 0 ? (
          <div className="space-y-4">
            {sortedTherapists.map(therapist => (
              <TherapistCard 
                key={therapist.id}
                therapist={therapist}
                matchScore={therapistMatches[therapist.id]?.matchScore}
                matchReason={therapistMatches[therapist.id]?.matchReason}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No therapists found matching your criteria</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default TherapistScreen;
