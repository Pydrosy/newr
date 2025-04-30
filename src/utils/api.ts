
import { BlogPost, ChatMessage, FitnessContent, JournalEntry, TherapistMatch, User } from "../types";

// Mock data generator functions
// In a real app, these would be API calls to your backend

// Mock therapists data
const mockTherapists: User[] = [
  {
    id: 'therapist-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@thrive.com',
    userType: 'therapist',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Licensed psychologist with 10+ years of experience in cognitive behavioral therapy.',
    specializations: ['Anxiety', 'Depression', 'Trauma'],
    rating: 4.9
  },
  {
    id: 'therapist-2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@thrive.com',
    userType: 'therapist',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Specialized in mindfulness-based therapy approaches for stress and anxiety management.',
    specializations: ['Stress', 'Anxiety', 'Mindfulness'],
    rating: 4.7
  },
  {
    id: 'therapist-3',
    name: 'Dr. Aisha Patel',
    email: 'aisha.patel@thrive.com',
    userType: 'therapist',
    profileImage: 'https://randomuser.me/api/portraits/women/66.jpg',
    bio: 'Family therapist with expertise in relationship counseling and cultural sensitivity.',
    specializations: ['Family Therapy', 'Relationships', 'Cultural Issues'],
    rating: 4.8
  },
  {
    id: 'therapist-4',
    name: 'Dr. James Wilson',
    email: 'james.wilson@thrive.com',
    userType: 'therapist',
    profileImage: 'https://randomuser.me/api/portraits/men/11.jpg',
    bio: 'Specializing in addiction recovery and behavioral change strategies.',
    specializations: ['Addiction', 'Substance Abuse', 'Recovery'],
    rating: 4.6
  },
];

// Mock blog posts
const mockBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Understanding Anxiety in the Modern World',
    summary: 'Learn about the causes and effects of anxiety disorders and how to manage symptoms.',
    content: 'Anxiety is one of the most common mental health conditions affecting millions worldwide...',
    author: 'Dr. Sarah Johnson',
    coverImage: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3',
    publishedDate: new Date('2023-05-15'),
    readTime: 5,
    tags: ['Anxiety', 'Mental Health', 'Self-care']
  },
  {
    id: 'blog-2',
    title: 'The Science of Mindfulness Meditation',
    summary: 'Discover how mindfulness practices can rewire your brain for better mental health.',
    content: 'Recent neuroscience research has shown that regular mindfulness meditation can change brain structure...',
    author: 'Dr. Michael Chen',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    publishedDate: new Date('2023-06-22'),
    readTime: 7,
    tags: ['Mindfulness', 'Meditation', 'Neuroscience']
  },
  {
    id: 'blog-3',
    title: 'Building Resilience Through Difficult Times',
    summary: 'Strategies for developing mental strength when facing life's challenges.',
    content: 'Resilience isn't about avoiding stress or hardship, but developing healthy ways to cope...',
    author: 'Dr. Aisha Patel',
    coverImage: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    publishedDate: new Date('2023-07-10'),
    readTime: 6,
    tags: ['Resilience', 'Coping', 'Personal Growth']
  },
];

// Mock fitness content
const mockFitnessContent: FitnessContent[] = [
  {
    id: 'fitness-1',
    title: 'Stress-Relief Yoga',
    description: 'A gentle yoga sequence designed to release tension and calm the mind.',
    category: 'Yoga',
    duration: 20,
    intensity: 'low',
    thumbnail: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3',
    videoUrl: 'https://example.com/videos/stress-yoga',
    steps: [
      'Start in a comfortable seated position',
      'Focus on deep breathing for 1 minute',
      'Move into gentle neck stretches'
    ]
  },
  {
    id: 'fitness-2',
    title: 'Mood-Boosting HIIT Workout',
    description: 'A short, high-intensity interval training session to release endorphins.',
    category: 'Cardio',
    duration: 15,
    intensity: 'high',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    videoUrl: 'https://example.com/videos/mood-hiit',
  },
  {
    id: 'fitness-3',
    title: 'Mindful Movement Meditation',
    description: 'Combine gentle movement with mindfulness for stress reduction.',
    category: 'Meditation',
    duration: 10,
    intensity: 'low',
    thumbnail: 'https://images.unsplash.com/photo-1474418397713-003ec9f713a6',
    videoUrl: 'https://example.com/videos/mindful-movement',
  },
];

// API mock functions
export const getTherapists = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockTherapists];
};

export const getTherapistById = async (id: string): Promise<User | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockTherapists.find(therapist => therapist.id === id);
};

export const getRecommendedTherapists = async (userId: string): Promise<TherapistMatch[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  // Mock GNN result - in a real app, this would use actual GNN algorithms
  return mockTherapists.map(therapist => ({
    therapistId: therapist.id,
    matchScore: Math.random() * 0.3 + 0.7, // Random score between 0.7 and 1.0
    matchReason: `Based on your profile and needs, our GNN algorithm found a strong match with ${therapist.name}'s expertise.`
  })).sort((a, b) => b.matchScore - a.matchScore);
};

export const getJournalEntries = async (userId: string): Promise<JournalEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  // Mock journal entries
  return [
    {
      id: 'journal-1',
      userId,
      title: 'Today was challenging',
      content: 'I felt anxious during the presentation but used breathing techniques to calm myself.',
      mood: 'anxious',
      createdAt: new Date('2023-07-15T14:30:00'),
      updatedAt: new Date('2023-07-15T14:30:00')
    },
    {
      id: 'journal-2',
      userId,
      title: 'Progress with therapy',
      content: 'Had a great session today. Feeling more optimistic about things.',
      mood: 'happy',
      createdAt: new Date('2023-07-12T10:15:00'),
      updatedAt: new Date('2023-07-12T10:15:00')
    }
  ];
};

export const saveJournalEntry = async (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<JournalEntry> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Mock saving a journal entry
  return {
    ...entry,
    id: 'journal-' + Math.random().toString(36).substring(2, 9),
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const getChatMessages = async (userId: string, recipientId: string): Promise<ChatMessage[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  // Mock chat messages
  return [
    {
      id: 'msg-1',
      senderId: recipientId,
      receiverId: userId,
      content: 'Hello, how are you feeling today?',
      timestamp: new Date('2023-07-15T09:30:00'),
      read: true
    },
    {
      id: 'msg-2',
      senderId: userId,
      receiverId: recipientId,
      content: 'I'm doing better than yesterday. The exercises are helping.',
      timestamp: new Date('2023-07-15T09:32:00'),
      read: true
    },
    {
      id: 'msg-3',
      senderId: recipientId,
      receiverId: userId,
      content: 'That's great to hear! Would you like to discuss any specific challenges?',
      timestamp: new Date('2023-07-15T09:33:00'),
      read: true
    },
  ];
};

export const sendChatMessage = async (message: Omit<ChatMessage, 'id' | 'timestamp' | 'read'>): Promise<ChatMessage> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  // Mock sending a message
  return {
    ...message,
    id: 'msg-' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date(),
    read: false
  };
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockBlogs];
};

export const getBlogPostById = async (id: string): Promise<BlogPost | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockBlogs.find(blog => blog.id === id);
};

export const getFitnessContent = async (): Promise<FitnessContent[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [...mockFitnessContent];
};

export const getFitnessContentById = async (id: string): Promise<FitnessContent | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockFitnessContent.find(content => content.id === id);
};

export const getFitnessContentByCategory = async (category: string): Promise<FitnessContent[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockFitnessContent.filter(content => content.category.toLowerCase() === category.toLowerCase());
};
