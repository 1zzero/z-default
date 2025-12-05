import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { onboardingStyles } from '../styles/onboardingStyles';
import { useJournal } from '../contexts/JournalContext';
import BottomNav from '../components/BottomNav';

export const JournalHome = ({ navigation }) => {
  const { entries } = useJournal();

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView
        contentContainerStyle={onboardingStyles.journalScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={onboardingStyles.journalTopRow}>
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

        <View style={onboardingStyles.journalHeaderRow}>
          <View>
            <Text style={onboardingStyles.journalTitle}>Your Entries</Text>
            <Text style={onboardingStyles.journalSubtitle}>
              Document your Mental Journal.
            </Text>
          </View>

          <TouchableOpacity
            style={onboardingStyles.journalNewButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('NewJournalEntry')}
          >
            <Image
              source={require('../../images/pencilIcon.png')}
              style={onboardingStyles.journalNewIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={onboardingStyles.journalSectionHeader}>
          <Text style={onboardingStyles.journalSectionTitle}>All Journals</Text>
        </View>

        {entries.length === 0 ? (
          <View style={onboardingStyles.journalEmptyState}>
            <Text style={onboardingStyles.journalEmptyTitle}>
              No entries yet
            </Text>
            <Text style={onboardingStyles.journalEmptySubtitle}>
              Tap the pencil to start your first journal entry.
            </Text>
          </View>
        ) : (
          <View style={onboardingStyles.journalEntriesContainer}>
            {entries.map((entry) => (
              <TouchableOpacity
                key={entry.id}
                style={onboardingStyles.journalEntryCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('JournalDetail', { entry })}
              >
                <View style={onboardingStyles.journalEntryHeader}>
                  <Text style={onboardingStyles.journalEntryTitle}>{entry.title}</Text>
                  <Text style={onboardingStyles.journalEntryDate}>{entry.date}</Text>
                </View>
                <Text style={onboardingStyles.journalEntryPreview}>{entry.preview}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};


