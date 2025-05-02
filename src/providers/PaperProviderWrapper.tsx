import React, { ReactNode } from 'react';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

interface PaperProviderWrapperProps {
  children: ReactNode;
}

/**
 * A wrapper component that ensures react-native-paper components
 * have access to PaperProvider context even when loaded through federation
 */
const PaperProviderWrapper = ({ children }: PaperProviderWrapperProps) => {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
};

export default PaperProviderWrapper;
