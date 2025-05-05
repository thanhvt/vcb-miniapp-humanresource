/**
 * Type declarations for modules exposed from the host app.
 * This allows TypeScript to recognize the imports from the host app.
 */

declare module 'host/WebViewContainer' {
  import { ComponentType } from 'react';

  interface WebViewContainerProps {
    html?: string;
    uri?: string;
    style?: any;
    showLoading?: boolean;
    originWhitelist?: string[];
    onLoadStart?: (event: any) => void;
    onLoadEnd?: (event: any) => void;
    onError?: (event: any) => void;
  }

  const WebViewContainer: ComponentType<WebViewContainerProps>;
  export default WebViewContainer;
}
