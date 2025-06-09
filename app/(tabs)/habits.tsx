import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { arcsData } from '@/data/habitsData';
import { Plus, ChevronLeft, ChevronRight, Calendar, BarChart2 } from 'lucide-react-native';
import type { Habit } from '@/data/habitsData';
import HabitCard from '@/components/HabitCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function HabitsScreen() {
  // State management
  const [currentArcIndex, setCurrentArcIndex] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  
  // Get current arc and day data
  const currentArc = arcsData[currentArcIndex];
  const currentDay = currentArc?.days[currentDayIndex];
  
  // Habits state
  const [habits, setHabits] = useState<Habit[]>(
    currentDay?.habits || []
  );
  
  // Stats calculations
  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // Animation effects
  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
    
    // Scale animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
    // Pulse animation for glowing elements
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
  }, []);
  
  // Navigate to previous day
  const handlePrevDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    } else if (currentArcIndex > 0) {
      setCurrentArcIndex(currentArcIndex - 1);
      setCurrentDayIndex(arcsData[currentArcIndex - 1].days.length - 1);
    }
  };
  
  // Navigate to next day
  const handleNextDay = () => {
    if (currentDayIndex < currentArc.days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    } else if (currentArcIndex < arcsData.length - 1) {
      setCurrentArcIndex(currentArcIndex + 1);
      setCurrentDayIndex(0);
    }
  };
  
  // Toggle habit completion status
  const handleToggleHabit = (id: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === id
          ? { 
              ...habit, 
              completed: !habit.completed,
              progress: habit.completed ? 0.7 : 1
            }
          : habit
      )
    );
  };
  
  // Animated glow effect values
  const glowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8]
  });
  
  const glowRadius = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 10]
  });
  
  return (
    <ImageBackground
      source={require('@/assets/progressionbackground.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.85)', 'rgba(10,0,20,0.9)', 'rgba(0,0,0,0.95)']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header section */}
          <Animated.View 
            style={[styles.header, { 
              opacity: fadeAnim,
              transform: [{ translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })}]
            }]}
          >
            <View style={styles.headerContent}>
              <Text style={styles.arcName}>{currentArc.name.toUpperCase()}</Text>
              
              <View style={styles.dayNavigator}>
                <TouchableOpacity 
                  style={styles.navButton} 
                  onPress={handlePrevDay}
                  activeOpacity={0.7}
                >
                  <ChevronLeft color="#FFFFFF" size={20} />
                </TouchableOpacity>
                
                <View style={styles.dayBadge}>
                  <Calendar size={14} color="#FF003C" style={styles.dayIcon} />
                  <Text style={styles.dayNumber}>DAY {currentDay?.dayNumber}</Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.navButton} 
                  onPress={handleNextDay}
                  activeOpacity={0.7}
                >
                  <ChevronRight color="#FFFFFF" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Stats bar */}
            <View style={styles.statsBar}>
              <View style={styles.statsItem}>
                <Text style={styles.statsLabel}>COMPLETED</Text>
                <Text style={styles.statsValue}>{completedCount}/{totalCount}</Text>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={{
                  flex: 1,
                  height: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}>
                  <Animated.View 
                    style={[{
                      height: '100%',
                      borderRadius: 2,
                      width: `${completionRate}%`,
                      backgroundColor: '#FF003C',
                      shadowColor: '#FF003C',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: glowOpacity,
                      shadowRadius: glowRadius
                    }]} 
                  />
                </View>
              </View>
              
              <View style={styles.statsItem}>
                <Text style={styles.statsLabel}>RATE</Text>
                <Text style={styles.statsValue}>{completionRate}%</Text>
              </View>
            </View>
          </Animated.View>
        
          {/* Habits list */}
          <Animated.ScrollView 
            style={[styles.content, { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                id={habit.id}
                name={habit.name}
                category={habit.category}
                completed={habit.completed}
                progress={habit.progress || 0}
                streak={habit.streak || 0}
                onToggle={handleToggleHabit}
              />
            ))}
            
            {/* Empty state message if no habits */}
            {habits.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No habits for today. Add a new habit to get started.
                </Text>
              </View>
            )}
          </Animated.ScrollView>
          
          {/* Add button */}
          <Animated.View style={[styles.addButtonContainer, {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }]}>
            <TouchableOpacity 
              style={styles.addButton}
              activeOpacity={0.7}
            >
              <Animated.View style={[styles.buttonGlow, {
                shadowOpacity: glowOpacity,
                shadowRadius: glowRadius
              }]} />
              <Plus color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.4,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 0, 60, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContent: {
    marginBottom: 16,
  },
  arcName: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : 'monospace',
    fontSize: 28,
    color: '#FFFFFF',
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: '#FF003C',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 16,
  },
  dayNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  dayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 60, 0.5)',
    borderRadius: 20,
    marginHorizontal: 12,
  },
  dayIcon: {
    marginRight: 8,
  },
  dayNumber: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : 'monospace',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 4,
  },
  statsItem: {
    alignItems: 'center',
    width: 80,
  },
  statsLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 10,
    color: '#AAAAAA',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statsValue: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : 'monospace',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    shadowOffset: { width: 0, height: 0 },
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Extra padding at bottom for add button
  },
  contentContainer: {
    paddingBottom: 20,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
  },
  emptyStateText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 20,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 0, 60, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FF003C',
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
  },
});