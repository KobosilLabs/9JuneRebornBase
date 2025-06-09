import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ArcBannerProps {
  arc: {
    name: string;
    imageUrl: ImageSourcePropType;
  };
  state: 'completed' | 'current' | 'upcoming';
  // Optional explore button
  showExploreButton?: boolean;
  onExplorePress?: () => void;
  // Mindset and goals sections
  mindset?: string;
  goals?: string[];
  showDetails?: boolean; // Controls whether to show mindset and goals
}

const ArcBanner = ({ arc, state, showExploreButton, onExplorePress, mindset, goals, showDetails = false }: ArcBannerProps) => {

  // Determine colors based on state
  const getBorderColor = () => {
    switch (state) {
      case 'completed': return '#00FFD1'; // Neon Cyan
      case 'current': return '#FF003C'; // Neon Red
      case 'upcoming': return 'rgba(255, 255, 255, 0.1)'; // Subtle white border
    }
  };
  
  const getShadowColor = () => {
    switch (state) {
      case 'completed': return '#00FFD1'; // Neon Cyan
      case 'current': return '#FF003C'; // Neon Red
      case 'upcoming': return '#000000'; // Black shadow for upcoming
    }
  };
  
  const getShadowOpacity = () => {
    switch (state) {
      case 'completed': return 0.8;
      case 'current': return 1;
      case 'upcoming': return 0.5; // More visible shadow
    }
  };
  
  // Get tagline color based on state
  const getTaglineColor = () => {
    switch (state) {
      case 'completed': return '#00FFD1'; // Neon Cyan
      case 'current': return '#FF4E4E'; // Soft Red
      case 'upcoming': return 'rgba(245, 245, 245, 0.5)'; // Muted white
    }
  };
  
  // Define explicit gradient colors for each state - using left to right gradient
  const completedColors = ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.3)'] as const;
  const currentColors = ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)'] as const;
  const upcomingColors = ['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.4)'] as const;
  
  const getTextColor = () => {
    return state === 'upcoming' ? 'rgba(245, 245, 245, 0.7)' : '#F5F5F5';
  };
  
  // Format the arc name to get the type
  const getArcType = () => {
    const nameParts = arc.name.split(' ');
    return nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'ARC';
  };
  
  // Calculate the container height based on whether details are shown
  const containerHeight = showDetails ? (goals && goals.length > 0 ? 220 : 180) : 100;
  
  return (
    <View 
      style={[
        styles.bannerContainer, 
        { 
          borderColor: getBorderColor(),
          shadowColor: getShadowColor(),
          shadowOpacity: getShadowOpacity(),
          height: containerHeight, // Dynamic height based on content
        }
      ]}
    >
      {/* Clip corners using absolute positioned elements */}
      <View style={styles.topLeftClip} />
      <View style={styles.bottomRightClip} />
      
      <ImageBackground
        source={arc.imageUrl}
        style={styles.bannerImage}
        imageStyle={[styles.bannerImageStyle]} // Darkened background
      >
        <LinearGradient
          colors={state === 'completed' ? completedColors : 
                 state === 'current' ? currentColors : 
                 upcomingColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bannerOverlay}
        >
          {/* Top tagline */}
          <Text style={[styles.arcTagline, { color: getTaglineColor() }]}>
            /// {getArcType()}
          </Text>
          
          {/* Main title */}
          <Text style={[styles.arcName, { color: getTextColor() }]}>
            {arc.name.replace(' ARC', '')}
          </Text>
          
          {/* Optional explore button */}
          {showExploreButton && (
            <View style={styles.exploreButtonContainer}>
              <TouchableOpacity 
                style={[styles.exploreButton, { backgroundColor: state === 'current' ? '#FF003C' : 'rgba(255,255,255,0.15)' }]}
                onPress={onExplorePress}
              >
                <Text style={styles.exploreButtonText}>ENTER →</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Mindset and Goals sections - only shown if showDetails is true */}
          {showDetails && (
            <View style={styles.detailsContainer}>
              {/* Divider line with tech effect */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <View style={styles.dividerDot} />
                <View style={[styles.dividerDot, {left: '25%'}]} />
                <View style={[styles.dividerDot, {left: '75%'}]} />
                <View style={[styles.dividerDot, {right: 0}]} />
              </View>
              
              {/* Mindset section */}
              {mindset && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>
                    <Text style={{color: getTaglineColor()}}>// </Text>
                    MINDSET
                  </Text>
                  <View style={styles.mindsetContainer}>
                    <Text style={styles.mindsetText}>{mindset}</Text>
                  </View>
                </View>
              )}
              
              {/* Goals section */}
              {goals && goals.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>
                    <Text style={{color: getTaglineColor()}}>// </Text>
                    GOALS
                  </Text>
                  <View style={styles.goalsContainer}>
                    {goals.map((goal, index) => (
                      <View key={index} style={styles.goalItem}>
                        <Text style={styles.goalBullet}>▶</Text>
                        <Text style={styles.goalText}>{goal}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: width * 0.9, // Wider banner
    height: 100, // Taller banner (will be overridden when details are shown)
    borderRadius: 4, // Subtle border radius
    overflow: 'hidden',
    zIndex: 2,
    alignSelf: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 30,
    elevation: 10,
    position: 'relative', // For positioning clip corners
    marginVertical: 5,
  },
  // Angular cut corners
  topLeftClip: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 20,
    borderRightColor: 'transparent',
    borderBottomWidth: 20,
    borderBottomColor: 'transparent',
    zIndex: 10,
  },
  bottomRightClip: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderLeftColor: 'transparent',
    borderTopWidth: 20,
    borderTopColor: 'transparent',
    zIndex: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  bannerImageStyle: {
    borderRadius: 4,
  },
  bannerOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
  },
  // Top tagline styling
  arcTagline: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 4,
    fontWeight: '500',
  },
  // Main title styling
  arcName: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 1,
  },
  // Explore button container
  exploreButtonContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  // Explore button styling
  exploreButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  // Explore button text
  exploreButtonText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  // Details container (for mindset and goals)
  detailsContainer: {
    width: '100%',
    marginTop: 10,
  },
  // Divider with tech effect
  dividerContainer: {
    width: '100%',
    height: 2,
    marginVertical: 8,
    position: 'relative',
  },
  dividerLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'absolute',
    top: 0,
  },
  dividerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    top: -1.5,
    left: 0,
  },
  // Section styling
  sectionContainer: {
    marginVertical: 6,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 1,
  },
  // Mindset section
  mindsetContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 2,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(255,255,255,0.2)',
  },
  mindsetText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 16,
  },
  // Goals section
  goalsContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 2,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(255,255,255,0.2)',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  goalBullet: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 8,
    marginRight: 6,
  },
  goalText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    flex: 1,
  },
});

export default ArcBanner;
