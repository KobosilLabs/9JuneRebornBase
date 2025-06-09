import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Activity, ChartBar as BarChart, Chrome as Home, User, Scroll } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

export default function TabLayout() {
  // Animation values for glowing effect
  const glowOpacity = useSharedValue(0.4);
  
  // Start the animation when component mounts
  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1500 }),
        withTiming(0.4, { duration: 1500 })
      ),
      -1, // Infinite repetitions
      false // No reverse
    );
  }, []);
  
  // Custom tab bar icon with cyberpunk styling
  const renderTabBarIcon = (Icon: React.ElementType, focused: boolean, color: string) => {
    return (
      <View style={styles.iconContainer}>
        {focused && (
          <Animated.View 
            style={[styles.iconGlow, {
              shadowOpacity: glowOpacity,
            }]}
          />
        )}
        <Icon color={color} size={22} />
      </View>
    );
  };
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF003C',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill}>
              <LinearGradient
                colors={['rgba(0,0,0,0.7)', 'rgba(20,0,20,0.8)']}
                style={StyleSheet.absoluteFill}
              />
            </BlurView>
            {/* Top border with gradient */}
            <LinearGradient
              colors={['rgba(255,0,60,0.8)', 'rgba(255,0,60,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.tabBarTopBorder}
            />
            
            {/* Decorative elements */}
            <View style={styles.cornerCut} />
          </View>
        ),
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, focused }) => renderTabBarIcon(Home, focused, color),
        }}
      />
      <Tabs.Screen
        name="acts"
        options={{
          title: 'ACTS',
          tabBarIcon: ({ color, focused }) => renderTabBarIcon(Scroll, focused, color),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'HABITS',
          tabBarIcon: ({ color, focused }) => renderTabBarIcon(Activity, focused, color),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'STATS',
          tabBarIcon: ({ color, focused }) => renderTabBarIcon(BarChart, focused, color),
        }}
      />
     
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    height: 65,
    position: 'relative',
    elevation: 0,
  },
  tabBarLabel: {
    fontFamily: 'SpaceMono-Bold',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'transparent',
    shadowColor: '#FF003C',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  tabBarTopBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  cornerCut: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: 15,
    height: 15,
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#FF003C',
  },
});