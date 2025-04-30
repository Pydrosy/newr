
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Avatar from '@/components/common/Avatar';
import { useToast } from '@/hooks/use-toast';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };
  
  const handleEditProfile = () => {
    navigate('/profile/edit');
  };
  
  return (
    <AppLayout title="Profile" showBack>
      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center mb-4">
              <Avatar
                src={currentUser?.profileImage}
                name={currentUser?.name || ''}
                size="lg"
                className="h-24 w-24 mb-4"
              />
              <h2 className="text-xl font-bold">{currentUser?.name}</h2>
              <p className="text-gray-500 text-sm">
                {currentUser?.email}
              </p>
              <div className="mt-2 text-sm inline-block px-3 py-1 bg-thrive-soft-purple rounded-full capitalize">
                {currentUser?.userType}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        
        {/* Account Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
          <Card>
            <CardContent className="p-0">
              <button 
                className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/notifications')}
              >
                <span>Notifications</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
              
              <Separator />
              
              <button 
                className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/privacy')}
              >
                <span>Privacy & Security</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
              
              <Separator />
              
              <button 
                className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/appearance')}
              >
                <span>Appearance</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </CardContent>
          </Card>
        </div>
        
        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <Card>
            <CardContent className="p-0">
              <button 
                className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/help')}
              >
                <span>Help & Support</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
              
              <Separator />
              
              <button 
                className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/terms')}
              >
                <span>Terms of Service</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
              
              <Separator />
              
              <button 
                className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50"
                onClick={() => navigate('/privacy-policy')}
              >
                <span>Privacy Policy</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </CardContent>
          </Card>
        </div>
        
        {/* Logout Button */}
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          Log Out
        </Button>
        
        <div className="text-center text-xs text-gray-400 mt-2">
          Version 1.0.0
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileScreen;
