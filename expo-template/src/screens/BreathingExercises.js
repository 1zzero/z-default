import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Audio } from 'expo-av';
import {LinearGradient} from 'expo-linear-gradient';
import { onboardingStyles } from '../styles/onboardingStyles';
import BottomNav from '../components/BottomNav';

export const BreathingExercises = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sound, setSound] = useState(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const pulseLoopRef = useRef(null);

  const [barWidth, setBarWidth] = useState(0);
  const barWidthRef = useRef(0);

  // Load audio and listen for status updates
  useEffect(() => {
    let mounted = true;
    let createdSound = null;

    const load = async () => {
      try {
        const { sound: audioSound, status } = await Audio.Sound.createAsync(
          require('../../sounds/light-rain-109591.mp3'),
          { shouldPlay: false }
        );

        if (mounted && status) {
          setDuration(status.durationMillis || 0);
          setCurrentTime(status.positionMillis || 0);
        }

        audioSound.setOnPlaybackStatusUpdate((playbackStatus) => {
          if (!playbackStatus) return;
          if (playbackStatus.isLoaded) {
            setCurrentTime(playbackStatus.positionMillis || 0);
            setDuration(playbackStatus.durationMillis || 0);
            setIsPlaying(Boolean(playbackStatus.isPlaying));
          }
        });

        createdSound = audioSound;
        if (mounted) setSound(audioSound);
      } catch (e) {
        console.error('Error loading audio', e);
      }
    };

    load();

    return () => {
      mounted = false;
      if (createdSound) {
        try {
          createdSound.unloadAsync();
        } catch (e) {}
      }
    };
  }, []);

  // Stop/reset audio when leaving the screen
  useEffect(() => {
    const unsub = navigation.addListener('blur', async () => {
      if (sound) {
        try {
          await sound.stopAsync();
          await sound.setPositionAsync(0);
        } catch (e) {
          /* ignore */
        }
        setIsPlaying(false);
        setCurrentTime(0);
      }
      if (pulseLoopRef.current) {
        try {
          pulseLoopRef.current.stop();
        } catch (e) {}
        pulseLoopRef.current = null;
      }
    });

    return unsub;
  }, [navigation, sound]);

  // Pulse animation loop when playing
  useEffect(() => {
    if (isPlaying) {
      if (pulseLoopRef.current) {
        try {
          pulseLoopRef.current.stop();
        } catch (e) {}
        pulseLoopRef.current = null;
      }

      const up = Animated.timing(scaleAnim, {
        toValue: 1.12,
        duration: 900,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      });
      const down = Animated.timing(scaleAnim, {
        toValue: 1.0,
        duration: 900,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      });

      pulseLoopRef.current = Animated.loop(Animated.sequence([up, down]));
      pulseLoopRef.current.start();
    } else {
      if (pulseLoopRef.current) {
        try {
          pulseLoopRef.current.stop();
        } catch (e) {}
        pulseLoopRef.current = null;
      }
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (pulseLoopRef.current) {
        try {
          pulseLoopRef.current.stop();
        } catch (e) {}
        pulseLoopRef.current = null;
      }
    };
  }, [isPlaying, scaleAnim]);

  const handlePlayPause = async () => {
    if (!sound) return;
    try {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (e) {
      console.error('play/pause error', e);
    }
  };

  const handleRewind = async () => {
    if (!sound) return;
    const newPosition = Math.max(0, currentTime - 5000);
    try {
      await sound.setPositionAsync(newPosition);
      setCurrentTime(newPosition);
    } catch (e) {}
  };

  const handleForward = async () => {
    if (!sound) return;
    const newPosition = Math.min(duration || 0, currentTime + 5000);
    try {
      await sound.setPositionAsync(newPosition);
      setCurrentTime(newPosition);
    } catch (e) {}
  };

  const formatTime = (millis) => {
    const totalSeconds = Math.floor((millis || 0) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={onboardingStyles.dashboardRoot}>
      <ScrollView contentContainerStyle={onboardingStyles.breathingScrollContent} showsVerticalScrollIndicator={false}>
        <View style={onboardingStyles.breathingTopRow}>
          <TouchableOpacity style={onboardingStyles.journalBackButton} activeOpacity={0.7} onPress={() => navigation.goBack()}>
            <Image source={require('../../images/backIcon.png')} style={onboardingStyles.journalBackIcon} />
          </TouchableOpacity>
        </View>

        <Text style={onboardingStyles.breathingTitle}>Rain Sounds</Text>

        <View style={onboardingStyles.breathingCircleContainer}>
          <LinearGradient colors={["#f4e8c1", "#f0d98c", "#e8c547"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={onboardingStyles.breathingGradientBase}>
            <Animated.View style={[onboardingStyles.breathingAnimatedCircle, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
              <LinearGradient colors={["#ffd89b", "#ffb347", "#ff9500"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: '100%', height: '100%', borderRadius: 100 }} />
            </Animated.View>
          </LinearGradient>
        </View>

        <View style={onboardingStyles.breathingTimeRow}>
          <Text style={onboardingStyles.breathingTime}>{formatTime(currentTime)}</Text>
          <Text style={onboardingStyles.breathingTime}>{formatTime(duration)}</Text>
        </View>

        {/* Seek Bar */}
        <View
          style={onboardingStyles.breathingSeekContainer}
          onLayout={(e) => {
            const w = e.nativeEvent.layout.width;
            setBarWidth(w);
            barWidthRef.current = w;
          }}
        >
          <View style={onboardingStyles.breathingSeekTouchable}>
            <View style={onboardingStyles.breathingSeekTrack}>
              <View
                style={[
                  onboardingStyles.breathingSeekProgress,
                  {
                    width: barWidth ? `${(duration ? (currentTime / duration) : 0) * 100}%` : '0%',
                  },
                ]}
              />
              <View
                style={[
                  onboardingStyles.breathingSeekThumb,
                  {
                    left: barWidth ? (Math.max(0, Math.min(1, (duration ? currentTime / duration : 0))) * barWidth) - 8 : -8,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={onboardingStyles.breathingControls}>
          <TouchableOpacity onPress={handleRewind} activeOpacity={0.7}>
            <Image source={require('../../images/previewIcon.png')} style={onboardingStyles.breathingControlIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={onboardingStyles.breathingPlayButton} onPress={handlePlayPause} activeOpacity={0.8}>
            {isPlaying ? <Image source={require('../../images/pauseIcon.png')} style={onboardingStyles.breathingPlayImage} /> : <Text style={onboardingStyles.breathingPlayIcon}>▶</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForward} activeOpacity={0.7}>
            <Image source={require('../../images/forwardIcon.png')} style={onboardingStyles.breathingControlIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};
