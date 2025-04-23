import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
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
  var tableData: string[][] = [];

  //Log Pop-Up Screen
  const [modalVisible, setModalVisible] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [logAssetType, setLogAssetType] = useState('');
  const [logLocation, setLogLocation] = useState('');
  const [logTank, setLogTank] = useState('');

  const resetForm = () => {
    setLogAssetType('');
    setLogLocation('');
    setLogTank('');
    setReportDescription('');
  };

  // Update your handleSubmit function
  const handleSubmit = () => {
    console.log('Report submitted:', {
      assetType: logAssetType,
      location: logLocation,
      tank: logTank,
      description: reportDescription,
    });

    resetForm(); // Reset all fields
    setModalVisible(false);
  };
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
        <Text style={styles.headerText}>Issue Logs</Text>
        <TouchableOpacity
          style={styles.headerbutton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.headerbuttonText}>+Add a Log</Text>
        </TouchableOpacity>
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

      {/* Report a log Screen */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Report a Problem</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Select Asset Type</Text>
                <RNPickerSelect
                  value={logAssetType}
                  onValueChange={setLogAssetType}
                  items={[
                    {label: 'DG', value: 'dg'},
                    {label: 'WATER', value: 'water'},
                    {label: 'PUMP', value: 'pump'},
                  ]}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Location (Block/Tower)</Text>
                <RNPickerSelect
                  value={logLocation}
                  onValueChange={setLogLocation}
                  items={[
                    {label: 'Cedar', value: 'cedar'},
                    {label: 'Oak', value: 'oak'},
                    {label: 'Palm1', value: 'palm1'},
                    {label: 'Palm2', value: 'palm2'},
                  ]}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tank</Text>
                <RNPickerSelect
                  value={logTank}
                  onValueChange={setLogTank}
                  items={[]}
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={reportDescription}
                  onChangeText={setReportDescription}
                  placeholder="Enter report details"
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Log Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  headerbutton: {
    backgroundColor: '#98A869',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 5,
  },
  headerbuttonText: {
    color: 'white',
    fontWeight: '600',
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 150,
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
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
