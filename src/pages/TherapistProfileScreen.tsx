
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTherapistById } from '@/utils/api';
import { User } from '@/types';

const TherapistProfileScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTherapist = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const therapistData = await getTherapistById(id);
        if (therapistData) {
          setTherapist(therapistData);
        }
      } catch (error) {
        console.error('Error loading therapist:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTherapist();
  }, [id]);

  const handleStartChat = () => {
    if (therapist) {
      navigate(`/chat/${therapist.id}`);
    }
  };

  const handleStartVideoCall = () => {
    if (therapist) {
      navigate(`/video-call/${therapist.id}`);
    }
  };

  if (loading) {
    return (
      <AppLayout title="Therapist Profile" showBack>
        <div className="flex flex-col items-center justify-center p-6 h-full">
          <div className="w-12 h-12 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading therapist profile...</p>
        </div>
      </AppLayout>
    );
  }

  if (!therapist) {
    return (
      <AppLayout title="Therapist Profile" showBack>
        <div className="text-center py-12">
          <p className="text-gray-500">Therapist not found</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/therapist')}
            className="mt-4"
          >
            Back to Therapists
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Therapist Profile" showBack>
      <div>
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-thrive-purple to-thrive-dark-purple text-white p-6 flex flex-col items-center">
          <Avatar
            src={therapist.profileImage}
            name={therapist.name}
            size="lg"
            className="h-24 w-24 mb-4 border-4 border-white"
          />
          <h1 className="text-2xl font-bold">{therapist.name}</h1>
          
          {therapist.specializations && (
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {therapist.specializations.map(spec => (
                <span 
                  key={spec} 
                  className="text-xs bg-white/20 px-3 py-1 rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
          
          {therapist.rating !== undefined && (
            <div className="flex items-center mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(therapist.rating as number)
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
              <span className="ml-2 text-sm font-medium">
                {therapist.rating.toFixed(1)} • 48 reviews
              </span>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 p-4">
          <Button 
            className="flex-1" 
            variant="default"
            onClick={handleStartChat}
          >
            Message
          </Button>
          <Button 
            className="flex-1" 
            variant="outline"
            onClick={handleStartVideoCall}
          >
            Video Call
          </Button>
        </div>
        
        {/* Content Tabs */}
        <div className="px-4 pb-6">
          <Tabs defaultValue="about">
            <TabsList className="w-full">
              <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
              <TabsTrigger value="expertise" className="flex-1">Expertise</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="pt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Biography</h3>
                  <p className="text-gray-600">
                    {therapist.bio || "No biography information available."}
                  </p>
                  
                  <h3 className="font-semibold text-lg mt-6 mb-2">Education & Training</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-1 bg-thrive-purple rounded" />
                      <div>
                        <div className="font-medium">Ph.D. in Clinical Psychology</div>
                        <div className="text-sm text-gray-500">Stanford University, 2015</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-1 bg-thrive-purple rounded" />
                      <div>
                        <div className="font-medium">Licensed Psychologist</div>
                        <div className="text-sm text-gray-500">State of California, 2016</div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 w-1 bg-thrive-purple rounded" />
                      <div>
                        <div className="font-medium">Certified in Cognitive Behavioral Therapy</div>
                        <div className="text-sm text-gray-500">Beck Institute, 2017</div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="expertise" className="pt-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {therapist.specializations?.map(spec => (
                      <span 
                        key={spec} 
                        className="text-sm bg-thrive-soft-purple px-3 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    )) || "No specializations listed."}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-3">Treatment Approaches</h3>
                  <ul className="space-y-2 list-disc pl-5 text-gray-600">
                    <li>Cognitive Behavioral Therapy (CBT)</li>
                    <li>Mindfulness-Based Cognitive Therapy</li>
                    <li>Acceptance and Commitment Therapy</li>
                    <li>Solution-Focused Brief Therapy</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Client Reviews</h3>
                      <div className="text-sm text-gray-500">48 verified reviews</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-xl font-bold mr-2">
                        {therapist.rating?.toFixed(1) || '4.8'}
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Sample Review 1 */}
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Anonymous Client</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="h-4 w-4 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">March 15, 2023</div>
                    <p className="text-gray-600">
                      Dr. Johnson has been incredibly helpful in my journey to manage anxiety. Her approach is both professional and compassionate. I highly recommend her.
                    </p>
                  </div>
                  
                  {/* Sample Review 2 */}
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">Anonymous Client</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star, i) => (
                          <svg
                            key={star}
                            className={`h-4 w-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">January 8, 2023</div>
                    <p className="text-gray-600">
                      Working with Dr. Johnson has transformed my approach to stress management. The techniques she taught me are practical and effective for daily use.
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    View All Reviews
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default TherapistProfileScreen;
