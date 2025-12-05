import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodLogsContext = createContext();

export const MoodLogsProvider = ({ children }) => {
  const [moodLogs, setMoodLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load mood logs from AsyncStorage on mount
  useEffect(() => {
    loadMoodLogs();
  }, []);

  const loadMoodLogs = async () => {
    try {
      const savedLogs = await AsyncStorage.getItem('moodLogs');
      if (savedLogs) {
        const parsed = JSON.parse(savedLogs);
        // Migration: ensure each log has a dateKey (YYYY-MM-DD) for reliable lookups
        const migrated = parsed.map((log) => {
          if (!log.dateKey) {
            // derive dateKey from timestamp if available, otherwise from date
            const ts = log.timestamp ? new Date(log.timestamp) : new Date(log.date);
            const y = ts.getFullYear();
            const m = String(ts.getMonth() + 1).padStart(2, '0');
            const d = String(ts.getDate()).padStart(2, '0');
            return { ...log, dateKey: `${y}-${m}-${d}` };
          }
          return log;
        });
        setMoodLogs(migrated);
        // Save back migrated logs if any lacked dateKey
        const needsSave = migrated.some((l, i) => !parsed[i] || parsed[i].dateKey !== l.dateKey);
        if (needsSave) {
          await AsyncStorage.setItem('moodLogs', JSON.stringify(migrated));
        }
      }
    } catch (error) {
      console.error('Error loading mood logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMoodLog = async (mood) => {
    try {
      const now = new Date();
      const dateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const newLog = {
        id: Date.now().toString(),
        mood: mood,
        timestamp: now.toISOString(),
        date: now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        dateKey,
      };
      const updatedLogs = [newLog, ...moodLogs];
      setMoodLogs(updatedLogs);
      await AsyncStorage.setItem('moodLogs', JSON.stringify(updatedLogs));
    } catch (error) {
      console.error('Error saving mood log:', error);
    }
  };

  return (
    <MoodLogsContext.Provider value={{ moodLogs, addMoodLog, isLoading }}>
      {children}
    </MoodLogsContext.Provider>
  );
};

export const useMoodLogs = () => {
  const context = useContext(MoodLogsContext);
  if (!context) {
    throw new Error('useMoodLogs must be used within MoodLogsProvider');
  }
  return context;
};
