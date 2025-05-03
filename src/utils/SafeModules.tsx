/**
 * SafeModules.tsx
 * 
 * Cung cấp các phiên bản an toàn của các native modules để tránh xung đột 
 * giữa ứng dụng chính và các micro-apps trong kiến trúc micro-frontend.
 */
import React from 'react';
import { View, NativeModules, Text } from 'react-native';

/**
 * Check if a specific native module is already registered
 */
export const isNativeModuleRegistered = (moduleName: string): boolean => {
  return !!NativeModules[moduleName];
};

/** 
 * SafeLinearGradient - phiên bản an toàn của LinearGradient
 * 
 * Sử dụng:
 * import { SafeLinearGradient as LinearGradient } from '../utils/SafeModules';
 */
let RealLinearGradient: any = null;

// Try to use preloaded module from host app
try {
  // Check for both possible native module names
  // 'BVLinearGradient' is the native module name for react-native-linear-gradient
  // 'RNLinearGradient' is an alternative name that might be used
  if (isNativeModuleRegistered('BVLinearGradient') || isNativeModuleRegistered('RNLinearGradient')) {
    RealLinearGradient = require('react-native-linear-gradient').default;
    console.log('Successfully loaded LinearGradient from native module');
  } else {
    // Always try direct import as fallback
    console.warn('LinearGradient native module not found. Trying direct import.');
    try {
      RealLinearGradient = require('react-native-linear-gradient').default;
      console.log('Successfully loaded LinearGradient through direct import');
    } catch (importError) {
      console.warn('Direct import of LinearGradient failed:', importError);
    }
  }
} catch (e) {
  console.warn('Could not load LinearGradient:', e);
}

type LinearGradientProps = {
  colors: string[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  locations?: number[];
  style?: any;
  children?: React.ReactNode;
};

export const SafeLinearGradient = (props: LinearGradientProps) => {
  // If we have access to the real component, use it
  if (RealLinearGradient) {
    return <RealLinearGradient {...props} />;
  }
  
  // Fallback to a simple View
  return <View style={props.style}>{props.children}</View>;
};
