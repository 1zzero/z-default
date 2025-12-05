import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import { onboardingStyles } from '../styles/onboardingStyles';
import BottomNav from '../components/BottomNav';

export const Resources = ({ navigation }) => {
  const resources = [
    {
      id: 'meditation',
      title: 'Meditation Guides',
      description: 'Learn mindfulness and meditation techniques',
      icon: require('../../images/lungIcon.png'),
      color: '#c7b8ff',
      link: null,
    },
    {
      id: 'therapy',
      title: 'Therapy Resources',
      description: 'Find professional mental health support',
      icon: require('../../images/resourcesIcon.png'),
      color: '#cfe59b',
      link: 'https://www.therapyden.com',
    },
    {
      id: 'self-care',
      title: 'Self-Care Tips',
      description: 'Daily practices for mental wellness',
      icon: require('../../images/journalIcon.png'),
      color: '#ffb68a',
      link: null,
    },
    {
      id: 'helpline',
      title: 'Crisis Hotline',
      description: '24/7 support when you need it most',
      icon: require('../../images/phoneIcon.png'),
      color: '#ff9b97',
      link: 'tel:988',
    },
  ];

  const handleResourcePress = (resource) => {
    if (resource.link) {
      Linking.openURL(resource.link);
    }
  };

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView
        contentContainerStyle={onboardingStyles.resourcesScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={onboardingStyles.resourcesTopRow}>
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

        <View style={onboardingStyles.resourcesHeaderRow}>
          <View>
            <Text style={onboardingStyles.journalTitle}>Resources</Text>
            <Text style={onboardingStyles.journalSubtitle}>
              Helpful tools for your wellness journey.
            </Text>
          </View>
        </View>

        <View style={onboardingStyles.resourcesList}>
          {resources.map((resource) => (
            <TouchableOpacity
              key={resource.id}
              activeOpacity={0.9}
              style={onboardingStyles.resourceCard}
              onPress={() => handleResourcePress(resource)}
            >
              <View
                style={[
                  onboardingStyles.resourceIconWrapper,
                  { backgroundColor: resource.color },
                ]}
              >
                <Image
                  source={resource.icon}
                  style={onboardingStyles.resourceIcon}
                />
              </View>
              <View style={onboardingStyles.resourceCardContent}>
                <Text style={onboardingStyles.resourceCardTitle}>
                  {resource.title}
                </Text>
                <Text style={onboardingStyles.resourceCardDescription}>
                  {resource.description}
                </Text>
              </View>
              {resource.link && (
                <Text style={onboardingStyles.resourceArrow}>→</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={onboardingStyles.resourcesFooter}>
          <Text style={onboardingStyles.resourcesFooterText}>
            For immediate help, call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line).
          </Text>
        </View>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};
