import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load current mood from AsyncStorage on mount
  useEffect(() => {
    loadMood();
  }, []);

  const loadMood = async () => {
    try {
      const savedMood = await AsyncStorage.getItem('currentMood');
      if (savedMood) {
        setCurrentMood(JSON.parse(savedMood));
      }
    } catch (error) {
      console.error('Error loading mood:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setMood = async (mood) => {
    try {
      setCurrentMood(mood);
      await AsyncStorage.setItem('currentMood', JSON.stringify(mood));
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  return (
    <MoodContext.Provider value={{ currentMood, setMood, isLoading }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within MoodProvider');
  }
  return context;
};
