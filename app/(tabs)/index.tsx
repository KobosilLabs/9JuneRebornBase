import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import HeroBanner from '@/components/HeroBanner';
import DaySummary from '@/components/DaySummary';
import HabitCard from '@/components/HabitCard';
import { arcsData } from '@/data/habitsData';
import { Award, ChevronRight, Lock, BookOpen, Dumbbell, Calendar, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  // State management
  const [currentArcIndex, setCurrentArcIndex] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('daily');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const milestoneSlideAnim = useRef(new Animated.Value(0)).current;
  
  // Get current arc and day data
  const currentArc = arcsData[currentArcIndex];
  const currentDay = currentArc?.days[currentDayIndex] || { 
    dayNumber: 0, 
    habits: [], 
    totalXp: 0 
  };
  
  // Handle tab change with animation
  useEffect(() => {
    if (selectedTab === 'milestones') {
      Animated.spring(milestoneSlideAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(milestoneSlideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [selectedTab, milestoneSlideAnim]);
  
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
  
  // Navigation handlers
  const handlePrevDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    } else if (currentArcIndex > 0) {
      setCurrentArcIndex(currentArcIndex - 1);
      setCurrentDayIndex(arcsData[currentArcIndex - 1].days.length - 1);
    }
  };
  
  const handleNextDay = () => {
    if (currentDayIndex < currentArc.days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    } else if (currentArcIndex < arcsData.length - 1) {
      setCurrentArcIndex(currentArcIndex + 1);
      setCurrentDayIndex(0);
    }
  };
  
  // Stats calculations
  const completedHabits = currentDay.habits.filter(h => h.completed).length;
  const totalHabits = currentDay.habits.length;
  const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;
  
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
          {/* Header with current arc info */}
          <Animated.View 
            style={[styles.header, { 
              opacity: fadeAnim,
              transform: [{ translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              })}]
            }]}
          >
            {/* Arc banner with image */}
            <View style={styles.arcBanner}>
              <ImageBackground 
                source={currentArc?.imageUrl ? currentArc.imageUrl : require('@/assets/actimages/act1.png')}
                style={styles.arcImageBackground}
                imageStyle={styles.arcImage}
              >
                <LinearGradient
                  colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                  style={styles.arcGradient}
                >
                  <View style={styles.arcContent}>
                    <View style={styles.arcBadge}>
                      <Text style={styles.arcNumber}>ARC {currentArcIndex + 1}</Text>
                    </View>
                    <Text style={styles.arcName}>{currentArc.name.toUpperCase()}</Text>
                    <Text style={styles.arcDescription}>
                      {currentArc?.description || "Master your habits and evolve through this transformative journey"}
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
              
              {/* Decorative corner cuts */}
              <View style={[styles.cornerCut, styles.cornerTopLeft]} />
              <View style={[styles.cornerCut, styles.cornerTopRight]} />
              <View style={[styles.cornerCut, styles.cornerBottomLeft]} />
              <View style={[styles.cornerCut, styles.cornerBottomRight]} />
            </View>
            
            <View style={styles.dayNavigator}>
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={handlePrevDay}
                activeOpacity={0.7}
              >
                <Text style={styles.navButtonText}>PREV</Text>
              </TouchableOpacity>
              
              <View style={styles.dayBadge}>
                <Calendar size={16} color="#FF003C" style={styles.dayIcon} />
                <Text style={styles.dayNumber}>DAY {currentDay?.dayNumber}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.navButton} 
                onPress={handleNextDay}
                activeOpacity={0.7}
              >
                <Text style={styles.navButtonText}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          
          {/* Main content */}
          <Animated.ScrollView 
            style={[styles.scrollView, { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }]}
            showsVerticalScrollIndicator={false}
          >
            {/* Compact Progress summary */}
            {/* Tab Navigation - Moved outside of container */}
            <View style={styles.tabNavigation}>
              <TouchableOpacity 
                style={[styles.tabButton, selectedTab === 'daily' && styles.tabButtonActive]}
                onPress={() => setSelectedTab('daily')}
              >
                <Text style={[styles.tabButtonText, selectedTab === 'daily' && styles.tabButtonTextActive]}>DAILY</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.tabButton, selectedTab === 'milestones' && styles.tabButtonActive]}
                onPress={() => setSelectedTab('milestones')}
              >
                <Text style={[styles.tabButtonText, selectedTab === 'milestones' && styles.tabButtonTextActive]}>MILESTONES</Text>
                <View style={[styles.milestoneCountBadge, { marginLeft: 8 }]}>
                  <Text style={styles.milestoneCountText}>3</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.tabButton, styles.tabButtonLocked]}
              >
                <Lock size={12} color="rgba(255, 255, 255, 0.3)" />
                <Text style={[styles.tabButtonText, styles.tabButtonTextLocked]}>FUTURE</Text>
              </TouchableOpacity>
            </View>
            
            {/* Only show container when milestone tab is selected */}
            {selectedTab === 'milestones' && (
              <View style={styles.summaryContainer}>
                <View style={styles.milestoneCard}>
                  <Animated.View style={[styles.glowOverlay, {
                    shadowOpacity: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.4, 0.9]
                    }),
                    shadowRadius: pulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [5, 15]
                    }),
                    shadowColor: '#00FFD1'
                  }]} />
                
                  {/* Milestone content */}
                  <Animated.View 
                    style={[styles.milestoneContent, {
                      opacity: milestoneSlideAnim,
                      transform: [{
                        translateY: milestoneSlideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0]
                        })
                      }]
                    }]}
                  >
                    <View style={styles.milestoneList}>
                      {/* Arc Milestones */}
                      <View style={styles.milestoneItem}>
                        <View style={styles.milestoneInfo}>
                          <Text style={styles.milestoneName}>{currentArc.goals?.[0] || '20 Push-ups'}</Text>
                          <Text style={styles.milestoneDesc}>{currentArc.description || 'Daily strength training'}</Text>
                        </View>
                        
                        <TouchableOpacity style={styles.doneButton}>
                          <Text style={styles.doneButtonText}>DONE</Text>
                        </TouchableOpacity>
                      </View>
                      
                      <View style={styles.milestoneItem}>
                        <View style={styles.milestoneInfo}>
                          <Text style={styles.milestoneName}>Complete 7-day streak</Text>
                          <Text style={styles.milestoneDesc}>Maintain daily consistency</Text>
                        </View>
                        
                        <View style={styles.progressIndicator}>
                          <Text style={styles.progressText}>5/7</Text>
                        </View>
                      </View>
                      
                      <View style={styles.milestoneItem}>
                        <View style={styles.milestoneInfo}>
                          <Text style={styles.milestoneName}>Reach level 5</Text>
                          <Text style={styles.milestoneDesc}>Gain experience through habits</Text>
                        </View>
                        
                        <View style={styles.progressIndicator}>
                          <Text style={styles.progressText}>3/5</Text>
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                
                  <View style={styles.cyberProgressContainer}>
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0.3)', 'rgba(255, 0, 60, 0.1)', 'rgba(0, 0, 0, 0.3)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.cyberProgressBg}
                    >
                      <View style={styles.cyberProgressLeft}>
                        <Text style={styles.cyberProgressLabel}>SKILL COMPLETION</Text>
                        <View style={styles.cyberProgressDots}>
                          {[...Array(5)].map((_, i) => (
                            <View 
                              key={i} 
                              style={[styles.cyberProgressDot, i < Math.ceil(completionRate/20) && styles.cyberProgressDotActive]} 
                            />
                          ))}
                        </View>
                      </View>
                      
                      <Animated.View style={styles.cyberProgressRight}>
                        <Text style={styles.cyberProgressPercent}>{completionRate}<Text style={styles.cyberProgressPercentSymbol}>%</Text></Text>
                        <Animated.View style={[styles.cyberProgressGlow, {
                          opacity: pulseAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.4, 0.8]
                          })
                        }]} />
                      </Animated.View>
                    </LinearGradient>
                  </View>
              </View>
            </View>
            )}
            
            {/* Daily challenges section */}
            <View style={styles.sectionContainer}>
            
              
              <View style={styles.challengeContainer}>
                {/* Knowledge Quest Challenge */}
                <HabitCard
                  id="knowledge-quest"
                  name="Knowledge Quest"
                  category="reading"
                  completed={false}
                  progress={0.3}
                  streak={2}
                  onToggle={(id) => console.log(`Toggled ${id}`)}
                />
                
                {/* Mind Training Challenge */}
                <HabitCard
                  id="mind-training"
                  name="Mind Training"
                  category="meditation"
                  completed={false}
                  progress={0.5}
                  streak={4}
                  onToggle={(id) => console.log(`Toggled ${id}`)}
                />
                
                {/* Physical Training Challenge */}
                <HabitCard
                  id="physical-training"
                  name="Physical Training"
                  category="training"
                  completed={true}
                  progress={1}
                  streak={7}
                  onToggle={(id) => console.log(`Toggled ${id}`)}
                />
              </View>
              
              {/* View all button */}
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>VIEW ALL CHALLENGES</Text>
                <ChevronRight size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </Animated.ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    opacity: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 0, 60, 0.3)',
  },
  arcBanner: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    height: 160, // Increased height for better visibility
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 60, 0.3)',
  },
  arcImageBackground: {
    width: '100%',
    height: '100%',
  },
  arcImage: {
    opacity: 1, // Increased opacity for better visibility
    resizeMode: 'cover',
  },
  arcGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  arcContent: {
    zIndex: 2,
  },
  arcInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  arcDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    marginTop: 8,
    letterSpacing: 0.5,
    lineHeight: 18,
  },
  cornerCut: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: 'transparent',
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#FF003C',
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FF003C',
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#FF003C',
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FF003C',
  },
  arcBadge: {
    backgroundColor: '#FF003C',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 8,
    alignSelf: 'flex-start',
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  arcNumber: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  arcName: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 18,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(255, 0, 60, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  dayNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    letterSpacing: 1,
  },
  dayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FF003C',
  },
  dayIcon: {
    marginRight: 6,
  },
  dayNumber: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  summaryCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 60, 0.3)',
    position: 'relative',
    overflow: 'hidden',
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTitle: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: 1.5,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statColumn: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    letterSpacing: 1,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  sectionContainer: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 18,
    color: '#FF003C',
    marginLeft: 8,
    marginRight: 12,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(255, 58, 58, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    ...Platform.select({
      ios: {
        fontWeight: '800',
      },
      android: {
        fontWeight: 'bold',
      },
    }),
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 0, 60, 0.3)',
  },
  challengeContainer: {
    marginBottom: 24,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  viewAllText: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 14,
    letterSpacing: 1,
    marginRight: 8,
  },
  // Compact summary styles
  compactSummary: {
    padding: 6,
    marginBottom: 12,
  },
  compactSummaryTitle: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 14,
    marginLeft: 6,
    letterSpacing: 1,
  },
  compactProgressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 8,
  },
  compactStatColumn: {
    alignItems: 'center',
  },
  compactStatValue: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 16,
    marginBottom: 2,
  },
  compactStatLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  ultraCompactLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ultraCompactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ultraCompactStats: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  // Milestone section styles
  milestoneCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 209, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    marginTop: 10,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  milestoneHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneTitle: {
    color: '#00FFD1',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 16,
    letterSpacing: 1.5,
    marginRight: 10,
    textShadowColor: 'rgba(0, 255, 209, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  milestoneCountBadge: {
    backgroundColor: 'rgba(0, 255, 209, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00FFD1',
  },
  milestoneCountText: {
    color: '#00FFD1',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  moreDetailsButton: {
    backgroundColor: 'rgba(0, 255, 209, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 209, 0.3)',
  },
  moreDetailsText: {
    color: '#00FFD1',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  milestoneList: {
    marginBottom: 10,
  },
  milestoneItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  milestoneInfo: {
    flex: 1,
    marginRight: 10,
  },
  milestoneName: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 14,
    marginBottom: 4,
  },
  milestoneDesc: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
  },
  doneButton: {
    backgroundColor: 'rgba(255, 0, 60, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FF003C',
    minWidth: 90,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FF003C',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  completedButton: {
    backgroundColor: 'rgba(0, 255, 209, 0.2)',
    borderColor: '#00FFD1',
  },
  expandButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 209, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 209, 0.3)',
    borderRadius: 6,
    padding: 10,
    marginTop: 12,
  },
  expandButtonText: {
    color: '#00FFD1',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  expandIconContainer: {
    backgroundColor: 'rgba(0, 255, 209, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  arcContextBanner: {
    marginBottom: 16,
    marginTop: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  arcContextGradient: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  arcContextName: {
    color: '#FF003C',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 14,
    letterSpacing: 1,
    marginBottom: 4,
    textShadowColor: 'rgba(255, 0, 60, 0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  arcContextMindset: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'SpaceMono-Regular',
    fontSize: 12,
    fontStyle: 'italic',
  },
  // Cyberpunk Progress Display
  cyberProgressContainer: {
    marginTop: 16,
  },
  cyberProgressBg: {
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 60, 0.3)',
  },
  cyberProgressLeft: {
    flex: 1,
  },
  cyberProgressLabel: {
    color: '#FF003C',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 6,
  },
  cyberProgressDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cyberProgressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 60, 0.3)',
  },
  cyberProgressDotActive: {
    backgroundColor: '#FF003C',
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  cyberProgressRight: {
    position: 'relative',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 0, 60, 0.3)',
    marginLeft: 10,
  },
  cyberProgressPercent: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 20,
    textShadowColor: '#FF003C',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cyberProgressPercentSymbol: {
    fontSize: 14,
    color: '#FF003C',
  },
  cyberProgressGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    borderRadius: 4,
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  // Tab Navigation Styles
  tabNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(0, 255, 209, 0.15)',
    borderWidth: 1,
    borderColor: '#00FFD1',
    shadowColor: '#00FFD1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  tabButtonLocked: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabButtonText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 10,
    letterSpacing: 1,
    marginLeft: 4,
    textShadowColor: 'rgba(255, 255, 255, 0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  tabButtonTextActive: {
    color: '#00FFD1',
    fontFamily: 'SpaceMono-Bold',
    textShadowColor: '#00FFD1',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  tabButtonTextLocked: {
    color: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 4,
  },
  milestoneContent: {
    marginTop: 8,
  },
  progressIndicator: {
    backgroundColor: 'rgba(255, 0, 60, 0.2)',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 60, 0.3)',
  },
  progressText: {
    color: '#FFFFFF',
    fontFamily: 'SpaceMono-Bold',
    fontSize: 12,
    textAlign: 'center',
  },
});