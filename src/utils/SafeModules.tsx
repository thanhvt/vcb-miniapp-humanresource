/**
 * SafeModules.tsx
 * 
 * Cung cấp các phiên bản an toàn của các native modules để tránh xung đột 
 * giữa ứng dụng chính và các micro-apps trong kiến trúc micro-frontend.
 */
import React from 'react';
import { View, NativeModules } from 'react-native';

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
  // The host app should have already registered the native module
  if (isNativeModuleRegistered('BVLinearGradient')) {
    RealLinearGradient = require('react-native-linear-gradient').default;
  } else if (__DEV__) {
    // In development, we might still want to import it directly
    console.warn('BVLinearGradient not registered by host. Using direct import in DEV mode.');
    RealLinearGradient = require('react-native-linear-gradient').default;
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
