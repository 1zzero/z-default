import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { onboardingStyles } from '../styles/onboardingStyles';

export const JournalHome = ({ navigation }) => {
  const isEmpty = true; // TODO: wire to real journal data

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView
        contentContainerStyle={onboardingStyles.journalScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={onboardingStyles.journalBackRow}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../images/homeIcon.png')}
            style={onboardingStyles.journalBackIcon}
          />
          <Text style={onboardingStyles.journalBackLabel}>Back to Dashboard</Text>
        </TouchableOpacity>

        <View style={onboardingStyles.journalHeaderRow}>
          <View>
            <Text style={onboardingStyles.journalTitle}>Your Entries</Text>
            <Text style={onboardingStyles.journalSubtitle}>
              Document your Mental Journal.
            </Text>
          </View>

          <View style={onboardingStyles.journalNewButton}>
            <Image
              source={require('../../images/pencilIcon.png')}
              style={onboardingStyles.journalNewIcon}
            />
          </View>
        </View>

        <View style={onboardingStyles.journalSectionHeader}>
          <Text style={onboardingStyles.journalSectionTitle}>All Journals</Text>
        </View>

        {isEmpty ? (
          <View style={onboardingStyles.journalEmptyState}>
            <Text style={onboardingStyles.journalEmptyTitle}>
              No entries yet
            </Text>
            <Text style={onboardingStyles.journalEmptySubtitle}>
              Tap the pencil to start your first journal entry.
            </Text>
          </View>
        ) : (
          <View />
        )}
      </ScrollView>

      <View style={onboardingStyles.bottomNavContainer}>
        <View style={onboardingStyles.bottomNavCard}>
          <View style={onboardingStyles.bottomNavIconWrapper}>
            <Image
              source={require('../../images/homeIcon.png')}
              style={onboardingStyles.bottomNavIcon}
            />
          </View>
          <View style={onboardingStyles.bottomNavIconWrapper}>
            <Image
              source={require('../../images/moodIcon.png')}
              style={onboardingStyles.bottomNavIcon}
            />
          </View>
          <View style={onboardingStyles.bottomNavIconWrapper}>
            <Image
              source={require('../../images/journalIcon.png')}
              style={onboardingStyles.bottomNavIcon}
            />
          </View>
          <View style={onboardingStyles.bottomNavIconWrapper}>
            <Image
              source={require('../../images/analyticsIcon.png')}
              style={onboardingStyles.bottomNavIcon}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


