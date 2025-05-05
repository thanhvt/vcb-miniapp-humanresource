import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import WebView from 'react-native-webview';
import { useState } from "react";

const WebViewTestScreen = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="URL"
          value={url}
          onChangeText={setUrl}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={() => {
            setError('');
            setIsLoading(true);
          }}
          style={styles.button}
        >
          Load URL
        </Button>
      </View>
      
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            setError(`WebView error: ${nativeEvent.description}`);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
    marginBottom: 64,
  },
  error: {
    color: 'red',
    padding: 16,
    textAlign: 'center',
  },
});

export default WebViewTestScreen;