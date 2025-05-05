import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, PermissionsAndroid } from 'react-native';
import { Button, Text, List, Surface } from 'react-native-paper';
import { BleManager, Device, State } from 'react-native-ble-plx';

// Khởi tạo BleManager một lần ngoài component để tránh khởi tạo lại mỗi khi render
const bleManager = new BleManager();

const BluetoothTestScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Map<string, Device>>(new Map());
  const [error, setError] = useState('');
  const [bluetoothState, setBluetoothState] = useState<State>(State.Unknown);

  useEffect(() => {
    // Khởi tạo BLE và kiểm tra trạng thái Bluetooth
    const subscription = bleManager.onStateChange((state: State) => {
      console.log('Bluetooth state:', state);
      setBluetoothState(state);
      if (state === State.PoweredOn) {
        // Chỉ cần request permissions một lần khi Bluetooth đã bật
        requestPermissions();
        // Sau khi nhận permissions, có thể hủy subscription này
        subscription.remove();
      }
    }, true); // true để kiểm tra trạng thái ngay lập tức

    // Hàm request permissions trên Android
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          // Trên Android 12+ cần thêm cả BLUETOOTH_SCAN và BLUETOOTH_CONNECT
          if (Platform.OS === 'android' && parseInt(`${Platform.Version}`, 10) >= 31) { // Android 12 là API level 31
            const bluetoothScanGranted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              {
                title: 'Bluetooth Scan Permission',
                message: 'App needs Bluetooth Scan permission',
                buttonPositive: 'OK',
              },
            );

            const bluetoothConnectGranted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
              {
                title: 'Bluetooth Connect Permission',
                message: 'App needs Bluetooth Connect permission',
                buttonPositive: 'OK',
              },
            );

            if (
              bluetoothScanGranted !== PermissionsAndroid.RESULTS.GRANTED ||
              bluetoothConnectGranted !== PermissionsAndroid.RESULTS.GRANTED
            ) {
              setError('Bluetooth permissions denied');
              return;
            }
          }

          // Vẫn cần vị trí để scan trên một số thiết bị
          const locationGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'Bluetooth scanning requires location permission',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          
          if (locationGranted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('All permissions granted');
          } else {
            setError('Location permission denied');
          }
        } catch (err: any) {
          console.warn(err);
          setError('Error requesting permissions: ' + err.message);
        }
      }
    };

    // Clean up khi component unmount
    return () => {
      // Hủy subscription nếu còn tồn tại
      subscription.remove();
      // Dừng scan nếu đang scan
      if (isScanning) {
        bleManager.stopDeviceScan();
      }
    };
  }, []);

  const startScan = () => {
    // Kiểm tra trạng thái Bluetooth trước khi scan
    if (bluetoothState !== State.PoweredOn) {
      setError(`Bluetooth không hoạt động (${bluetoothState})`);
      return;
    }
    
    // Reset danh sách thiết bị và lỗi
    setDevices(new Map());
    setError('');
    setIsScanning(true);

    try {
      // Bắt đầu scan với thời gian timeout 5 giây
      bleManager.startDeviceScan(
        null, // null để scan tất cả services
        { allowDuplicates: false },
        (error: any, device: Device | null) => {
          // Xử lý lỗi nếu có
          if (error) {
            console.error('Scanning error:', error);
            setError(`Lỗi khi scan: ${error.message}`);
            setIsScanning(false);
            bleManager.stopDeviceScan();
            return;
          }
          
          // Nếu tìm thấy thiết bị mới
          if (device) {
            // Cập nhật danh sách thiết bị
            setDevices((prevDevices: Map<string, Device>) => {
              const newDevices = new Map(prevDevices);
              newDevices.set(device.id, device);
              return newDevices;
            });
          }
        }
      );

      // Tự động dừng scan sau 5 giây
      setTimeout(() => {
        if (isScanning) {
          bleManager.stopDeviceScan();
          setIsScanning(false);
          console.log('Scan completed');
        }
      }, 5000);
    } catch (e: any) {
      console.error('Exception during scan:', e);
      setError(`Lỗi: ${e.message}`);
      setIsScanning(false);
    }
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

      {bluetoothState !== State.PoweredOn && !error ? (
        <Text style={styles.warning}>
          Bluetooth đang {bluetoothState === State.PoweredOff ? 'tắt' : 
            bluetoothState === State.Resetting ? 'khởi động lại' : 
            bluetoothState === State.Unsupported ? 'không được hỗ trợ' : 
            bluetoothState === State.Unauthorized ? 'không được phép' : 
            'chưa sẵn sàng'}
        </Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView style={styles.deviceList}>
          {Array.from(devices.values()).map((device: Device) => (
            <List.Item
              key={device.id}
              title={device.name || device.localName || 'Unknown Device'}
              description={`ID: ${device.id}
RSSI: ${device.rssi || 'N/A'}
Connectable: ${device.isConnectable !== null ? (device.isConnectable ? 'Yes' : 'No') : 'Unknown'}`}
              left={props => <List.Icon {...props} icon="bluetooth" />}
            />
          ))}
          {!isScanning && devices.size === 0 && (
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
  warning: {
    color: 'orange',
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