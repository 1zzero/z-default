import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { useJournal } from '../contexts/JournalContext';
import { useMoodLogs } from '../contexts/MoodLogsContext';
import { onboardingStyles } from '../styles/onboardingStyles';
import BottomNav from '../components/BottomNav';

export const Analytics = ({ navigation }) => {
  const { entries } = useJournal();
  const { moodLogs } = useMoodLogs();

  const journalCount = entries.length;
  const moodCount = moodLogs.length;

  const isEmpty = journalCount === 0 && moodCount === 0;
  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView
        contentContainerStyle={onboardingStyles.analyticsScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={onboardingStyles.analyticsTopRow}>
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

        <View style={onboardingStyles.analyticsHeaderRow}>
          <View>
            <Text style={onboardingStyles.journalTitle}>Analytics</Text>
            <Text style={onboardingStyles.journalSubtitle}>
              Track your wellness progress.
            </Text>
          </View>
        </View>

        {isEmpty ? (
          <>
            <View style={onboardingStyles.analyticsEmptyState}>
              <Text style={onboardingStyles.analyticsEmptyTitle}>
                No data yet
              </Text>
              <Text style={onboardingStyles.analyticsEmptySubtitle}>
                Start using the app to see your wellness insights and progress over time.
              </Text>
            </View>

            <View style={onboardingStyles.analyticsStatsPreview}>
              <Text style={onboardingStyles.analyticsPreviewTitle}>What you'll see here:</Text>
              <View style={onboardingStyles.analyticsStat}>
                <Text style={onboardingStyles.analyticsStatLabel}>Journal Entries</Text>
                <Text style={onboardingStyles.analyticsStatValue}>0</Text>
              </View>
              <View style={onboardingStyles.analyticsStat}>
                <Text style={onboardingStyles.analyticsStatLabel}>Mood Logs</Text>
                <Text style={onboardingStyles.analyticsStatValue}>0</Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={onboardingStyles.analyticsStatsPreview}>
              <Text style={onboardingStyles.analyticsPreviewTitle}>Your Progress</Text>
              <View style={onboardingStyles.analyticsStat}>
                <Text style={onboardingStyles.analyticsStatLabel}>Journal Entries</Text>
                <Text style={onboardingStyles.analyticsStatValue}>{journalCount}</Text>
              </View>
              <View style={onboardingStyles.analyticsStat}>
                <Text style={onboardingStyles.analyticsStatLabel}>Mood Logs</Text>
                <Text style={onboardingStyles.analyticsStatValue}>{moodCount}</Text>
              </View>
            </View>

            {moodLogs.length > 0 && (
              <View style={onboardingStyles.analyticsMoodLogsSection}>
                <Text style={onboardingStyles.analyticsMoodLogsTitle}>Recent Moods</Text>
                {moodLogs.slice(0, 5).map((log) => (
                  <View key={log.id} style={onboardingStyles.analyticsMoodLogItem}>
                    <View
                      style={[
                        onboardingStyles.analyticsMoodLogColor,
                        { backgroundColor: log.mood.colors[0] },
                      ]}
                    />
                    <View style={onboardingStyles.analyticsMoodLogContent}>
                      <Text style={onboardingStyles.analyticsMoodLogLabel}>
                        {log.mood.label}
                      </Text>
                      <Text style={onboardingStyles.analyticsMoodLogDate}>
                        {log.date}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};
