
import React, { ReactNode } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface AppLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  title?: string;
  showBack?: boolean;
  showFooter?: boolean;
  showHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  requireAuth = true,
  title,
  showBack = false,
  showFooter = true,
  showHeader = true
}) => {
  const { currentUser, isLoading } = useAuth();

  // Redirect to login if auth is required but user is not authenticated
  if (requireAuth && !isLoading && !currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showHeader && <Header title={title} showBack={showBack} />}
      
      <main className="flex-1 pb-16">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default AppLayout;
