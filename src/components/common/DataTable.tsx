import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  DataTable as PaperDataTable,
  Text,
  useTheme,
  IconButton,
} from 'react-native-paper';

export interface Column {
  id: string;
  label: string;
  numeric?: boolean;
  width?: number;
  renderCell?: (value: any, rowData: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  keyExtractor: (item: any) => string;
  onRowPress?: (item: any) => void;
  title?: string;
  itemsPerPage?: number;
  emptyMessage?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  keyExtractor,
  onRowPress,
  title,
  itemsPerPage: initialItemsPerPage = 5,
  emptyMessage = 'Không có dữ liệu',
}) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const theme = useTheme();

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);
  const displayedData = data.slice(from, to);

  return (
    <ScrollView horizontal={columns.length > 3} style={styles.container}>
      <View style={styles.tableContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        <PaperDataTable>
          <PaperDataTable.Header>
            {columns.map(column => (
              <PaperDataTable.Title
                key={column.id}
                numeric={column.numeric}
                style={column.width ? {width: column.width} : undefined}>
                {column.label}
              </PaperDataTable.Title>
            ))}
          </PaperDataTable.Header>

          {displayedData.length > 0 ? (
            displayedData.map(rowData => (
              <PaperDataTable.Row
                key={keyExtractor(rowData)}
                onPress={() => onRowPress && onRowPress(rowData)}>
                {columns.map(column => (
                  <PaperDataTable.Cell
                    key={`${keyExtractor(rowData)}-${column.id}`}
                    numeric={column.numeric}
                    style={column.width ? {width: column.width} : undefined}>
                    {column.renderCell
                      ? column.renderCell(rowData[column.id], rowData)
                      : rowData[column.id]}
                  </PaperDataTable.Cell>
                ))}
              </PaperDataTable.Row>
            ))
          ) : (
            <PaperDataTable.Row>
              <PaperDataTable.Cell
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                textStyle={{textAlign: 'center'}}>
                {emptyMessage}
              </PaperDataTable.Cell>
            </PaperDataTable.Row>
          )}

          {data.length > itemsPerPage && (
            <PaperDataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(data.length / itemsPerPage)}
              onPageChange={setPage}
              label={`${from + 1}-${to} / ${data.length}`}
            />
          )}
        </PaperDataTable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  tableContainer: {
    minWidth: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
  },
});

export default DataTable;
