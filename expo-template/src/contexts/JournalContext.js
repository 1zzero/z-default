import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load entries from AsyncStorage on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('journalEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEntry = async (newEntry) => {
    try {
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const deleteEntry = async (entryId) => {
    try {
      const updatedEntries = entries.filter(entry => entry.id !== entryId);
      setEntries(updatedEntries);
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <JournalContext.Provider value={{ entries, addEntry, deleteEntry, isLoading }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
