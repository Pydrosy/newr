import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FitnessContent } from './FitnessContent';

// This is a wrapper component that redirects to the main FitnessContent component
// Keeping both files for compatibility with the route naming in the requirements
const IndividualFitnessContent: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  
  // Redirect to the main FitnessContent component
  React.useEffect(() => {
    navigate(`/fitness/content/${params.id}`);
  }, [navigate, params.id]);
  
  return <FitnessContent />;
};

export default IndividualFitnessContent;
