
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Authentication Pages
import LoginScreen from "./pages/LoginScreen";
import SignupScreen from "./pages/SignupScreen";

// Home Pages
import HomeScreen from "./pages/HomeScreen";
import TherapistHomeScreen from "./pages/TherapistHomeScreen";

// Profile Pages
import ProfileScreen from "./pages/ProfileScreen";
import EditProfileScreen from "./pages/EditProfileScreen";
import TherapistScreen from "./pages/TherapistScreen";
import TherapistProfileScreen from "./pages/TherapistProfileScreen";

// Journal Pages
import JournalScreen from "./pages/JournalScreen";
import AddJournal from "./pages/AddJournal";
import DisplayJournal from "./pages/DisplayJournal";

// Chat & Video Call
import ChatWithThink from "./pages/ChatWithThink";

// Blog Pages
import BlogMainScreen from "./pages/BlogMainScreen";
import OpenBlogScreen from "./pages/OpenBlogScreen";

// Fitness Pages
import FitnessScreen from "./pages/FitnessScreen";
import FitnessSubScreen from "./pages/FitnessSubScreen";
import FitnessContent from "./pages/FitnessContent";
import IndividualFitnessContent from "./pages/IndividualFitnessContent";

// Story & Meme Pages
import StoryScreen from "./pages/StoryScreen";
import CreateMeme from "./pages/CreateMeme";

// Not Found Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<LoginScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            
            {/* Home Routes */}
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/therapist-home" element={<TherapistHomeScreen />} />
            
            {/* Profile Routes */}
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/profile/edit" element={<EditProfileScreen />} />
            <Route path="/therapist" element={<TherapistScreen />} />
            <Route path="/therapist/:id" element={<TherapistProfileScreen />} />
            
            {/* Journal Routes */}
            <Route path="/journal" element={<JournalScreen />} />
            <Route path="/journal/add" element={<AddJournal />} />
            <Route path="/journal/:id" element={<DisplayJournal />} />
            
            {/* Chat Routes */}
            <Route path="/chat/:id" element={<ChatWithThink />} />
            <Route path="/video-call/:id" element={<ChatWithThink />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogMainScreen />} />
            <Route path="/blog/:id" element={<OpenBlogScreen />} />
            
            {/* Fitness Routes */}
            <Route path="/fitness" element={<FitnessScreen />} />
            <Route path="/fitness/category/:category" element={<FitnessSubScreen />} />
            <Route path="/fitness/content/:id" element={<FitnessContent />} />
            <Route path="/fitness/individual/:id" element={<IndividualFitnessContent />} />
            
            {/* Story Routes */}
            <Route path="/story" element={<StoryScreen />} />
            <Route path="/create-meme" element={<CreateMeme />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
