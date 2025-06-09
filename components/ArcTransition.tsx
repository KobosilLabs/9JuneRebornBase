import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Easing,
  Dimensions,
  ImageBackground,
  ImageSourcePropType
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ArcTransitionProps {
  arcName: string;
  arcImage: ImageSourcePropType;
  onAnimationComplete: () => void;
}

const ArcTransition = ({ arcName, arcImage, onAnimationComplete }: ArcTransitionProps) => {
  // Animation values
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  
  // Typewriter effect state
  const [displayedText, setDisplayedText] = useState('');
  const [textComplete, setTextComplete] = useState(false);
  
  // Start slide-in animation when component mounts
  useEffect(() => {
    // Slide in with bounce effect
    Animated.sequence([
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      // Small bounce
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.elastic(2),
        useNativeDriver: true,
      })
    ]).start();
    
    // Start typewriter effect after slide-in
    let charIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (charIndex <= arcName.length) {
        setDisplayedText(arcName.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typewriterInterval);
        setTextComplete(true);
        
        // Wait a bit and then call onAnimationComplete
        setTimeout(() => {
          onAnimationComplete();
        }, 1500);
      }
    }, 100); // Adjust speed of typewriter effect
    
    return () => clearInterval(typewriterInterval);
  }, []);
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.bannerContainer, 
          { 
            transform: [
              { translateX: slideAnim },
              { scale: Animated.add(1, Animated.multiply(bounceAnim, 0.05)) }
            ] 
          }
        ]}
      >
        <ImageBackground
          source={arcImage}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageStyle}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.8)', 'rgba(255, 0, 60, 0.4)', 'rgba(0,0,0,0.8)']}
            style={styles.bannerOverlay}
          >
            <Text style={styles.arcNamePrefix}>ENTERING</Text>
            <Text style={styles.arcName}>{displayedText}</Text>
            {textComplete && (
              <Animated.View 
                style={[
                  styles.continuePrompt,
                  {
                    opacity: bounceAnim
                  }
                ]}
              >
                <Text style={styles.continueText}>TAP TO CONTINUE</Text>
              </Animated.View>
            )}
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
  },
  bannerContainer: {
    width: width * 0.9,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FF003C',
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 25,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImageStyle: {
    borderRadius: 12,
  },
  bannerOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  arcNamePrefix: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 2,
  },
  arcName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: '#FF003C',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  continuePrompt: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
  },
  continueText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    letterSpacing: 1,
  }
});

export default ArcTransition;
