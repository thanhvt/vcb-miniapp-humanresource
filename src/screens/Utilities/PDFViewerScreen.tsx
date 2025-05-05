import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

// Tạm thời sử dụng component cơ bản thay vì pdf viewer
// Sau này có thể sử dụng shared component từ host app
const PDFViewerScreen = () => {
  const [pdfUrl, setPdfUrl] = useState('https://www.example.com/sample.pdf');
  const [error, setError] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={pdfUrl}
          onChangeText={setPdfUrl}
          style={styles.input}
          placeholder="Nhập URL của file PDF"
        />
        <Button
          title="Xem PDF"
          onPress={() => {
            // Xử lý xem PDF ở đây
            setError('');
          }}
        />
      </View>
      
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.pdfPlaceholder}>
          <Text style={styles.infoText}>
            PDF Viewer component sẽ được hiển thị ở đây.{"\n"}
            URL: {pdfUrl}
          </Text>
          <Text style={styles.note}>
            Tính năng này sẽ được triển khai với cùng phương pháp "Host Expose Component"
            tương tự như WebView để tránh lỗi native module.
          </Text>
        </View>
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
  },
  pdfPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    margin: 16,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    padding: 16,
    textAlign: 'center',
  },
});

export default PDFViewerScreen;
