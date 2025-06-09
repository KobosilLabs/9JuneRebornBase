import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  ImageBackground,
  Platform
} from 'react-native';
import { Clock, Flame, ChevronRight, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface HabitCardProps {
  id: string;
  name: string;
  category: 'training' | 'meditation' | 'diet' | 'reading' | 'other';
  completed: boolean;
  progress: number;
  streak: number;
  onToggle: (id: string) => void;
}

const { width } = Dimensions.get('window');

export default function HabitCard({
  id,
  name,
  category,
  completed,
  progress,
  streak,
  onToggle
}: HabitCardProps) {
  // Animation values
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Progress animation
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    
    // Pulse animation for the glow effects
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        })
      ])
    ).start();
    
    // Subtle scale animation on mount
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.02,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
  }, [progress]);
  
  // Get habit description based on category
  const getHabitDescription = () => {
    switch (category) {
      case 'training':
        return 'Train for 45 minutes today';
      case 'meditation':
        return 'Meditate for 20 minutes today';
      case 'diet':
        return 'Stick to your meal plan today';
      case 'reading':
        return 'Read for 45 minutes today';
      default:
        return 'Complete your daily habit';
    }
  };
  
  // Calculate progress percentage for display
  const progressPercent = Math.round(progress * 100);
  
  // Determine colors based on completion status
  const primaryColor = completed ? '#00FF66' : '#FF003C';
  const secondaryColor = completed ? 'rgba(0, 255, 102, 0.15)' : 'rgba(255, 0, 60, 0.15)';
  
  // Animated values for glow effects
  const glowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8]
  });
  
  const glowRadius = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 8]
  });
  
  // Progress bar width animation
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });
  
  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <ImageBackground
        source={require('../assets/actimages/act3.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        {/* Glass effect overlay */}
        <BlurView intensity={30} style={styles.blurContainer}>
          {/* Hexagonal pattern overlay */}
          <View style={styles.hexPattern} />
          
          {/* Card header with category and completion status */}
          <View style={styles.header}>
            <View style={styles.categoryContainer}>
              <View style={[styles.categoryIndicator, { backgroundColor: primaryColor }]} />
              <Text style={styles.categoryText}>{category.toUpperCase()}</Text>
            </View>
            
            <View style={styles.statusContainer}>
              <Animated.View 
                style={[styles.statusIndicator, { 
                  backgroundColor: primaryColor,
                  shadowColor: primaryColor,
                  shadowOpacity: glowOpacity,
                  shadowRadius: glowRadius
                }]} 
              />
              <Text style={styles.statusText}>{completed ? 'COMPLETE' : 'PENDING'}</Text>
            </View>
          </View>
          
          {/* Main content */}
          <View style={styles.content}>
            {/* Habit name */}
            <Text style={styles.nameText}>{name.toUpperCase()}</Text>
            
            {/* Habit description */}
            <Text style={styles.descriptionText}>{getHabitDescription()}</Text>
            
            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBackground}>
                <Animated.View 
                  style={[styles.progressFill, { 
                    width: progressWidth, 
                    backgroundColor: primaryColor,
                    shadowColor: primaryColor,
                    shadowOpacity: glowOpacity,
                    shadowRadius: glowRadius
                  }]} 
                />
              </View>
              <Text style={styles.progressText}>{progressPercent}%</Text>
            </View>
            
            {/* Stats section */}
            <View style={styles.statsContainer}>
              <View style={[styles.statItem, { borderColor: primaryColor }]}>
                <Clock size={16} color={primaryColor} strokeWidth={2.5} />
                <Text style={styles.statText}>2h 30m</Text>
              </View>
              
              <View style={[styles.statItem, { borderColor: primaryColor }]}>
                <Flame size={16} color={primaryColor} strokeWidth={2.5} />
                <Text style={styles.statText}>{streak} STREAK</Text>
              </View>
            </View>
          </View>
          
          {/* Action buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.skipButton]}
              activeOpacity={0.7}
            >
              <X size={18} color="#FFFFFF" />
              <Text style={styles.buttonText}>SKIP</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.completeButton, completed && styles.completedButton]}
              onPress={() => onToggle(id)}
              activeOpacity={0.7}
            >
              <ChevronRight size={18} color="#FFFFFF" />
              <Text style={styles.buttonText}>{completed ? 'COMPLETED' : 'COMPLETE'}</Text>
            </TouchableOpacity>
          </View>
          
          {/* Decorative elements */}
          <View style={[styles.cornerDecoration, styles.topLeft, { borderColor: primaryColor }]} />
          <View style={[styles.cornerDecoration, styles.topRight, { borderColor: primaryColor }]} />
          <View style={[styles.cornerDecoration, styles.bottomLeft, { borderColor: primaryColor }]} />
          <View style={[styles.cornerDecoration, styles.bottomRight, { borderColor: primaryColor }]} />
          
          {/* Animated glow effect */}
          <Animated.View 
            style={[styles.glowOverlay, { 
              borderColor: primaryColor,
              shadowColor: primaryColor,
              shadowOpacity: glowOpacity,
              shadowRadius: glowRadius
            }]} 
          />
        </BlurView>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    width: width - 40,
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    height: 280,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 12,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.3,
    resizeMode: 'cover',
  },
  blurContainer: {
    flex: 1,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(10, 10, 15, 0.85)',
    borderRadius: 12,
  },
  hexPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : 'monospace',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 10,
    color: '#AAAAAA',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  nameText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 1,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  descriptionText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#DDDDDD',
    marginBottom: 16,
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBackground: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
  },
  progressText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : 'monospace',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    width: 40,
    textAlign: 'right',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 60, 0.3)',
  },
  statText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#DDDDDD',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  actionContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  skipButton: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  completeButton: {
    backgroundColor: 'rgba(255, 0, 60, 0.2)',
  },
  completedButton: {
    backgroundColor: 'rgba(0, 255, 102, 0.2)',
  },
  buttonText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : 'monospace',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
    letterSpacing: 1,
  },
  cornerDecoration: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderWidth: 2,
  },
  topLeft: {
    top: 8,
    left: 8,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 8,
    right: 8,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 8,
    left: 8,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 8,
    right: 8,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    opacity: 0.5,
  },
});