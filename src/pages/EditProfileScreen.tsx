
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Avatar from '@/components/common/Avatar';

const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [specializations, setSpecializations] = useState<string[]>(currentUser?.specializations || []);
  const [specializationInput, setSpecializationInput] = useState('');
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || '');
  const [isSaving, setIsSaving] = useState(false);

  // Pre-fill form fields with current user data
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setBio(currentUser.bio || '');
      setSpecializations(currentUser.specializations || []);
      setProfileImage(currentUser.profileImage || '');
    }
  }, [currentUser]);

  const handleAddSpecialization = () => {
    if (specializationInput.trim() && !specializations.includes(specializationInput.trim())) {
      setSpecializations([...specializations, specializationInput.trim()]);
      setSpecializationInput('');
    }
  };

  const handleRemoveSpecialization = (specialization: string) => {
    setSpecializations(specializations.filter(s => s !== specialization));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Name cannot be empty',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      await updateProfile({
        name,
        email,
        bio,
        specializations,
        profileImage
      });
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AppLayout title="Edit Profile" showBack>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <Avatar
              src={profileImage}
              name={name}
              size="lg"
              className="h-24 w-24 mb-4"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => toast({ description: "Profile image upload not implemented in this demo"})}
            >
              Change Photo
            </Button>
          </div>
          
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled // Email is read-only in this demo
            />
            <p className="text-xs text-gray-500">
              Email cannot be changed
            </p>
          </div>
          
          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a bit about yourself"
              rows={4}
            />
          </div>
          
          {/* Specializations (for therapists) */}
          {currentUser?.userType === 'therapist' && (
            <div className="space-y-2">
              <Label htmlFor="specializations">Specializations</Label>
              <div className="flex gap-2">
                <Input
                  id="specializations"
                  value={specializationInput}
                  onChange={(e) => setSpecializationInput(e.target.value)}
                  placeholder="Add a specialization"
                />
                <Button 
                  type="button" 
                  onClick={handleAddSpecialization}
                  disabled={!specializationInput.trim()}
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {specializations.map((spec, index) => (
                  <div 
                    key={index} 
                    className="bg-thrive-soft-purple px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <span>{spec}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialization(spec)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Save Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default EditProfileScreen;
