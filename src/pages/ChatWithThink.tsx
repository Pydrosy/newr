
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import ChatWindow from '@/components/chat/ChatWindow';
import { getTherapistById } from '@/utils/api';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import Avatar from '@/components/common/Avatar';
import { Video } from 'lucide-react';

const ChatWithThink: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [recipient, setRecipient] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadRecipient = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const therapist = await getTherapistById(id);
        if (therapist) {
          setRecipient(therapist);
        }
      } catch (error) {
        console.error('Error loading therapist:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipient();
  }, [id]);
  
  const startVideoCall = () => {
    if (recipient) {
      navigate(`/video-call/${recipient.id}`);
    }
  };
  
  if (loading) {
    return (
      <AppLayout showHeader={false} showFooter={false}>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-thrive-purple border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-500">Loading chat...</p>
        </div>
      </AppLayout>
    );
  }
  
  if (!recipient) {
    return (
      <AppLayout showBack>
        <div className="text-center py-12">
          <p className="text-gray-500">Chat partner not found</p>
          <Button 
            onClick={() => navigate('/home')}
            className="mt-4"
          >
            Go Home
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showHeader={false} showFooter={false}>
      <div className="flex flex-col h-screen">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="h-8 w-8"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Button>
            
            <div className="flex items-center gap-2">
              <Avatar 
                src={recipient.profileImage}
                name={recipient.name}
                size="sm"
              />
              <div>
                <div className="font-medium">{recipient.name}</div>
                <div className="text-xs text-green-500">Online</div>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={startVideoCall}
            className="h-8 w-8"
          >
            <Video size={20} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <ChatWindow 
            recipientId={recipient.id}
            recipient={recipient}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatWithThink;
