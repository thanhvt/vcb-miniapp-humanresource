import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Button, Text, Surface, List } from 'react-native-paper';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

const NFCTestScreen = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastTag, setLastTag] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkNFC = async () => {
      const supported = await NfcManager.isSupported();
      setIsSupported(supported);
      
      if (supported) {
        await NfcManager.start();
        const enabled = await NfcManager.isEnabled();
        setIsEnabled(enabled);
      }
    };

    checkNFC().catch(err => {
      console.error('Error checking NFC:', err);
      setError('Error initializing NFC');
    });

    return () => {
      NfcManager.cancelTechnologyRequest().catch(() => {});
    };
  }, []);

  const startScan = async () => {
    setError('');
    setIsScanning(true);
    setLastTag(null);

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      setLastTag(tag);
    } catch (ex) {
      console.warn('Error scanning NFC:', ex);
      setError('Error reading NFC tag');
    } finally {
      NfcManager.cancelTechnologyRequest();
      setIsScanning(false);
    }
  };

  if (!isSupported) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>NFC is not supported on this device</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <Text style={styles.title}>NFC Scanner</Text>
        <Text style={styles.status}>
          NFC Status: {isEnabled ? 'Enabled' : 'Disabled'}
        </Text>
        <Button
          mode="contained"
          onPress={startScan}
          loading={isScanning}
          disabled={!isEnabled || isScanning}
          style={styles.button}
        >
          {isScanning ? 'Scanning...' : 'Scan NFC Tag'}
        </Button>
      </Surface>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : lastTag ? (
        <Surface style={styles.tagInfo}>
          <Text style={styles.subtitle}>Last Scanned Tag:</Text>
          <List.Item
            title="Tag ID"
            description={lastTag?.id}
            left={props => <List.Icon {...props} icon="nfc" />}
          />
          <List.Item
            title="Tag Type"
            description={lastTag?.techTypes?.join(', ')}
            left={props => <List.Icon {...props} icon="information" />}
          />
        </Surface>
      ) : (
        <Text style={styles.instruction}>
          Hold your device near an NFC tag to scan it
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    elevation: 4,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  status: {
    marginBottom: 16,
    color: '#666',
  },
  button: {
    marginTop: 8,
  },
  error: {
    color: 'red',
    padding: 16,
    textAlign: 'center',
  },
  tagInfo: {
    margin: 16,
    padding: 16,
    elevation: 2,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instruction: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
});

export default NFCTestScreen;