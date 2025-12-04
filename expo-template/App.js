import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
} from '@expo-google-fonts/urbanist';
import { OnboardingWelcome } from './src/screens/OnboardingWelcome';
import { OnboardingName } from './src/screens/OnboardingName';
import { Dashboard } from './src/screens/Dashboard';
import { JournalHome } from './src/screens/JournalHome';
import { NewJournalEntry } from './src/screens/NewJournalEntry';
import { JournalProvider } from './src/contexts/JournalContext';
import { JournalDetail } from './src/screens/JournalDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <JournalProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcome} />
            <Stack.Screen name="OnboardingName" component={OnboardingName} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="JournalHome" component={JournalHome} />
            <Stack.Screen name="NewJournalEntry" component={NewJournalEntry} />
            <Stack.Screen name="JournalDetail" component={JournalDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </JournalProvider>
    </>
  );
}
