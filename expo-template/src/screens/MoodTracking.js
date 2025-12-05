import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useMood } from '../contexts/MoodContext';
import { useMoodLogs } from '../contexts/MoodLogsContext';
import { onboardingStyles } from '../styles/onboardingStyles';

export const MoodTracking = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = useState('veryHappy');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [buttonText, setButtonText] = useState('Set Mood');
  const { setMood } = useMood();
  const { addMoodLog } = useMoodLogs();

  const moods = [
    {
      id: 'veryHappy',
      label: 'Very Happy',
      icon: require('../../images/veryHappyIcon.png'),
      colors: ['#9b7fd4', '#7b5bb8'],
      backgroundColor: '#a78fd9',
    },
    {
      id: 'happy',
      label: 'Happy',
      icon: require('../../images/HappyIcon.png'),
      colors: ['#ffc966', '#ffb84d'],
      backgroundColor: '#ffc966',
    },
    {
      id: 'neutral',
      label: 'Neutral',
      icon: require('../../images/NeutralIcon.png'),
      colors: ['#66d4a8', '#4dbe99'],
      backgroundColor: '#66d4a8',
    },
    {
      id: 'sad',
      label: 'Sad',
      icon: require('../../images/SadIcon.png'),
      colors: ['#5ba8d9', '#4a99d4'],
      backgroundColor: '#5ba8d9',
    },
    {
      id: 'angry',
      label: 'Angry',
      icon: require('../../images/AngryIcon.png'),
      colors: ['#e53935', '#d32f2f'],
      backgroundColor: '#e53935',
    },
  ];

  const currentMood = moods.find((m) => m.id === selectedMood);

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
  };

  const handleSaveMood = async () => {
    if (selectedMood) {
      const mood = moods.find((m) => m.id === selectedMood);
      await setMood(mood);
      await addMoodLog(mood);
      setButtonText('Mood Set!');
      setShowConfirmation(true);
      // Wait 1.5 seconds then go back to dashboard
      setTimeout(() => {
        navigation.navigate('Dashboard');
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <LinearGradient
        colors={currentMood.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={onboardingStyles.moodGradientContainer}
      >
        <View style={onboardingStyles.moodFullScreenContent}>
          <TouchableOpacity
            style={onboardingStyles.moodCloseButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Text style={onboardingStyles.moodCloseButtonText}>✕</Text>
          </TouchableOpacity>

          <Text style={onboardingStyles.moodFullScreenQuestion}>
            How are you really feeling today?
          </Text>

          <Image
            source={currentMood.icon}
            style={onboardingStyles.moodFullScreenIcon}
          />

          <Text style={onboardingStyles.moodFullScreenLabel}>
            I'm feeling {currentMood.label}
          </Text>

          <View style={onboardingStyles.moodFullScreenArrows}>
            <TouchableOpacity
              onPress={() => {
                const currentIndex = moods.findIndex((m) => m.id === selectedMood);
                if (currentIndex > 0) {
                  setSelectedMood(moods[currentIndex - 1].id);
                }
              }}
            >
              <Text style={onboardingStyles.moodArrowText}>‹</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                const currentIndex = moods.findIndex((m) => m.id === selectedMood);
                if (currentIndex < moods.length - 1) {
                  setSelectedMood(moods[currentIndex + 1].id);
                }
              }}
            >
              <Text style={onboardingStyles.moodArrowText}>›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={onboardingStyles.moodSetButton}
            onPress={handleSaveMood}
            activeOpacity={0.8}
          >
            <Text style={onboardingStyles.moodSetButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
