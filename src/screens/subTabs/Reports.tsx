import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';

const Reports = () => {
  const navigation = useNavigation();

  const [openDropdown, setOpenDropdown] = useState(null);

  // Dropdown states
  const [reportValue, setReportValue] = useState(null);
  const [reportItems] = useState([
    {label: 'Refill', value: 'Refill'},
    {label: 'Water Consumption', value: 'WaterConsumption'},
  ]);

  const [tankValue, setTankValue] = useState(null);
  const [tankItems] = useState([
    {label: 'Tank A', value: 'TankA'},
    {label: 'Tank B', value: 'TankB'},
  ]);

  const [towerValue, setTowerValue] = useState(null);
  const [towerItems] = useState([
    {label: 'Tower 1', value: 'Tower1'},
    {label: 'Tower 2', value: 'Tower2'},
  ]);

  // Date Pickers
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const toggleDropdown = (dropdownName: any) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const onFromDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) setFromDate(selectedDate);
    setShowFromPicker(Platform.OS === 'ios');
  };

  const onToDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) setToDate(selectedDate);
    setShowToPicker(Platform.OS === 'ios');
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <SafeAreaView
        style={{backgroundColor: '#0d1632'}}
        edges={['top', 'left', 'right']}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reports</Text>
      </View>

      <View style={styles.container}>
        {/* Report Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Report Type</Text>
          <DropDownPicker
            open={openDropdown === 'report'}
            value={reportValue}
            items={reportItems}
            setOpen={() => toggleDropdown('report')}
            setValue={setReportValue}
            placeholder="Select Report Type"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={3000}
            zIndexInverse={3000}
          />
        </View>

        {/* Tank */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Tank</Text>
          <DropDownPicker
            open={openDropdown === 'tank'}
            value={tankValue}
            items={tankItems}
            setOpen={() => toggleDropdown('tank')}
            setValue={setTankValue}
            placeholder="Select Tank"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2000}
            zIndexInverse={2000}
          />
        </View>

        {/* Tower */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Tower</Text>
          <DropDownPicker
            open={openDropdown === 'tower'}
            value={towerValue}
            items={towerItems}
            setOpen={() => toggleDropdown('tower')}
            setValue={setTowerValue}
            placeholder="Select Tower"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={1000}
            zIndexInverse={1000}
          />
        </View>

        {/* From Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>From Date</Text>
          <TouchableOpacity
            onPress={() => setShowFromPicker(true)}
            style={styles.dateBox}>
            <Text>{format(fromDate, 'dd MMM yyyy')}</Text>
          </TouchableOpacity>
          {showFromPicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="default"
              onChange={onFromDateChange}
            />
          )}
        </View>

        {/* To Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>To Date</Text>
          <TouchableOpacity
            onPress={() => setShowToPicker(true)}
            style={styles.dateBox}>
            <Text>{format(toDate, 'dd MMM yyyy')}</Text>
          </TouchableOpacity>
          {showToPicker && (
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={onToDateChange}
            />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
  container: {
    width: '100%',
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    gap: 15,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#ccc',
  },
  dropdownContainer: {
    backgroundColor: '#fafafa',
    borderColor: '#ccc',
  },
  inputGroup: {
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  dateBox: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '45%',
  },
  button: {
    backgroundColor: '#001532',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
  },
  buttonText: {
    color: '#fafafa',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Reports;
