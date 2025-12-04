import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { onboardingStyles } from '../styles/onboardingStyles';
import { useJournal } from '../contexts/JournalContext';

export const JournalDetail = ({ navigation, route }) => {
  const { entry } = route.params;
  const { deleteEntry } = useJournal();

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteEntry(entry.id);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView
        contentContainerStyle={onboardingStyles.journalDetailScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={onboardingStyles.journalDetailTopRow}>
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
          <TouchableOpacity
            style={onboardingStyles.journalDetailDeleteButton}
            activeOpacity={0.7}
            onPress={handleDelete}
          >
            <Image
              source={require('../../images/trashcanIcon.png')}
              style={onboardingStyles.journalDetailDeleteIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Title and Date */}
        <View style={onboardingStyles.journalDetailHeader}>
          <Text style={onboardingStyles.journalDetailTitle}>{entry.title}</Text>
          <Text style={onboardingStyles.journalDetailDate}>{entry.date}</Text>
        </View>

        {/* Content */}
        <View style={onboardingStyles.journalDetailContent}>
          <Text style={onboardingStyles.journalDetailBody}>{entry.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
