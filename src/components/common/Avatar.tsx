
import React from 'react';
import { Avatar as UIAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className = '' }) => {
  // Get initials from name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Determine size class
  const sizeClass = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  }[size];

  return (
    <UIAvatar className={`${sizeClass} ${className}`}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="bg-thrive-purple text-white font-medium">
        {initials}
      </AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
