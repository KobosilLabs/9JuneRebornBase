import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';

interface ArcPointProps {
  state: 'completed' | 'current' | 'upcoming';
  isArcPosition: boolean;
  day?: number; // Optional day number to display
}

const ArcPoint = ({ state, isArcPosition, day }: ArcPointProps) => {
  // Render the appropriate node based on state and position type
  if (isArcPosition) {
    // Render arc node (larger)
    switch (state) {
      case 'completed':
        return (
          <View style={styles.nodeContainer}>
            <View style={styles.nodeCompleted}>
              <View style={styles.innerNodeCompleted} />
            </View>
            {day !== undefined && (
              <View style={[styles.dayContainer, {borderColor: '#00FFD1'}]}>
                <Text style={styles.dayTextCompleted}>DAY {day}</Text>
              </View>
            )}
          </View>
        );
      case 'current':
        return (
          <View style={styles.nodeContainer}>
            <View style={styles.nodeCurrent}>
              <View style={styles.innerNodeCurrent} />
            </View>
            {day !== undefined && (
              <View style={[styles.dayContainer, {borderColor: '#FF003C'}]}>
                <Text style={styles.dayTextCurrent}>DAY {day}</Text>
              </View>
            )}
          </View>
        );
      case 'upcoming':
        return (
          <View style={styles.nodeContainer}>
            <View style={styles.nodeUpcoming}>
              <View style={styles.innerNodeUpcoming} />
            </View>
            {day !== undefined && (
              <View style={[styles.dayContainer, {borderColor: 'rgba(245, 245, 245, 0.3)'}]}>
                <Text style={styles.dayTextUpcoming}>DAY {day}</Text>
              </View>
            )}
          </View>
        );
    }
  } else {
    // Render intermediate node (smaller)
    switch (state) {
      case 'completed':
        return (
          <View style={styles.nodeContainer}>
            <View style={styles.smallNodeCompleted}>
              <View style={styles.smallInnerNodeCompleted} />
            </View>
          </View>
        );
      case 'current':
        return (
          <View style={styles.nodeContainer}>
            <View style={styles.smallNodeCurrent}>
              <View style={styles.smallInnerNodeCurrent} />
            </View>
          </View>
        );
      case 'upcoming':
        return (
          <View style={styles.nodeContainer}>
            <View style={styles.smallNodeUpcoming}>
              <View style={styles.smallInnerNodeUpcoming} />
            </View>
          </View>
        );
    }
  }
};

const styles = StyleSheet.create({  
  // Day indicator styles
  dayContainer: {
    position: 'absolute',
    right: -55,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    minWidth: 50,
    alignItems: 'center',
  },
  dayTextCompleted: {
    color: '#00FFD1', // Cyan for completed
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    letterSpacing: 1,
    textShadowColor: '#00FFD1',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  dayTextCurrent: {
    color: '#FF003C', // Red for current
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    letterSpacing: 1,
    textShadowColor: '#FF003C',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  dayTextUpcoming: {
    color: '#F5F5F5', // White for upcoming
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    letterSpacing: 1,
    opacity: 0.6,
  },
  nodeContainer: {
    width: 30, // Slightly larger container for better visibility
    height: 30, // Slightly larger container for better visibility
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    position: 'absolute',
  },
  // Completed arc node styles - Neon Cyan
  nodeCompleted: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00FFD1', // Neon Cyan
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  innerNodeCompleted: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00FFD1', // Neon Cyan
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 9,
  },
  
  // Current arc node styles - Neon Red
  nodeCurrent: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF003C', // Neon Red
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 10,
  },
  innerNodeCurrent: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FF003C', // Neon Red
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 11,
  },
  
  // Upcoming arc node styles - Cool White with low opacity
  nodeUpcoming: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(245, 245, 245, 0.3)', // Cool White with low opacity
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  innerNodeUpcoming: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(245, 245, 245, 0.15)', // Cool White with low opacity
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  
  // Small node styles for intermediate points - Completed
  smallNodeCompleted: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#00FFD1', // Neon Cyan
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
    elevation: 5,
  },
  smallInnerNodeCompleted: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#00FFD1', // Neon Cyan
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 9,
    elevation: 6,
  },
  
  // Current node styles - Neon Red
  smallNodeCurrent: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FF003C', // Neon Red
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 5,
  },
  smallInnerNodeCurrent: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#FF003C', // Neon Red
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
  
  // Upcoming node styles - Cool White with low opacity
  smallNodeUpcoming: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(245, 245, 245, 0.3)', // Cool White with low opacity
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  smallInnerNodeUpcoming: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: 'rgba(245, 245, 245, 0.15)', // Cool White with low opacity
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default ArcPoint;
