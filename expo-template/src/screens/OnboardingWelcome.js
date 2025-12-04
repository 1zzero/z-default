import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { onboardingStyles } from '../styles/onboardingStyles';

export const OnboardingWelcome = ({ navigation }) => (
  <GradientBackground>
    <SafeAreaView style={onboardingStyles.screenContent}>
      <View style={onboardingStyles.welcomeContent}>
        <View style={onboardingStyles.logoWrapper}>
          <Text style={onboardingStyles.logoText}>remindMe</Text>
        </View>
        <Image
          source={require('../../images/onboard image 1.png')}
          style={onboardingStyles.heroImage}
          resizeMode="contain"
        />
        <View style={onboardingStyles.textBlock}>
          <Text style={onboardingStyles.primaryHeading}>Your mental health matters</Text>
          <Text style={onboardingStyles.subHeading}>Start your journey with us</Text>
        </View>
      </View>
      <View style={onboardingStyles.ctaWrapper}>
        <TouchableOpacity
          style={onboardingStyles.primaryCta}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('OnboardingName')}
        >
          <Text style={onboardingStyles.primaryCtaText}>Let's start now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </GradientBackground>
);


