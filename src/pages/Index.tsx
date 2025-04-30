
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Redirect to the appropriate page if user is logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.userType === 'therapist') {
        navigate('/therapist-home');
      } else {
        navigate('/home');
      }
    }
  }, [currentUser, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-thrive-purple to-thrive-dark-purple text-white p-6">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-5xl font-bold mb-6">THRIVE</h1>
        
        <p className="text-xl mb-8">
          Your mental wellness companion powered by GNN technology for personalized therapist matching.
        </p>
        
        <div className="flex flex-col space-y-4 w-full">
          <Button 
            onClick={() => navigate('/login')}
            size="lg" 
            variant="secondary"
            className="w-full"
          >
            Log In
          </Button>
          
          <Button 
            onClick={() => navigate('/signup')}
            size="lg" 
            variant="outline"
            className="w-full border-white text-white hover:bg-white/20"
          >
            Sign Up
          </Button>
        </div>
        
        <p className="mt-8 text-sm opacity-80">
          Join thousands of users who have found their perfect therapist match.
        </p>
      </div>
      
      <div className="mt-12">
        <div className="flex space-x-1 items-center">
          <span className="text-sm">Powered by</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12V7H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16v-5"/>
            <path d="M16 12h-6"/>
            <path d="M16 5V3"/>
            <path d="M10 5V3"/>
            <line x1="21" y1="12" x2="11" y2="12"/>
            <line x1="21" y1="19" x2="11" y2="19"/>
            <line x1="21" y1="12" x2="21" y2="19"/>
            <path d="M15.54 8.46a5 5 0 1 0 0 7.07"/>
          </svg>
          <span className="font-medium">GNN Technology</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
