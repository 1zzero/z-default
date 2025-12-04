import { Image, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { onboardingStyles } from '../styles/onboardingStyles';

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

export const Dashboard = ({ navigation, route }) => {
  const name = route?.params?.name?.trim();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const weekDays = getCurrentWeekDays();

  const activities = [
    {
      key: 'journal',
      label: 'Journal',
      icon: require('../../images/journalIcon.png'),
      iconBg: '#ffb68a',
    },
    {
      key: 'breathing',
      label: 'Breathing Exercises',
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
            <View style={onboardingStyles.dashboardDateRow}>
              <Image
                source={require('../../images/calendarIcon.png')}
                style={onboardingStyles.calendarIcon}
              />
              <Text style={onboardingStyles.dashboardDateText}>{formattedDate}</Text>
            </View>
            <Image
              source={require('../../images/settingsIcon.png')}
              style={onboardingStyles.settingsIcon}
            />
          </View>

          <Text style={onboardingStyles.dashboardGreeting}>
            {name ? `Hi, ${name}!` : 'Hi, User!'}
          </Text>

          <View style={onboardingStyles.calendarStrip}>
            {weekDays.map((day) => (
              <View key={day.key} style={onboardingStyles.calendarDay}>
                <View
                  style={[
                    onboardingStyles.calendarDayPill,
                    day.isToday && onboardingStyles.calendarDayPillToday,
                  ]}
                >
                  <Text
                    style={[
                      onboardingStyles.calendarDayLabel,
                      day.isToday && onboardingStyles.calendarDayLabelToday,
                    ]}
                  >
                    {day.label}
                  </Text>
                  <Text style={onboardingStyles.calendarDayNumber}>{day.number}</Text>
                </View>
              </View>
            ))}
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


