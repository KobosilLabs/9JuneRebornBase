import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  Animated,
  Easing,
  Text,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { arcsData } from '@/data/habitsData';
import ArcTransition from './ArcTransition';
import ArcBanner from './ArcBanner';
import CurrentArcBanner from './CurrentArcBanner';
import NextArcBanner from './NextArcBanner';
import ArcPoint from './ArcPoint';

// Import the background image
const progressionBackground = require('@/assets/progressionbackground.png');

const { width, height } = Dimensions.get('window');

export default function ArcProgression() {
  // Current arc index (0-based) - this would typically come from your app state
  // For demo purposes, let's set it to the 3rd arc (index 2)
  const [currentArcIndex, setCurrentArcIndex] = useState(2);
  
  // State to control the transition animation
  const [showTransition, setShowTransition] = useState(false);
  const [transitionArc, setTransitionArc] = useState(arcsData[currentArcIndex]);
  
  // Function to handle arc selection/advancement
  const handleArcPress = (arcIndex: number) => {
    // Only allow advancing to the next arc (can't skip ahead)
    if (arcIndex === currentArcIndex + 1) {
      setTransitionArc(arcsData[arcIndex]);
      setShowTransition(true);
    }
  };
  
  // Function to handle transition completion
  const handleTransitionComplete = () => {
    setShowTransition(false);
    setCurrentArcIndex(prev => prev + 1);
  };
  
  // Helper function to determine arc state
  const getArcState = (arcIndex: number) => {
    if (arcIndex < currentArcIndex) return 'completed';
    if (arcIndex === currentArcIndex) return 'current';
    return 'upcoming';
  };
  
  // Animation values for the breathing effect
  const breathingAnim = new Animated.Value(1);
  const pulseAnim = new Animated.Value(1);
  
  // Start the breathing animation when component mounts
  useEffect(() => {
    // Breathing animation for glow - much slower
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathingAnim, {
          toValue: 1.3,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(breathingAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();
    
    // Pulse animation for scale - very slow and subtle
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);
  
  // Increase the number of intermediate points between arcs for more spacing
  // Now using 4 intermediate points between each arc instead of 2
  const intermediatePointsPerArc = 4;
  const totalArcs = 15;
  const totalIntermediatePoints = (totalArcs - 1) * intermediatePointsPerArc;
  const totalPoints = totalArcs + totalIntermediatePoints;
  
  // Determine which positions should show arc banners
  // With 4 intermediate points, arcs will be at positions 0, 5, 10, 15, etc.
  const arcPositions = Array.from({ length: totalArcs }, (_, i) => i * (intermediatePointsPerArc + 1));
  
  // Render a single point (arc or intermediate)
  const renderArcPoint = (index: number) => {
    const isArcPosition = arcPositions.includes(index);
    const arcIndex = arcPositions.indexOf(index);
    const arc = isArcPosition ? arcsData[arcIndex] : null;
    
    // Determine arc state for styling
    let arcState: 'completed' | 'current' | 'upcoming' = 'upcoming';
    if (isArcPosition) {
      arcState = getArcState(arcIndex) as 'completed' | 'current' | 'upcoming';
    } else if (index < arcPositions[currentArcIndex]) {
      // Intermediate points before current arc are also completed
      arcState = 'completed';
    } else if (index > arcPositions[currentArcIndex]) {
      // Intermediate points after current arc are upcoming
      arcState = 'upcoming';
    } else {
      // Intermediate points at current arc position
      arcState = 'current';
    }
    
    if (isArcPosition && arc) {
      // Create a properly typed arc object with all properties
      const arcWithTypedImage = {
        name: arc.name,
        imageUrl: arc.imageUrl as ImageSourcePropType
      };
      
      // Get mindset and goals from the arc data if available
      const mindset = arc.mindset;
      const goals = arc.goals;
      
      // Calculate day number for arc positions (each arc is 7 days apart)
      const dayNumber = (arcIndex + 1) * 7;
      
      // Render banner for arc positions based on state
      return (
        <View key={`arc-${index}`} style={styles.arcPointContainer}>
          {/* Add day indicator */}
          <View style={styles.dayIndicatorContainer}>
            <Text style={[styles.dayIndicatorText, 
              arcState === 'completed' ? styles.dayIndicatorCompleted : 
              arcState === 'current' ? styles.dayIndicatorCurrent : 
              styles.dayIndicatorUpcoming
            ]}>DAY {dayNumber}</Text>
          </View>
          {arcState === 'current' ? (
            // Current arc with animated effects and details shown
            <CurrentArcBanner 
              arc={arcWithTypedImage} 
              pulseAnim={pulseAnim} 
              breathingAnim={breathingAnim} 
              mindset={mindset}
              goals={goals}
              showDetails={true} // Show details for current arc
            />
          ) : arcState === 'completed' ? (
            // Completed arc banner
            <ArcBanner 
              arc={arcWithTypedImage} 
              state="completed" 
              mindset={mindset}
              goals={goals}
              showDetails={true} 
            />
          ) : arcIndex === currentArcIndex + 1 ? (
            // Next upcoming arc - clickable with details
            <NextArcBanner 
              arc={arcWithTypedImage} 
              onPress={() => handleArcPress(arcIndex)} 
              mindset={mindset}
              goals={goals}
              showDetails={true} // Show details for next arc
            />
          ) : (
            // Regular upcoming arc - not clickable
            <ArcBanner 
              arc={arcWithTypedImage} 
              state="upcoming" 
              mindset={mindset}
              goals={goals}
              showDetails={true} 
            />
          )}
        </View>
      );
    } else {
      // Calculate day number based on index
      // Each arc position represents 7 days, and intermediate points are evenly spaced
      const dayNumber = Math.max(1, Math.floor(index * 7 / (intermediatePointsPerArc + 1)));
      
      // Render simple node for intermediate positions
      return (
        <View key={`point-${index}`} style={styles.intermediatePointContainer}>
          <ArcPoint state={arcState} isArcPosition={false} />
          {/* Add day indicator */}
          <View style={styles.dayIndicatorContainer}>
            <Text style={[styles.dayIndicatorText, 
              arcState === 'completed' ? styles.dayIndicatorCompleted : 
              arcState === 'current' ? styles.dayIndicatorCurrent : 
              styles.dayIndicatorUpcoming
            ]}>DAY {dayNumber}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <ImageBackground 
      source={progressionBackground}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Container for line and arc points */}
        <View style={styles.contentContainer}>
          {/* Vertical Line with Dynamic Gradient */}
          <View style={styles.verticalLineContainer}>
            {/* Top cap for the line */}
            <View style={styles.lineCap}>
              <View style={[styles.lineCapInner, { backgroundColor: '#2A2A2A' }]} />
            </View>
            
            {/* Main vertical line with gradient */}
            <LinearGradient
              colors={['#2A2A2A', '#7A00F3', '#FF003C', '#00FFD1']}
              locations={[0, 0.3, 0.6, 1]}
              style={styles.verticalLine}
              start={{x: 0, y: 0}} // top
              end={{x: 0, y: 1}}   // bottom
            />
            
            {/* Bottom cap for the line with REBORN label */}
            <View style={[styles.lineCap, { bottom: 0 }]}>
              <View style={[styles.lineCapInner, { backgroundColor: '#00FFD1' }]} />
              
            </View>
          </View>
          
          {/* Spacer at the top */}
          <View style={styles.progressionPadding} />
          
          {/* Render all points (15 arcs + intermediate points) in reverse order to start from bottom */}
          {Array.from({ length: totalPoints }, (_, i) => renderArcPoint(totalPoints - i - 1))}
          
          {/* Spacer at the bottom */}
          <View style={styles.progressionPadding} />
      
        </View>
      </ScrollView>
      
      {/* Arc Transition Animation */}
      {showTransition && (
        <ArcTransition 
          arcName={transitionArc.name}
          arcImage={transitionArc.imageUrl as ImageSourcePropType}
          onAnimationComplete={handleTransitionComplete}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  progressionPadding: {
    height: 60, // Add 60 pixels of padding at top and bottom
    width: '100%',
  },
  backgroundImage: {
    opacity: 0.8,
    resizeMode: 'cover',
  },
  contentContainer: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    width: width,
  },
 
  verticalLineContainer: {
    position: 'absolute',
    width: 4, // Slightly thicker line
    height: 'auto', // Changed from 100% to auto for custom sizing
    zIndex: 1,
    left: '50%',
    marginLeft: -2, // Half of the width to center it
    top: 60, // Start after the top padding
    bottom: 100, // End before the bottom padding
  },
  verticalLine: {
    width: '100%',
    height: '100%',
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9, // Increased opacity
    shadowRadius: 12, // Increased glow
    elevation: 3, // Increased elevation
  },
  // Line cap styles for top and bottom of the vertical line
  lineCap: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    left: -4, // Center it on the line
    top: -6, // Position it at the top
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  lineCapInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 4,
  },
  // Reborn label styles
  rebornLabelContainer: {
    position: 'absolute',
    bottom: -30,
    right: -40,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#00FFD1',
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 8,
    zIndex: 10,
    width: 120,
    alignItems: 'center',
  },
  // Curved lines container and styles
  curvedLinesContainer: {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    right: 0,
    height: 50,
    overflow: 'visible',
  },
  curvedLine: {
    position: 'absolute',
    bottom: 0,
    width: 3,
    borderRadius: 10,
    backgroundColor: '#00FFD1',
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  rebornLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00FFD1',
    letterSpacing: 2,
    textShadowColor: '#00FFD1',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  arcPointContainer: {
    width: width,
    height: 220, // Increased height for arc points with banners including mindset and goals
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  // Day indicator styles
  dayIndicatorContainer: {
    position: 'absolute',
    right: 30, // Position to the right side of the screen
    top: '50%', // Center vertically
    transform: [{ translateY: -12 }], // Adjust for half the height
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    borderWidth: 1,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20, // Higher zIndex to ensure visibility
  },
  dayIndicatorText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  dayIndicatorCompleted: {
    color: '#00FFD1', // Cyan for completed
    borderColor: '#00FFD1',
    textShadowColor: '#00FFD1',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  dayIndicatorCurrent: {
    color: '#FF003C', // Red for current
    borderColor: '#FF003C',
    textShadowColor: '#FF003C',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  dayIndicatorUpcoming: {
    color: '#F5F5F5', // White for upcoming
    borderColor: 'rgba(245, 245, 245, 0.3)',
    opacity: 0.6,
  },
  intermediatePointContainer: {
    width: width,
    height: 50, // Slightly taller height for intermediate points
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20, // Increased vertical margin for better spacing
    zIndex: 5,
  },
  nodeContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    // Ensure the node is centered on the line
    position: 'absolute',
  },
  // Completed arc node styles - Neon Cyan
  nodeCompleted: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00FFD1', // Neon Cyan
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  innerNodeCompleted: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FFD1', // Neon Cyan
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 7,
  },
  
  // Current arc node styles - Neon Red
  nodeCurrent: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF003C', // Neon Red
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  innerNodeCurrent: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF003C', // Neon Red
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 7,
  },
  
  // Upcoming arc node styles - Cool White with low opacity
  nodeUpcoming: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(245, 245, 245, 0.3)', // Cool White with low opacity
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  innerNodeUpcoming: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(245, 245, 245, 0.3)', // Cool White with low opacity
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  // Completed node styles - Neon Cyan
  smallNodeCompleted: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#00FFD1', // Neon Cyan
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
  smallInnerNodeCompleted: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FFD1', // Neon Cyan
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  // Current node styles - Neon Red
  smallNodeCurrent: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF003C', // Neon Red
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
  smallInnerNodeCurrent: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF003C', // Neon Red
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  
  // Upcoming node styles - Cool White with low opacity
  smallNodeUpcoming: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.3)', // Cool White with low opacity
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  smallInnerNodeUpcoming: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(245, 245, 245, 0.3)', // Cool White with low opacity
    shadowColor: '#F5F5F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  bannerContainer: {
    width: width * 0.8,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 100, // Much higher z-index than the line
    // Center the banner on the line
    alignSelf: 'center',
    // Make sure the banner has a hole in the middle for the line to pass through
    borderWidth: 2,
    borderColor: '#7A00F3',
    shadowColor: '#7A00F3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 20, // Higher elevation than the line
  },
  currentBannerContainer: {
    borderColor: '#FF4E4E',
    borderWidth: 3,
    shadowColor: '#FF4E4E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 25,
  },
  currentArcBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF4E4E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 110,
  },
  currentArcBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImageStyle: {
    borderRadius: 10,
  },
  bannerOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arcName: {
    fontFamily: 'Rajdhani-Bold',
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(122, 0, 243, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  nextArcText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: 10,
  },
});
