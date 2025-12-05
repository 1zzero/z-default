import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onboardingStyles } from '../styles/onboardingStyles';

export const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={onboardingStyles.bottomNavContainer}>
      <View style={onboardingStyles.bottomNavCard}>
        <TouchableOpacity
          style={onboardingStyles.bottomNavIconWrapper}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Image
            source={require('../../images/homeIcon.png')}
            style={onboardingStyles.bottomNavIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={onboardingStyles.bottomNavIconWrapper}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('MoodTracking')}
        >
          <Image
            source={require('../../images/moodIcon.png')}
            style={onboardingStyles.bottomNavIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={onboardingStyles.bottomNavIconWrapper}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('JournalHome')}
        >
          <Image
            source={require('../../images/journalIcon.png')}
            style={onboardingStyles.bottomNavIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={onboardingStyles.bottomNavIconWrapper}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Analytics')}
        >
          <Image
            source={require('../../images/analyticsIcon.png')}
            style={onboardingStyles.bottomNavIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNav;
