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

const AssetIssueLog = () => {
  const navigation = useNavigation();
  const [assetType, setAssetType] = useState('');
  const [status, setStatus] = useState('');
  const [timePeriod, setTimePeriod] = useState('');

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
                {label: 'HVAC', value: 'hvac'},
                {label: 'Electrical', value: 'electrical'},
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
                {label: 'Open', value: 'open'},
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
        <Text style={styles.sectionTitle}>Asset Issue Logs</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Date and Time</Text>
            <Text style={styles.tableHeader}>Asset Info</Text>
            <Text style={styles.tableHeader}>Comments</Text>
            <Text style={styles.tableHeader}>Status</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.noLogs}>No logs found.</Text>
          </View>
        </View>
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
    backgroundColor: '#0d1632',
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
    minWidth: 120,
  },
  label: {
    color: 'white',
    marginBottom: 5,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007bff',
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
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#122042',
  },
  noLogs: {
    flex: 1,
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: 'black',
  },
  inputAndroid: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: 'black',
  },
});
