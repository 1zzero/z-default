import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import { onboardingStyles } from '../styles/onboardingStyles';

export const CrisisSupport = ({ navigation }) => {
  const crisisServices = [
    {
      id: 'suicide-lifeline',
      name: '988 Suicide & Crisis Lifeline',
      description: 'Free, confidential support 24/7',
      phone: '988',
      availability: 'Available 24 hours every day',
      icon: require('../../images/phoneIcon.png'),
      color: '#ff9b97',
    },
    {
      id: 'crisis-text',
      name: 'Crisis Text Line',
      description: 'Text-based support for those in crisis',
      phone: 'Text HOME to 741741',
      availability: 'Available 24 hours every day',
      icon: require('../../images/phoneIcon.png'),
      color: '#ffb68a',
    },
    {
      id: 'international',
      name: 'International Association',
      description: 'Global suicide prevention resources',
      phone: 'Find local hotlines',
      availability: 'Varies by region',
      icon: require('../../images/resourcesIcon.png'),
      color: '#cfe59b',
    },
  ];

  const handleCall = (phone) => {
    if (phone.startsWith('988') || phone.startsWith('Text')) {
      const numberToCall = phone.startsWith('988') ? `tel:${phone}` : null;
      if (numberToCall) {
        Linking.openURL(numberToCall);
      }
    }
  };

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView
        contentContainerStyle={onboardingStyles.crisisScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={onboardingStyles.crisisTopRow}>
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

        <View style={onboardingStyles.crisisHeaderRow}>
          <View>
            <Text style={onboardingStyles.journalTitle}>Crisis Support</Text>
            <Text style={onboardingStyles.journalSubtitle}>
              You are not alone. Help is available.
            </Text>
          </View>
        </View>
        <View style={onboardingStyles.crisisServicesList}>
          {crisisServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              activeOpacity={0.9}
              style={onboardingStyles.crisisServiceCard}
              onPress={() => handleCall(service.phone)}
            >
              <View
                style={[
                  onboardingStyles.crisisServiceIconWrapper,
                  { backgroundColor: service.color },
                ]}
              >
                <Image
                  source={service.icon}
                  style={onboardingStyles.crisisServiceIcon}
                />
              </View>
              <View style={onboardingStyles.crisisServiceContent}>
                <Text style={onboardingStyles.crisisServiceName}>
                  {service.name}
                </Text>
                <Text style={onboardingStyles.crisisServiceDescription}>
                  {service.description}
                </Text>
                <Text style={onboardingStyles.crisisServicePhone}>
                  {service.phone}
                </Text>
                <Text style={onboardingStyles.crisisServiceAvailability}>
                  {service.availability}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={onboardingStyles.crisisReminder}>
          <Text style={onboardingStyles.crisisReminderTitle}>Remember:</Text>
          <Text style={onboardingStyles.crisisReminderText}>
            • Your life has value{'\n'}
            • This feeling is temporary{'\n'}
            • Professional help can make a difference{'\n'}
            • Reaching out is a sign of strength
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
