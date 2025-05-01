import React from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Text, IconButton, Card, useTheme} from 'react-native-paper';
import RNFS from 'react-native-fs';

interface DocumentItemProps {
  title: string;
  description?: string;
  date?: string;
  url: string;
  icon?: string;
  onPress?: () => void;
  onDownload?: () => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({
  title,
  description,
  date,
  url,
  icon = 'file-document',
  onPress,
  onDownload,
}) => {
  const theme = useTheme();

  const handleDownload = async () => {
    if (onDownload) {
      onDownload();
      return;
    }
    
    // Mặc định, tải xuống document nếu không có hàm onDownload tùy chỉnh
    try {
      // Trong môi trường thực, URL này sẽ là URL thực sự trên server
      // Trong mock data, chúng ta chỉ giả lập việc tải xuống
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
      // Trong môi trường thực, chúng ta sẽ tải xuống tệp từ url thực
      // Bây giờ chỉ giả vờ tải xuống bằng cách tạo file trống
      console.log(`Downloading document to ${localFile}`);
      
      // Trong production, sẽ sử dụng code tương tự: 
      // await RNFS.downloadFile({
      //   fromUrl: url,
      //   toFile: localFile,
      // }).promise;
      
      Alert.alert('Thông báo', `Đã tải xuống: ${fileName}`);
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Lỗi', 'Không thể tải xuống tài liệu');
    }
  };

  return (
    <Card style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <IconButton
            icon={icon}
            size={24}
            iconColor={theme.colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description && (
            <Text style={styles.description} numberOfLines={1}>
              {description}
            </Text>
          )}
          {date && <Text style={styles.date}>{date}</Text>}
        </View>
        <TouchableOpacity onPress={handleDownload}>
          <IconButton icon="download" size={20} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default DocumentItem;
