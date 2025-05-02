import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Platform, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Import LinearGradient with a fallback mechanism to handle missing native module
let LinearGradient: any;
try {
  LinearGradient = require('react-native-linear-gradient').default;
} catch (error) {
  // Fallback component when LinearGradient is not available
  LinearGradient = ({ colors, style, children, start, end, ...props }: any) => {
    // Use the first color from the colors array as the background color
    const backgroundColor = Array.isArray(colors) ? colors[0] : '#00e676';
    console.log('Using fallback LinearGradient with color:', backgroundColor);
    return (
      <View style={[style, { backgroundColor }]} {...props}>
        {children}
      </View>
    );
  };
}
import PersonalNavigator from './PersonalNavigator';
import ContractNavigator from './ContractNavigator';
import IncomeNavigator from './IncomeNavigator';
import PerformanceNavigator from './PerformanceNavigator';

export type TabsParamList = {
  PersonalNavigator: undefined;
  ContractNavigator: undefined;
  IncomeNavigator: undefined;
  PerformanceNavigator: undefined;
};

interface TabBarIconProps {
  focused: boolean;
  color: string;
}

const getTabBarIcon = (name: string, focused: boolean, color: string) => {
  return (
    <Icon
      name={name}
      size={focused ? 28 : 24}
      color={color}
      style={focused ? {transform: [{translateY: -4}]} : {}}
    />
  );
};

