import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Picker} from '@react-native-picker/picker';

const alertData = [
  {date: '07/04/2025', time: '09:44', alert: 'Water Tank Might Overflow - 96%'},
  {date: '07/04/2025', time: '09:43', alert: 'Water Level Stable'},
  {date: '07/04/2025', time: '09:42', alert: 'Water Level Unstable'},
  {date: '06/04/2025', time: '22:22', alert: 'Water Tank Might Overflow - 96%'},
  {date: '06/04/2025', time: '22:08', alert: 'Water Tank Might Overflow - 98%'},
  {date: '06/04/2025', time: '21:50', alert: 'Water Tank Might Overflow - 97%'},
  {date: '05/04/2025', time: '10:41', alert: 'Water Level Stable'},
  {date: '05/04/2025', time: '10:35', alert: 'Water Level Unstable'},
  {date: '04/04/2025', time: '23:31', alert: 'Water Tank Might Overflow - 96%'},
  {date: '04/04/2025', time: '23:20', alert: 'Water Tank Might Overflow - 96%'},
];

const Alerts = () => {
  const navigation = useNavigation();
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedTank, setSelectedTank] = useState<string | null>(null);

  const tableHead = ['Date', 'Time', 'Alerts'];
  const tableData = alertData.map(item => [item.date, item.time, item.alert]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={{backgroundColor: '#0d1632'}}
      />
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Alerts</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <View style={styles.dropdown}>
          <Text style={styles.label}>Select Building/Tower:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedBuilding}
              onValueChange={itemValue => setSelectedBuilding(itemValue)}>
              <Picker.Item label="Select..." value={null} />
              <Picker.Item label="Cedar" value="Cedar" />
              <Picker.Item label="Maple" value="Maple" />
              <Picker.Item label="Oak" value="Oak" />
            </Picker>
          </View>
        </View>

        <View style={styles.dropdown}>
          <Text style={styles.label}>Select Tank:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedTank}
              onValueChange={itemValue => setSelectedTank(itemValue)}>
              <Picker.Item label="Select..." value={null} />
              <Picker.Item label="CedarSupply(OHT)" value="CedarSupply(OHT)" />
              <Picker.Item label="CedarSupply(UGT)" value="CedarSupply(UGT)" />
              <Picker.Item label="Backup Tank" value="Backup Tank" />
            </Picker>
          </View>
        </View>
      </View>

      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ScrollView style={styles.tableContainer}>
          <Table
            borderStyle={{
              borderWidth: 1.5,
              borderColor: '#ccc',
            }}>
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.headText}
              flexArr={[3, 2, 7]}
            />
            <Rows
              data={tableData}
              textStyle={styles.rowText}
              flexArr={[3, 2, 7]}
            />
          </Table>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    gap: 15,
  },
  dropdown: {
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    width: 150,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  tableContainer: {
    padding: 10,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  headText: {
    margin: 6,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  rowText: {
    margin: 6,
    color: 'black',
    textAlign: 'center',
  },
});
