import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load user name from AsyncStorage on mount
  useEffect(() => {
    loadUserName();
  }, []);

  const loadUserName = async () => {
    try {
      const savedName = await AsyncStorage.getItem('userName');
      if (savedName) {
        setUserName(savedName);
      }
    } catch (error) {
      console.error('Error loading user name:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserName = async (name) => {
    try {
      const trimmedName = name.trim();
      setUserName(trimmedName);
      await AsyncStorage.setItem('userName', trimmedName);
    } catch (error) {
      console.error('Error saving user name:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userName, saveUserName, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};