const Tabs = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  const theme = useTheme();
  const {width} = Dimensions.get('window');
  // Use window width for more precise calculations
  // Account for the container padding (20px on each side)
  const containerPadding = 40;
  const usableWidth = width - containerPadding;
  const tabWidth = usableWidth / 4; // 4 tabs exactly
  
  // Animation for the sliding indicator
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Animation for the gradient border
  const gradientAnim = useRef(new Animated.Value(0)).current;
  
  // Store active tab index for reference
  const activeTabIndexRef = useRef(0);
  
  useEffect(() => {
    // Start the gradient animation loop
    Animated.loop(
      Animated.timing(gradientAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, []);
  
  // Helper function to precisely animate the indicator to the specified tab
  const animateToIndex = (index: number) => {
    // Update reference to current active tab
    activeTabIndexRef.current = index;
    
    // Calculate exact position for the indicator
    const position = index * tabWidth;
    
    // Use spring for natural movement with precise positioning
    Animated.spring(slideAnim, {
      toValue: position,
      useNativeDriver: true,
      friction: 8, // Lower friction for faster animation
      tension: 120, // Higher tension for more precision
      velocity: 10, // Initial velocity for smoother start
    }).start();
  };
  
  // Create a custom tab bar component with the sliding indicator
  // Custom tab bar component with precise indicator positioning
  const CustomTabBar = ({state, descriptors, navigation}: any) => {
    // Update indicator position whenever the active tab changes
    useEffect(() => {
      animateToIndex(state.index);
    }, [state.index]);
    
    // Set initial position when component mounts
    useEffect(() => {
      animateToIndex(state.index);
    }, []);
    
    // Create animated gradient effect for visual feedback
    let gradientColors;
    try {
      gradientColors = gradientAnim.interpolate({
        inputRange: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1],
        outputRange: ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0080ff', '#8000ff', '#ff0080']
      });
    } catch (error) {
      // Fallback if interpolation fails
      gradientColors = '#00e676';
    }
    
    return (
      <View style={styles.tabBarOuterContainer}>
        <Animated.View style={[styles.tabBarBorder, {borderColor: gradientColors}]}>
          <View style={[styles.tabBarContainer, {alignItems: 'center'}]}>
            {/* Tab buttons row */}
            <View style={styles.tabBar}>
              {state.routes.map((route: any, index: number) => {
                const {options} = descriptors[route.key];
                const label = options.tabBarLabel ?? options.title ?? route.name;
                const isFocused = state.index === index;
                
                // Animation for button press effect
                const scaleAnim = useRef(new Animated.Value(1)).current;
                
                const onPressIn = () => {
                  Animated.timing(scaleAnim, {
                    toValue: 0.9,
                    duration: 100,
                    useNativeDriver: true,
                  }).start();
                };
                
                const onPressOut = () => {
                  Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                  }).start();
                };
                
                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };
                
                return (
                  <TouchableOpacity
                    key={route.key}
                    activeOpacity={1}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? {selected: true} : {}}
                    onPress={() => {
                      onPress();
                      animateToIndex(index);
                    }}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    style={[
                      styles.tabButton,
                      isFocused && styles.tabButtonActive,
                    ]}
                  >
                    <Animated.View style={{
                      transform: [{scale: scaleAnim}],
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {options.tabBarIcon && options.tabBarIcon({
                        focused: isFocused,
                        color: isFocused ? '#ffffff' : 'rgba(255,255,255,0.7)',
                        size: 24,
                      })}
                      <Text style={[
                        styles.tabBarLabel,
                        {color: isFocused ? '#ffffff' : 'rgba(255,255,255,0.7)'}
                      ]}>
                        {label}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            {/* Sliding indicator with exact positioning */}
            <Animated.View 
              style={[
                styles.slideIndicator, 
                {
                  width: tabWidth,
                  // The transform is the key to proper positioning
                  transform: [{translateX: slideAnim}],
                }
              ]} 
            >
              {/* Use LinearGradient for the indicator */}
              {(() => {
                try {
                  return (
                    <LinearGradient
                      colors={['#4cff91', '#00e676', '#4cff91']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.indicatorGradient}
                    />
                  );
                } catch (error) {
                  // Fallback for when LinearGradient is unavailable
                  return <View style={[styles.indicatorGradient, {backgroundColor: '#00e676'}]} />;
                }
              })()}
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <Tabs.Navigator
      tabBar={(props: any) => <CustomTabBar {...props} />}
      screenOptions={({route}: {route: {name: string}}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ffffff', // Bright white for active items
        tabBarInactiveTintColor: '#B0BEC5', // Lighter gray for inactive items
        tabBarStyle: {
          opacity: 0, // Hide the default tab bar completely
          height: 0
        }
      })}>

      <Tabs.Screen
        name="PersonalNavigator"
        component={PersonalNavigator}
        options={{
          title: 'Thông tin',
          tabBarIcon: ({focused, color}: TabBarIconProps) => getTabBarIcon('account', focused, color),
        }}
      />
      <Tabs.Screen
        name="ContractNavigator"
        component={ContractNavigator}
        options={{
          title: 'Hợp đồng',
          tabBarIcon: ({focused, color}: TabBarIconProps) => getTabBarIcon('file-document', focused, color),
        }}
      />
      <Tabs.Screen
        name="IncomeNavigator"
        component={IncomeNavigator}
        options={{
          title: 'Thu nhập',
          tabBarIcon: ({focused, color}: TabBarIconProps) => getTabBarIcon('currency-usd', focused, color),
        }}
      />
      <Tabs.Screen
        name="PerformanceNavigator"
        component={PerformanceNavigator}
        options={{
          title: 'Hiệu suất',
          tabBarIcon: ({focused, color}: TabBarIconProps) => getTabBarIcon('chart-line', focused, color),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarOuterContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarBorder: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50', // Fixed border color for better visibility
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5, // Increased shadow opacity
        shadowRadius: 8,
      },
      android: {
        elevation: 10, // Increased elevation
      },
    }),
  },
  tabBarContainer: {
    position: 'relative',
    height: 70,
    borderRadius: 10,
    // borderWidth: 2,
    // opacity: 0.5,
    backgroundColor: '#656667', // Darker background for better contrast
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    height: '100%',
  },
  slideIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 4,
    width: '25%', // Exactly 1/4 of container width
    zIndex: 1,
  },
  indicatorGradient: {
    height: '100%',
    width: '100%',
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '700', // Bolder text
    marginTop: 2, // Reduced space for better alignment
    textAlign: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  tabButtonActive: {
    backgroundColor: 'rgba(76, 175, 80, 0.25)', // Increased opacity for better visibility
  },
  header: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

export default TabsNavigator;
