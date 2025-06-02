import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F3E5F5', dark: '#4A148C' }}
      headerImage={
        <Ionicons
          name="person"
          size={310}
          color="#8E24AA"
          style={styles.headerIcon}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Profile</ThemedText>
        <ThemedText>Your account settings and preferences</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  headerIcon: {
    bottom: -90,
    left: -35,
    position: 'absolute',
    opacity: 0.7,
  },
});
