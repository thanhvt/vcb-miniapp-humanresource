import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, PermissionsAndroid } from 'react-native';
import { Button, Text, List, Surface } from 'react-native-paper';
import BleManager from 'react-native-ble-manager';

const BluetoothTestScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<any>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    BleManager.start({ showAlert: false });
    
    // Request permissions on Android
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'Bluetooth requires location permission',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
          } else {
            setError('Location permission denied');
          }
        } catch (err: any) {
          console.warn(err);
          setError('Error requesting location permission');
        }
      }
    };

    requestPermissions();

    return () => {
      BleManager.stopScan();
    };
  }, []);

  const startScan = () => {
    setDevices([]);
    setError('');
    setIsScanning(true);

    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning...');
      })
      .catch((err: any) => {
        console.error(err);
        setError('Error starting scan');
        setIsScanning(false);
      });

    setTimeout(() => {
      BleManager.getDiscoveredPeripherals()
        .then((discoveredDevices: any) => {
          setDevices(discoveredDevices);
          setIsScanning(false);
        })
        .catch((err: any) => {
          console.error(err);
          setError('Error getting discovered devices');
          setIsScanning(false);
        });
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <Text style={styles.title}>Bluetooth Scanner</Text>
        <Button
          mode="contained"
          onPress={startScan}
          loading={isScanning}
          disabled={isScanning}
          style={styles.button}
        >
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </Button>
      </Surface>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView style={styles.deviceList}>
          {devices.map((device: any, index: number) => (
            <List.Item
              key={index}
              title={device.name || 'Unknown Device'}
              description={`ID: ${device.id}\nRSSI: ${device.rssi}`}
              left={props => <List.Icon {...props} icon="bluetooth" />}
            />
          ))}
          {!isScanning && devices.length === 0 && (
            <Text style={styles.noDevices}>No devices found</Text>
          )}
        </ScrollView>
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
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  deviceList: {
    flex: 1,
    padding: 16,
  },
  error: {
    color: 'red',
    padding: 16,
    textAlign: 'center',
  },
  noDevices: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
});

export default BluetoothTestScreen;