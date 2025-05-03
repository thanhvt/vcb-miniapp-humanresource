import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const UtilitiesScreen = () => {
  const navigation = useNavigation();

  const features = [
    {
      title: 'WebView Test',
      description: 'Test loading web content in WebView',
      screen: 'WebViewTest'
    },
    {
      title: 'Bluetooth Test',
      description: 'Check Bluetooth functionality',
      screen: 'BluetoothTest'
    },
    {
      title: 'NFC Test',
      description: 'Verify NFC capabilities',   
      screen: 'NFCTest'
    },
    {
      title: 'Camera Test',
      description: 'Test camera access and functionality',
      screen: 'CameraTest'
    },
    {
      title: 'OCR Test',
      description: 'Test text recognition from images',
      screen: 'OCRTest'
    },
    {
      title: 'Share Test',
      description: 'Test sharing functionality',
      screen: 'ShareTest'
    },
    {
      title: 'PDF Viewer',
      description: 'Test viewing PDF files',
      screen: 'PDFViewer'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Device Features Test</Text>
      <View style={styles.grid}>
        {features.map((feature, index) => (
          <Surface key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.title}>{feature.title}</Text>
              <Text style={styles.description}>{feature.description}</Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate(feature.screen)}
                style={styles.button}
              >
                Test
              </Button>
            </View>
          </Surface>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 64,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  grid: {
    padding: 8,
  },
  card: {
    margin: 8,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

export default UtilitiesScreen;