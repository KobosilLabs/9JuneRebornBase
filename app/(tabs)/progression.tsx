import React from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';
import ArcProgression from '@/components/ArcProgression';

export default function ProgressionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ArcProgression />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
});
