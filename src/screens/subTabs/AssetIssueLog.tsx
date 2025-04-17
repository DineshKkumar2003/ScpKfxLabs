import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {Row, Rows, Table} from 'react-native-table-component';

const AssetIssueLog = () => {
  const navigation = useNavigation();
  const [assetType, setAssetType] = useState('');
  const [status, setStatus] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const tableHead = ['Date & Time', 'Asset Info', 'Comments', 'Status'];
  const tableData: string[][] = [];
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={{backgroundColor: '#0d1632'}}
      />
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Asset Issue Logs</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Filters */}
        <View style={styles.filterContainer}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Asset Type</Text>
            <RNPickerSelect
              value={assetType}
              onValueChange={setAssetType}
              items={[
                {label: 'All Types', value: ''},
                {label: 'DG', value: 'dg'},
                {label: 'PUMP', value: 'pump'},
                {label: 'WATER', value: 'water'},
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false} // You can try removing this if issues arise on Android
            />
          </View>

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Status</Text>
            <RNPickerSelect
              value={status}
              onValueChange={setStatus}
              items={[
                {label: 'All Statuses', value: ''},
                {label: 'New', value: 'new'},
                {label: 'In Progress', value: 'in-progress'},
                {label: 'On Hold', value: 'on-hold'},
                {label: 'Resolved', value: 'resolved'},
                {label: 'Closed', value: 'closed'},
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <View style={styles.pickerWrapper}>
            <Text style={styles.label}>Time Period</Text>
            <RNPickerSelect
              value={timePeriod}
              onValueChange={setTimePeriod}
              items={[
                {label: 'Last 30 days', value: '30'},
                {label: 'Last 7 days', value: '7'},
                {label: 'All Time', value: 'all'},
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Table */}

        <ScrollView style={{}}>
          <Table borderStyle={{borderWidth: 1.5, borderColor: '#ccc'}}>
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.headText}
              flexArr={[3, 3, 6, 3]}
            />
            {tableData.length > 0 ? (
              <Rows
                data={tableData}
                style={styles.row}
                flexArr={[3, 3, 6, 3]}
              />
            ) : (
              <Row
                data={['No Logs Found']}
                style={styles.emptyRow}
                textStyle={styles.noDataText}
              />
            )}
          </Table>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default AssetIssueLog;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'left',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0.75},
    textShadowRadius: 1,
    paddingHorizontal: 10,
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerWrapper: {
    width: '30%',
    minWidth: 150,
  },
  label: {
    color: 'black',
    marginBottom: 5,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#98A869',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  //tableContainer: {padding: 10},
  head: {
    height: 60,
    backgroundColor: '#f1f8ff',
  },

  headText: {
    margin: 6,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  emptyRow: {
    height: 50,
    backgroundColor: 'white',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  row: {
    margin: 6,
    color: 'black',
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: 'black',
  },
  inputAndroid: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: 'black',
  },
});
