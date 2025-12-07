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
import { MoodProvider } from './src/contexts/MoodContext';
import { MoodLogsProvider } from './src/contexts/MoodLogsContext';
import { JournalDetail } from './src/screens/JournalDetail';
import { BreathingExercises } from './src/screens/BreathingExercises';
import { CalmSounds } from './src/screens/CalmSounds';
import { Resources } from './src/screens/Resources';
import { CrisisSupport } from './src/screens/CrisisSupport';
import { Analytics } from './src/screens/Analytics';
import { MoodTracking } from './src/screens/MoodTracking';
import { UserProvider } from './src/contexts/UserContext';

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
      <UserProvider>
        <MoodLogsProvider>
        <MoodProvider>
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
            <Stack.Screen name="CalmSounds" component={CalmSounds} />
            <Stack.Screen name="BreathingExercises" component={BreathingExercises} />
            <Stack.Screen name="Resources" component={Resources} />
            <Stack.Screen name="CrisisSupport" component={CrisisSupport} />
            <Stack.Screen name="Analytics" component={Analytics} />
            <Stack.Screen name="MoodTracking" component={MoodTracking} />
          </Stack.Navigator>
        </NavigationContainer>
      </JournalProvider>
      </MoodProvider>
      </MoodLogsProvider>
      </UserProvider>
    </>
  );
}
