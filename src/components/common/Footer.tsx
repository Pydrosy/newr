
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageCircle, BookOpen, User, Dumbbell } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      path: '/home'
    },
    {
      label: 'Chat',
      icon: MessageCircle,
      path: '/chat'
    },
    {
      label: 'Journal',
      icon: BookOpen,
      path: '/journal'
    },
    {
      label: 'Fitness',
      icon: Dumbbell,
      path: '/fitness'
    },
    {
      label: 'Profile',
      icon: User,
      path: '/profile'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-sm">
      <nav className="flex justify-around px-2 py-3">
        {navItems.map((item) => (
          <button 
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-16 py-1 transition-colors ${
              isActive(item.path) 
                ? 'text-thrive-purple' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
