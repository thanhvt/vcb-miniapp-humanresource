import React, {useState} from 'react';
import {View, StyleSheet, Share, Platform} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const ShareTest = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const shareText = async () => {
    try {
      await Share.share({
        message: text || 'Test share message',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const pickAndShareImage = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (response.assets?.[0]) {
        setImage(response.assets[0]);
        await Share.share({
          message: text || 'Sharing image',
          url:
            Platform.OS === 'ios'
              ? response.assets[0].uri.replace('file://', '')
              : response.assets[0].uri,
        });
      }
    } catch (error) {
      console.error('Image share error:', error);
    }
  };

  const shareFile = async () => {
    try {
      // Create a sample text file
      const path = `${RNFS.CachesDirectoryPath}/sample.txt`;
      await RNFS.writeFile(path, text || 'Sample file content', 'utf8');

      await Share.share({
        message: 'Sharing file',
        url:
          Platform.OS === 'ios'
            ? path.replace('file://', '')
            : `file://${path}`,
      });
    } catch (error) {
      console.error('File share error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Text to share"
        value={text}
        onChangeText={setText}
        multiline
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={shareText} style={styles.button}>
          Share Text
        </Button>

        <Button
          mode="contained"
          onPress={pickAndShareImage}
          style={styles.button}>
          Share Image
        </Button>

        <Button mode="contained" onPress={shareFile} style={styles.button}>
          Share File
        </Button>
      </View>

      <Text style={styles.note}>
        Note: Sharing capabilities may vary based on the device and installed
        apps
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    gap: 8,
  },
  button: {
    marginVertical: 8,
  },
  note: {
    marginTop: 16,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ShareTest;
