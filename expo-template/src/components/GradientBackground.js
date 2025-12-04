import { LinearGradient } from 'expo-linear-gradient';
import { onboardingStyles } from '../styles/onboardingStyles';

export const GradientBackground = ({ children }) => (
  <LinearGradient colors={['#c4e2f5', '#eaf5ff']} style={onboardingStyles.gradient}>
    {children}
  </LinearGradient>
);


