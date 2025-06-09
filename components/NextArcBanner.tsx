import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface NextArcBannerProps {
  arc: {
    name: string;
    imageUrl: ImageSourcePropType;
  };
  onPress: () => void;
  // Mindset and goals sections
  mindset?: string;
  goals?: string[];
  showDetails?: boolean; // Controls whether to show mindset and goals
}

const NextArcBanner = ({ arc, onPress, mindset, goals, showDetails = false }: NextArcBannerProps) => {
  // Format the arc name to get the type
  const getArcType = () => {
    const nameParts = arc.name.split(' ');
    return nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'ARC';
  };
  
  // Calculate the container height based on whether details are shown
  const containerHeight = showDetails ? (goals && goals.length > 0 ? 220 : 180) : 100;
  
  return (
    <TouchableOpacity 
      style={[styles.bannerContainer, { height: containerHeight }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Clip corners using absolute positioned elements */}
      <View style={styles.topLeftClip} />
      <View style={styles.bottomRightClip} />
      
      {/* Next Arc Badge */}
      <View style={styles.nextArcBadge}>
        <Text style={styles.nextArcBadgeText}>NEXT ARC</Text>
      </View>
      
      <ImageBackground
        source={arc.imageUrl}
        style={styles.bannerImage}
        imageStyle={[styles.bannerImageStyle]} // Darkened background
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)']} // Left to right gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bannerOverlay}
        >
          {/* Top tagline */}
          <Text style={styles.arcTagline}>
            /// {getArcType()}
          </Text>
          
          {/* Main title */}
          <Text style={styles.arcName}>
            {arc.name.replace(' ARC', '')}
          </Text>
          
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
                    <Text style={{color: '#00FFFF'}}>// </Text>
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
                    <Text style={{color: '#00FFFF'}}>// </Text>
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
          
          {/* Next arc prompt */}
          <View style={styles.nextArcPromptContainer}>
            <Text style={styles.nextArcText}>TAP TO ADVANCE</Text>
            <View style={styles.arrowIndicator}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: width * 0.9, // Wider banner
    height: 100, // Taller banner
    borderRadius: 4, // Subtle border radius
    overflow: 'hidden',
    zIndex: 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#00FFFF', // Neon Cyan
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
    elevation: 15,
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
  // Next Arc Badge
  nextArcBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#00FFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2, // More angular
    zIndex: 110,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  nextArcBadgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
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
    color: '#00FFFF', // Cyan
  },
  // Main title styling
  arcName: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'left',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 255, 255, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
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
    backgroundColor: 'rgba(0,255,255,0.5)',
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
    borderLeftColor: 'rgba(0,255,255,0.2)',
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
    borderLeftColor: 'rgba(0,255,255,0.2)',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  goalBullet: {
    color: 'rgba(0,255,255,0.6)',
    fontSize: 8,
    marginRight: 6,
  },
  goalText: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    flex: 1,
  },
  // Next arc prompt
  nextArcPromptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  nextArcText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 10,
    color: '#00FFFF',
    marginRight: 5,
  },
  arrowIndicator: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  // Arrow text
  arrowText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default NextArcBanner;
