import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

const CameraTestScreen = () => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices?.back;
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  React.useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    setHasPermission(cameraPermission === 'authorized');
  };

  const capturePhoto = async () => {
    try {
      if (camera.current) {
        const photo = await camera.current?.takePhoto({
          qualityPrioritization: 'speed',
          flash: 'off',
        });
        setPhoto(photo);
      }
    } catch (e) {
      console.error('Error taking photo:', e);
      setError('Error capturing photo');
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Camera permission not granted</Text>
        <Button onPress={checkPermission}>Request Permission</Button>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : photo ? (
        <View style={styles.previewContainer}>
          <Surface style={styles.imageContainer}>
            <Image
              source={{ uri: `file://${photo?.path}` }}
              style={styles.preview}
            />
          </Surface>
          <Button
            mode="contained"
            onPress={() => setPhoto(null)}
            style={styles.button}
          >
            Take Another Photo
          </Button>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          {device && isFocused && (
            <Camera
              ref={camera}
              style={styles.camera}
              device={device}
              isActive={true}
              photo={true}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={capturePhoto}
              style={styles.button}
            >
              Take Photo
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  button: {
    marginVertical: 8,
  },
  previewContainer: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    flex: 1,
    elevation: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  preview: {
    flex: 1,
    resizeMode: 'contain',
  },
  error: {
    color: 'red',
    padding: 16,
    textAlign: 'center',
  },
});

export default CameraTestScreen;