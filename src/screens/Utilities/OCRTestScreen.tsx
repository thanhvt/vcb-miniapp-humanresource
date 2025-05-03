import React, { useState } from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { Button, Text, Surface, ActivityIndicator } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';

const OCRTestScreen = () => {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (!result.didCancel && result.assets?.[0]) {
        setImage(result.assets[0]);
        setRecognizedText('');
        setError('');
      }
    } catch (err) {
      console.error('Error selecting image:', err);
      setError('Error selecting image');
    }
  };

  const recognizeText = async () => {
    if (!image) return;

    setIsProcessing(true);
    setError('');

    try {
      const options = {
        whitelist: null,
        blacklist: null,
      };

      const recognizedText = await TesseractOcr.recognize(
        Platform.OS === 'android' ? image?.uri : image?.uri.replace('file://', ''),
        LANG_ENGLISH,
        options
      );

      setRecognizedText(recognizedText);
    } catch (err) {
      console.error('Error recognizing text:', err);
      setError('Error recognizing text');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <Text style={styles.title}>OCR Text Recognition</Text>
        <Button
          mode="contained"
          onPress={selectImage}
          style={styles.button}
          disabled={isProcessing}
        >
          Select Image
        </Button>
      </Surface>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.content}>
          {image && (
            <Surface style={styles.imageContainer}>
              <Image source={{ uri: image?.uri }} style={styles.image} />
              <Button
                mode="contained"
                onPress={recognizeText}
                style={styles.button}
                disabled={isProcessing}
              >
                Recognize Text
              </Button>
            </Surface>
          )}

          {isProcessing && (
            <View style={styles.processingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.processingText}>Processing image...</Text>
            </View>
          )}

          {recognizedText !== '' && (
            <Surface style={styles.resultContainer}>
              <Text style={styles.subtitle}>Recognized Text:</Text>
              <Text style={styles.recognizedText}>{recognizedText}</Text>
            </Surface>
          )}
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
  content: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    padding: 16,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
  processingContainer: {
    alignItems: 'center',
    padding: 16,
  },
  processingText: {
    marginTop: 8,
    color: '#666',
  },
  resultContainer: {
    padding: 16,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recognizedText: {
    fontSize: 14,
    lineHeight: 20,
  },
  error: {
    color: 'red',
    padding: 16,
    textAlign: 'center',
  },
});

export default OCRTestScreen;