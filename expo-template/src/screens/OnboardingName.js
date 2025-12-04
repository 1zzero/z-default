import { useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { onboardingStyles } from '../styles/onboardingStyles';

export const OnboardingName = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <GradientBackground>
      <SafeAreaView style={onboardingStyles.screenContent}>
        <View style={onboardingStyles.nameContent}>
          <View style={onboardingStyles.textBlock}>
            <Text style={onboardingStyles.primaryHeading}>What should we call you?</Text>
          </View>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#a0a0a0"
            style={onboardingStyles.nameInput}
          />
          <Image
            source={require('../../images/onboard image 2.png')}
            style={onboardingStyles.nameHeroImage}
            resizeMode="contain"
          />
        </View>
        <View style={onboardingStyles.ctaWrapper}>
          <TouchableOpacity
            style={onboardingStyles.primaryCta}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Dashboard', { name })}
          >
            <Text style={onboardingStyles.primaryCtaText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};


