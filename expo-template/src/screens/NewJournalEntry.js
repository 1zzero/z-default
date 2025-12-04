import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { onboardingStyles } from '../styles/onboardingStyles';
import { useJournal } from '../contexts/JournalContext';

export const NewJournalEntry = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addEntry } = useJournal();

  const handleCreateJournal = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    // Create new entry
    const newEntry = {
      id: Date.now(),
      title: title,
      content: content,
      date: new Date().toLocaleDateString(),
      preview: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
    };

    // Save entry to context and navigate back
    addEntry(newEntry);
    navigation.goBack();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView
        contentContainerStyle={onboardingStyles.newJournalScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <View style={onboardingStyles.newJournalTopRow}>
          <TouchableOpacity
            style={onboardingStyles.journalBackButton}
            activeOpacity={0.7}
            onPress={handleGoBack}
          >
            <Image
              source={require('../../images/backIcon.png')}
              style={onboardingStyles.journalBackIcon}
            />
          </TouchableOpacity>
          <Text style={onboardingStyles.newJournalTitle}>New Journal Entry</Text>
        </View>

        {/* Journal Title Section */}
        <View style={onboardingStyles.newJournalSection}>
          <Text style={onboardingStyles.newJournalLabel}>Journal Title</Text>
          <View style={onboardingStyles.newJournalTitleInputContainer}>
            <Image
              source={require('../../images/journalIcon.png')}
              style={onboardingStyles.newJournalTitleIcon}
            />
            <TextInput
              style={onboardingStyles.newJournalTitleInput}
              placeholder="Feeling Bad Again"
              placeholderTextColor="#ccc"
              value={title}
              onChangeText={setTitle}
            />
            <TouchableOpacity>
              <Image
                source={require('../../images/pencilIcon.png')}
                style={onboardingStyles.newJournalEditIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Write Your Entry Section */}
        <View style={onboardingStyles.newJournalSection}>
          <Text style={onboardingStyles.newJournalLabel}>Write Your Entry</Text>
          <View style={onboardingStyles.newJournalTextContainer}>
            <TextInput
              style={onboardingStyles.newJournalTextInput}
              placeholder="I had a bad day today, at school... It's fine I guess..."
              placeholderTextColor="#d0d0d0"
              multiline={true}
              numberOfLines={8}
              value={content}
              onChangeText={setContent}
              maxLength={300}
            />
            <View style={onboardingStyles.newJournalFooter}>
              <Text style={onboardingStyles.newJournalCharCount}>{content.length}/300</Text>
            </View>
          </View>
        </View>

        {/* Create Button */}
        <TouchableOpacity
          style={onboardingStyles.newJournalCreateButton}
          activeOpacity={0.7}
          onPress={handleCreateJournal}
        >
          <Text style={onboardingStyles.newJournalCreateButtonText}>Create Journal</Text>
          <Image
            source={require('../../images/checkIcon.png')}
            style={onboardingStyles.newJournalCreateCheckmark}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
