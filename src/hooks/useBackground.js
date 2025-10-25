import { useContext } from 'react';
import { BackgroundContext } from '../contexts/contexts.js';

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};