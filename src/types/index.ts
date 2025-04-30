
export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'patient' | 'therapist';
  profileImage?: string;
  bio?: string;
  specializations?: string[];
  rating?: number;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: 'happy' | 'sad' | 'anxious' | 'calm' | 'angry' | 'neutral';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  coverImage: string;
  publishedDate: Date;
  readTime: number;
  tags: string[];
}

export interface FitnessContent {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  thumbnail: string;
  videoUrl?: string;
  steps?: string[];
}

export interface TherapistMatch {
  therapistId: string;
  matchScore: number;
  matchReason: string;
}
