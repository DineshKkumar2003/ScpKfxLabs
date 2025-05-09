import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import AvgConsumptionChart from '../charts/IndicatorsCharts/AvgConsumption';
import AverageFlowChart from '../charts/IndicatorsCharts/AverageFlowChart';
import AlertDistribution from '../charts/IndicatorsCharts/AlertDistribution';
import DropDownPicker from 'react-native-dropdown-picker';

const Indicators = () => {
  const navigation = useNavigation();
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedTank, setSelectedTank] = useState(null);
  const [tankOption, setTankOption] = useState([]);
  const buildingDropDown = [
    {label: 'Cedar', value: 'cedar'},
    {label: 'Oak', value: 'oak'},
    {label: 'Palm1', value: 'palm1'},
    {label: 'Palm2', value: 'palm2'},
  ];
  const optionMapping = {
    cedar: [{label: 'CedarSupply(OHT)', value: 'cedarsupply(OHT)'}],
    oak: [{label: 'OakSupply(OHT)', value: 'oaksupply(OHT)'}],
    palm1: [{label: 'Palm1Supply(OHT)', value: 'palm1supply(OHT)'}],
    palm2: [{label: 'Palm2Supply(OHT)', value: 'palm2supply(OHT)'}],
  };
  useEffect(() => {
    if (selectedBuilding) {
      setTankOption(optionMapping[selectedBuilding]);
      setSelectedTank(null);
    }
  }, [selectedBuilding]);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView edges={['left', 'top', 'right']} />
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Indicators</Text>
      </View>
      <ScrollView
        style={{flex: 1, padding: 15}}
        contentContainerStyle={{paddingBottom: 150}}>
        {/* Section Container */}
        <View style={styles.selectionContainer}>
          <View style={styles.selectionItem}>
            <Text style={styles.selectionLabel}>Select Building/Tower:</Text>
            <RNPickerSelect
              placeholder={{label: 'Select Building'}}
              value={selectedBuilding}
              onValueChange={value => setSelectedBuilding(value)}
              items={buildingDropDown}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.selectionItem}>
            <Text style={styles.selectionLabel}>Select Tank:</Text>
            <RNPickerSelect
              placeholder={{label: 'Select Tank'}}
              value={selectedTank}
              onValueChange={value => setSelectedTank(value)}
              items={tankOption}
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
            />
          </View>
        </View>

        {/* Average Consumption charts */}
        <View style={styles.spaceContainer} />
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.containerHeaderText}>Avg Consumption</Text>
          </View>
          <AvgConsumptionChart />
        </View>

        {/* Average Flow Chart */}
        <View style={styles.spaceContainer} />
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.containerHeaderText}>Avg Flow Rate</Text>
          </View>
          <AverageFlowChart />
        </View>
        {/* Alert Distribution */}
        <View style={styles.spaceContainer} />
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.containerHeaderText}>Alert Distribution</Text>
          </View>
          <AlertDistribution />
        </View>
      </ScrollView>
    </View>
  );
};

export default Indicators;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectionItem: {
    flex: 1,
    marginRight: 10,
  },
  selectionLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  spaceContainer: {
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  containerHeader: {
    backgroundColor: '#1a2341',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginTop: 0,
  },
  containerHeaderText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    color: 'white',
    padding: 10,
    //borderRadius: 5,
    backgroundColor: '#1a2341',
    borderWidth: 1,
    borderColor: '#2d355c',
  },
  inputIOS: {
    color: 'white',
    padding: 10,
    // borderRadius: 5,
    backgroundColor: '#1a2341',
    borderWidth: 1,
    borderColor: '#2d355c',
  },
});
