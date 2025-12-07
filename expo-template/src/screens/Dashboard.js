import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useMood } from '../contexts/MoodContext';
import { useMoodLogs } from '../contexts/MoodLogsContext';
import { onboardingStyles } from '../styles/onboardingStyles';
import BottomNav from '../components/BottomNav';
import { useUser } from '../contexts/UserContext';

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getCurrentWeekDays = () => {
  const today = new Date();
  const jsDay = today.getDay(); // 0 (Sun) - 6 (Sat)
  const monday = new Date(today);
  const diff = jsDay === 0 ? -6 : 1 - jsDay;
  monday.setDate(today.getDate() + diff);

  const days = [];
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();

    days.push({
      key: `${d.toISOString()}`,
      label: dayLabels[i],
      number: d.getDate(),
      isToday,
    });
  }

  return days;
};

export const Dashboard = ({ navigation }) => {
  const { userName } = useUser();
  const { currentMood } = useMood();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const weekDays = getCurrentWeekDays();
  const { moodLogs } = useMoodLogs();

  const activities = [
    {
      key: 'journal',
      label: 'Journal',
      icon: require('../../images/journalIcon.png'),
      iconBg: '#ffb68a',
    },
    {
      key: 'breathing',
      label: 'Calm Sounds',
      icon: require('../../images/lungIcon.png'),
      iconBg: '#c7b8ff',
    },
    {
      key: 'resources',
      label: 'Resources',
      icon: require('../../images/resourcesIcon.png'),
      iconBg: '#cfe59b',
    },
    {
      key: 'crisis',
      label: 'Crisis Support',
      icon: require('../../images/phoneIcon.png'),
      iconBg: '#ff9b97',
    },
  ];

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView
        contentContainerStyle={onboardingStyles.dashboardScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={onboardingStyles.dashboardHeaderCard}>
          <View style={onboardingStyles.dashboardHeaderTopRow}>
            <View
              style={[
                onboardingStyles.dashboardDateRow,
                currentMood && { backgroundColor: currentMood.colors[0], paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
              ]}
            >
              <Image
                source={require('../../images/calendarIcon.png')}
                style={[onboardingStyles.calendarIcon, currentMood && { tintColor: '#fff' }]}
              />
              <Text style={[onboardingStyles.dashboardDateText, currentMood && { color: '#fff' }]}>
                {formattedDate}
              </Text>
            </View>
            <Image
              source={require('../../images/settingsIcon.png')}
              style={onboardingStyles.settingsIcon}
            />
          </View>

          <Text style={onboardingStyles.dashboardGreeting}>
            {userName ? `Hi, ${userName}!` : 'Hi, User!'}
          </Text>

          <View style={onboardingStyles.calendarStrip}>
            {weekDays.map((day) => {
              // compute dateKey for the day (YYYY-MM-DD)
              const d = new Date(day.key);
              const y = d.getFullYear();
              const m = String(d.getMonth() + 1).padStart(2, '0');
              const dd = String(d.getDate()).padStart(2, '0');
              const dateKey = `${y}-${m}-${dd}`;

              // find the most recent mood log for this dateKey
              const logForDay = moodLogs.find((l) => l.dateKey === dateKey);

              const pillStyle = [onboardingStyles.calendarDayPill];
              const labelStyle = [onboardingStyles.calendarDayLabel];
              const numberStyle = [onboardingStyles.calendarDayNumber];

              if (logForDay) {
                pillStyle.push({ backgroundColor: logForDay.mood.colors[0], borderRadius: 8 });
                labelStyle.push({ color: '#fff' });
                numberStyle.push({ color: '#fff' });
              } else if (day.isToday && currentMood) {
                pillStyle.push({ backgroundColor: currentMood.colors[0], borderRadius: 8 });
                labelStyle.push({ color: '#fff' });
                numberStyle.push({ color: '#fff' });
              } else if (day.isToday) {
                pillStyle.push(onboardingStyles.calendarDayPillToday);
                labelStyle.push(onboardingStyles.calendarDayLabelToday);
              }

              return (
                <View key={day.key} style={onboardingStyles.calendarDay}>
                  <View style={pillStyle}>
                    <Text style={labelStyle}>{day.label}</Text>
                    <Text style={numberStyle}>{day.number}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View style={onboardingStyles.activitiesSection}>
          <Text style={onboardingStyles.activitiesHeading}>Activities</Text>
          <View style={onboardingStyles.activitiesList}>
            {activities.map((activity) => (
              <TouchableOpacity
                key={activity.key}
                activeOpacity={0.9}
                style={onboardingStyles.activityCard}
                onPress={() => {
                  if (activity.key === 'journal') {
                    navigation.navigate('JournalHome');
                  } else if (activity.key === 'breathing') {
                    navigation.navigate('CalmSounds');
                  } else if (activity.key === 'resources') {
                    navigation.navigate('Resources');
                  } else if (activity.key === 'crisis') {
                    navigation.navigate('CrisisSupport');
                  }
                }}
              >
                <View
                  style={[
                    onboardingStyles.activityIconWrapper,
                    { backgroundColor: activity.iconBg },
                  ]}
                >
                  <Image
                    source={activity.icon}
                    style={onboardingStyles.activityIcon}
                  />
                </View>
                <Text style={onboardingStyles.activityLabel}>{activity.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};


