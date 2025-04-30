
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Avatar from './Avatar';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showMenu = true
}) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBack = () => {
    navigate(-1);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="relative z-10 flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <div className="flex items-center space-x-3">
        {showBack && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-10 w-10" 
            onClick={handleBack}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Button>
        )}
        
        {showMenu && (
          <Button variant="ghost" size="sm" className="p-0 h-10 w-10 md:hidden">
            <Menu size={24} />
          </Button>
        )}
        
        {title && (
          <h1 className="text-lg font-semibold">{title}</h1>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="p-0 h-10 w-10 relative">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        {currentUser && (
          <div
            className="cursor-pointer"
            onClick={handleProfileClick}
          >
            <Avatar 
              src={currentUser.profileImage}
              name={currentUser.name} 
              size="sm"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
