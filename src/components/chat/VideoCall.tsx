
import React, { useState, useEffect } from 'react';
import { User } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Video, VideoOff, Mic, MicOff } from 'lucide-react';

interface VideoCallProps {
  recipient: User;
  onEndCall?: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ recipient, onEndCall }) => {
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  
  // Mock video call - in a real app, this would use WebRTC or a video call service
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleEndCall = () => {
    if (onEndCall) {
      onEndCall();
    } else {
      navigate(-1);
    }
  };
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };
  
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex-1 relative">
        {/* Main video (recipient) */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isVideoOn ? (
            <img
              src={recipient.profileImage || 'https://randomuser.me/api/portraits/women/44.jpg'}
              alt={recipient.name}
              className="w-full h-full object-cover opacity-30"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">👤</div>
                <div className="font-medium">{recipient.name}</div>
                <div className="text-sm text-gray-400">Video Off</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Self view */}
        <div className="absolute bottom-4 right-4 w-28 h-40 rounded-lg overflow-hidden border-2 border-white shadow-lg">
          <div className={`w-full h-full ${isVideoOn ? 'bg-gray-700' : 'bg-gray-800'} flex items-center justify-center`}>
            {isVideoOn ? (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white">
                <div>You</div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <VideoOff size={24} />
              </div>
            )}
          </div>
        </div>
        
        {/* Call timer */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {formatDuration(callDuration)}
        </div>
      </div>
      
      {/* Call controls */}
      <div className="bg-black p-4">
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-full h-12 w-12 ${isAudioOn ? 'bg-gray-700' : 'bg-red-500'}`}
            onClick={toggleAudio}
          >
            {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
          </Button>
          
          <Button 
            variant="destructive" 
            size="icon" 
            className="rounded-full h-12 w-12"
            onClick={handleEndCall}
          >
            <Phone size={20} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className={`rounded-full h-12 w-12 ${isVideoOn ? 'bg-gray-700' : 'bg-red-500'}`}
            onClick={toggleVideo}
          >
            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
