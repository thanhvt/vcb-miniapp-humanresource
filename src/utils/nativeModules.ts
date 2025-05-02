/**
 * Utility to handle native modules in a micro-frontend architecture
 * Prevents duplicate registrations of native modules between host and micro-frontend apps
 */

import { Platform, NativeModules } from 'react-native';

/**
 * Check if a native module is already registered by the host app
 * @param moduleName The name of the native module to check
 */
export const isNativeModuleRegistered = (moduleName: string): boolean => {
  return !!NativeModules[moduleName];
};

/**
 * Get a safe import of a native module component to prevent duplicate registrations
 * @param importFn Function that imports the component
 * @param moduleName The name of the native module in the NativeModules registry
 * @param fallback Optional fallback component if the module isn't available
 */
export function getSafeNativeComponent<T>(importFn: () => T, moduleName: string, fallback?: T): T | null {
  try {
    // If module already exists in NativeModules registry, it's been registered by host app
    // In that case we can safely import it
    if (isNativeModuleRegistered(moduleName)) {
      return importFn();
    } 
    
    // In development, we might still want to render our component
    // even when the native module hasn't been registered yet
    if (__DEV__) {
      console.warn(`Using ${moduleName} in DEV mode without host registration`);
      return importFn();
    }
    
    // In production, we should respect the host app's module registration
    // Use fallback if provided
    return fallback || null;
  } catch (error) {
    console.error(`Error importing ${moduleName}:`, error);
    return fallback || null;
  }
}
