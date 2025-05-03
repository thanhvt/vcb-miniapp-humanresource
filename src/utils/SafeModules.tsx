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

/**
 * SafeSVG - phiên bản an toàn của các SVG components
 * 
 * Sử dụng:
 * import { SafeSvg as Svg, SafeCircle as Circle, ... } from '../utils/SafeModules';
 */
let RealSvg: any = null;
let RealCircle: any = null;
let RealRect: any = null;
let RealPath: any = null;
let RealG: any = null;
let RealDefs: any = null;
let RealLinearGradientSvg: any = null;
let RealStop: any = null;
let RealSvgText: any = null;

// Try to use preloaded module from host app
try {
  // Check if RNSVG module is available
  if (isNativeModuleRegistered('RNSVGSvgViewManager')) {
    const RNSvg = require('react-native-svg');
    RealSvg = RNSvg.Svg;
    RealCircle = RNSvg.Circle;
    RealRect = RNSvg.Rect;
    RealPath = RNSvg.Path;
    RealG = RNSvg.G;
    RealDefs = RNSvg.Defs;
    RealLinearGradientSvg = RNSvg.LinearGradient;
    RealStop = RNSvg.Stop;
    RealSvgText = RNSvg.Text;
    console.log('Successfully loaded SVG components from native module');
  } else {
    // Always try direct import as fallback
    console.warn('RNSVG native module not found. Trying direct import.');
    try {
      const RNSvg = require('react-native-svg');
      RealSvg = RNSvg.Svg;
      RealCircle = RNSvg.Circle;
      RealRect = RNSvg.Rect;
      RealPath = RNSvg.Path;
      RealG = RNSvg.G;
      RealDefs = RNSvg.Defs;
      RealLinearGradientSvg = RNSvg.LinearGradient;
      RealStop = RNSvg.Stop;
      RealSvgText = RNSvg.Text;
      console.log('Successfully loaded SVG components through direct import');
    } catch (importError) {
      console.warn('Direct import of SVG components failed:', importError);
    }
  }
} catch (e) {
  console.warn('Could not load SVG components:', e);
}

type SvgProps = {
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  style?: any;
  children?: React.ReactNode;
};

export const SafeSvg = (props: SvgProps) => {
  if (RealSvg) {
    return <RealSvg {...props} />;
  }
  // Fallback to a simple View
  return (
    <View style={[{ width: props.width, height: props.height }, props.style]}>
      <Text style={{ textAlign: 'center', marginTop: 20 }}>SVG not available</Text>
      {props.children}
    </View>
  );
};

export const SafeCircle = (props: any) => {
  if (RealCircle) {
    return <RealCircle {...props} />;
  }
  return null;
};

export const SafeRect = (props: any) => {
  if (RealRect) {
    return <RealRect {...props} />;
  }
  return null;
};

export const SafePath = (props: any) => {
  if (RealPath) {
    return <RealPath {...props} />;
  }
  return null;
};

export const SafeG = (props: any) => {
  if (RealG) {
    return <RealG {...props} />;
  }
  return <View>{props.children}</View>;
};

export const SafeDefs = (props: any) => {
  if (RealDefs) {
    return <RealDefs {...props} />;
  }
  return null;
};

export const SafeLinearGradientSvg = (props: any) => {
  if (RealLinearGradientSvg) {
    return <RealLinearGradientSvg {...props} />;
  }
  return null;
};

export const SafeStop = (props: any) => {
  if (RealStop) {
    return <RealStop {...props} />;
  }
  return null;
};

export const SafeSvgText = (props: any) => {
  if (RealSvgText) {
    return <RealSvgText {...props} />;
  }
  return <Text>{props.children}</Text>;
};
