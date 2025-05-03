/**
 * mockModules.js
 * 
 * This file provides mock implementations for problematic native modules
 * to ensure compatibility in the micro-frontend architecture.
 */

const { registerMockForModule } = require('react-native/jest/mockComponent');

// Mock react-native-svg
try {
  registerMockForModule('react-native-svg', () => {
    const React = require('react');
    const { View, Text } = require('react-native');
    
    const createMockComponent = (name) => {
      const component = ({ children }) => {
        return React.createElement(View, {}, children);
      };
      component.displayName = name;
      return component;
    };
    
    return {
      Svg: createMockComponent('Svg'),
      Circle: createMockComponent('Circle'),
      Rect: createMockComponent('Rect'),
      Path: createMockComponent('Path'),
      G: createMockComponent('G'),
      Defs: createMockComponent('Defs'),
      LinearGradient: createMockComponent('LinearGradient'),
      RadialGradient: createMockComponent('RadialGradient'),
      Stop: createMockComponent('Stop'),
      Text: createMockComponent('Text'),
      Line: createMockComponent('Line')
    };
  });
  console.log('Successfully registered mock for react-native-svg');
} catch (error) {
  console.warn('Failed to register mock for react-native-svg:', error);
}

// Mock react-native-gifted-charts
try {
  registerMockForModule('react-native-gifted-charts', () => {
    const React = require('react');
    const { View, Text } = require('react-native');
    
    // Create a mock PieChart component
    const PieChart = (props) => {
      return React.createElement(View, {}, 
        props.centerLabelComponent ? props.centerLabelComponent() : null
      );
    };
    
    // Create a mock BarChart component
    const BarChart = (props) => {
      return React.createElement(View, {}, null);
    };
    
    // Create a mock LineChart component
    const LineChart = (props) => {
      return React.createElement(View, {}, null);
    };
    
    return {
      PieChart,
      BarChart,
      LineChart
    };
  });
  console.log('Successfully registered mock for react-native-gifted-charts');
} catch (error) {
  console.warn('Failed to register mock for react-native-gifted-charts:', error);
}
