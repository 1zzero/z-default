import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { onboardingStyles } from '../styles/onboardingStyles';
import BottomNav from '../components/BottomNav';

const sounds = [
  {
    id: 'rain',
    name: 'Rain',
    description: 'Gentle rainfall to help you relax',
    icon: require('../../images/lungIcon.png'),
    color: '#4a90e2',
    sound: require('../../sounds/light-rain-109591.mp3'),
  },
  {
    id: 'fire',
    name: 'Fire',
    description: 'Cozy crackling fire sounds',
    icon: require('../../images/lungIcon.png'),
    color: '#ff8a7a',
    sound: require('../../sounds/fire-crackling-229897.mp3'),
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Soothing ocean waves',
    icon: require('../../images/lungIcon.png'),
    color: '#1a3a52',
    sound: require('../../sounds/ocean-waves-250310.mp3'),
  },
];

export const CalmSounds = ({ navigation }) => {
  const handleSelectSound = (sound) => {
    navigation.navigate('BreathingExercises', { sound });
  };

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView
        contentContainerStyle={onboardingStyles.analyticsScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={onboardingStyles.analyticsTopRow}>
          <TouchableOpacity
            style={onboardingStyles.journalBackButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../images/backIcon.png')}
              style={onboardingStyles.journalBackIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={onboardingStyles.analyticsHeaderRow}>
          <View>
            <Text style={onboardingStyles.journalTitle}>Calm Sounds</Text>
            <Text style={onboardingStyles.journalSubtitle}>
              Choose a sound to help you unwind.
            </Text>
          </View>
        </View>

        <View style={onboardingStyles.calmSoundsContainer}>
          {sounds.map((sound) => (
            <TouchableOpacity
              key={sound.id}
              style={[onboardingStyles.calmSoundCard,]}
              activeOpacity={0.7}
              onPress={() => handleSelectSound(sound)}
            >
              <View
                style={[onboardingStyles.calmSoundIconBox, { backgroundColor: sound.color }]}
              >
                <Image
                  source={sound.icon}
                  style={onboardingStyles.calmSoundIcon}
                />
              </View>
              <View style={onboardingStyles.calmSoundTextBox}>
                <Text style={onboardingStyles.calmSoundName}>{sound.name}</Text>
                <Text style={onboardingStyles.calmSoundDescription}>
                  {sound.description}
                </Text>
              </View>
              <Image
                source={require('../../images/backIcon.png')}
                style={[onboardingStyles.calmSoundArrow, { tintColor: sound.color }]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};
