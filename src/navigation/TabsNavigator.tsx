import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Platform, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
      size={focused ? 26 : 24}
      color={color}
      style={focused ? {transform: [{translateY: -2}]} : {}}
    />
  );
};

const Tabs = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  const theme = useTheme();
  const {width} = Dimensions.get('window');
  const tabWidth = width / 4; // 4 tabs
  
  // Animation for the sliding indicator
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Create a custom tab bar component with the sliding indicator
  const CustomTabBar = ({state, descriptors, navigation}: any) => {
    return (
      <View style={[styles.tabBarContainer, {backgroundColor: theme.colors.surface}]}>
        {/* Sliding indicator */}
        <Animated.View 
          style={[
            styles.slideIndicator, 
            {
              width: tabWidth,
              transform: [{translateX: slideAnim}],
              backgroundColor: theme.colors.primaryContainer,
            }
          ]} 
        />
        {/* Tab buttons */}
        <View style={styles.tabBar}>
          {state.routes.map((route: any, index: number) => {
            const {options} = descriptors[route.key];
            const label = options.tabBarLabel || options.title || route.name;
            const isFocused = state.index === index;
            
            // Animate the indicator when tab changes
            useEffect(() => {
              if (isFocused) {
                Animated.spring(slideAnim, {
                  toValue: index * tabWidth,
                  useNativeDriver: true,
                  friction: 8,
                  tension: 50,
                }).start();
              }
            }, [isFocused]);
            
            // Scale animation for press effect
            const scaleAnim = useRef(new Animated.Value(1)).current;
            
            const onPressIn = () => {
              Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 150,
                useNativeDriver: true,
              }).start();
            };
            
            const onPressOut = () => {
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
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
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={onPress}
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
                    color: isFocused ? theme.colors.primary : theme.colors.outline,
                    size: 24,
                  })}
                  {options.tabBarLabel && (
                    <Text style={[
                      styles.tabBarLabel,
                      {color: isFocused ? theme.colors.primary : theme.colors.outline}
                    ]}>
                      {label}
                    </Text>
                  )}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Tabs.Navigator
      tabBar={(props: any) => <CustomTabBar {...props} />}
      screenOptions={({route}: {route: {name: string}}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
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
  tabBarContainer: {
    position: 'relative',
    borderTopWidth: 0,
    height: 70,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabBar: {
    flexDirection: 'row',
    height: '100%',
  },
  slideIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 1,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
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
    backgroundColor: 'rgba(76, 175, 80, 0.1)', // Light green background for active tab
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
