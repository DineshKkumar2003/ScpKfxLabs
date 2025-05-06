import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {waterData} from '../../data/dummyData';
import {tr} from 'date-fns/locale';

import WaterLevelChart from '../charts/waterLevelChart';
import InflowOutflowChart from '../charts/Inflow-OutflowChart';

const WaterManagementDashboard = () => {
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

  const fillPercentage =
    (waterData.currentWaterLevel.currentLevel /
      waterData.currentWaterLevel.capacity) *
    100;
  const isSafe = fillPercentage >= 20 && fillPercentage <= 95;
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <SafeAreaView
        edges={['top', 'left', 'right']}
        //style={{backgroundColor: '#0d1632'}}
      />
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Water Management Dashboard</Text>
      </View>

      <ScrollView
        style={{flex: 1, backgroundColor: 'white', padding: 15}}
        contentContainerStyle={{paddingBottom: 150}}>
        {/* Selection Section */}
        <View style={styles.selectionContainer}>
          <View style={styles.selectionItem}>
            <Text style={styles.selectionLabel}>Select Building/Tower:</Text>
            <RNPickerSelect
              placeholder={{label: 'Select Building'}}
              value={selectedBuilding}
              onValueChange={value => setSelectedBuilding(value)}
              items={buildingDropDown}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={styles.selectionItem}>
            <Text style={styles.selectionLabel}>Select Building/Tower:</Text>
            <RNPickerSelect
              placeholder={{label: 'Select Tank'}}
              value={selectedTank}
              onValueChange={value => setSelectedTank(value)}
              items={tankOption}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        </View>

        {/* Tank Section */}
        <View style={styles.spaceContainer} />
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.containerHeaderText}>Current Water Level </Text>
          </View>
          <View style={styles.tankContainer}>
            <View style={styles.tank}>
              <View style={[styles.water, {width: `${fillPercentage}%`}]} />
              <Text style={styles.fill}>{Math.round(fillPercentage)}%</Text>
              <Text style={styles.name}>
                {waterData.currentWaterLevel.tankName}
              </Text>
              <Ionicons
                name={isSafe ? 'checkmark-circle' : 'close-circle'}
                size={15}
                color={isSafe ? 'green' : 'red'}
                style={styles.statusIcon}
              />
            </View>
          </View>
        </View>

        {/* Average consumption & Last alert */}
        <View style={styles.spaceContainer} />
        <View style={styles.wrapperContainer}>
          {/* Average Consumption */}
          <View style={[styles.halfContainer, {marginTop: 0}]}>
            <View style={[styles.container, {backgroundColor: 'white'}]}>
              <View style={styles.containerHeader}>
                <Text style={styles.containerHeaderText}>
                  Average Consumption{' '}
                </Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.label}>Daily</Text>
                <Text style={styles.value}>
                  {waterData.averageConsumption.daily}{' '}
                  <Text style={styles.unit}>kltrs</Text>
                </Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.label}>Weekly</Text>
                <Text style={styles.value}>
                  {waterData.averageConsumption.weekly}{' '}
                  <Text style={styles.unit}>kltrs</Text>
                </Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.label}>Monthly</Text>
                <Text style={styles.value}>
                  {waterData.averageConsumption.monthly}{' '}
                  <Text style={styles.unit}>kltrs</Text>
                </Text>
              </View>
            </View>
          </View>
          {/* Last Alert */}
          <View style={styles.halfContainer}>
            <View style={styles.container}>
              <View style={styles.containerHeader}>
                <Text style={styles.containerHeaderText}>Last Alert </Text>
              </View>
              <View style={styles.alertBox}>
                <Text style={styles.alertMessage}>
                  {waterData.lastAlert.message}
                </Text>
                <Text style={styles.alertTime}>{waterData.lastAlert.date}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Water Level */}
        <View style={styles.spaceContainer} />
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.containerHeaderText}>Water Level (%) </Text>
          </View>
          <WaterLevelChart />
        </View>

        <View style={styles.spaceContainer} />
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.containerHeaderText}>
              Inflow & Outflow Volume{' '}
            </Text>
          </View>
          <InflowOutflowChart />
        </View>
      </ScrollView>
    </View>
  );
};

export default WaterManagementDashboard;

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
    width: '100%',
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
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a2341',
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: '#2d355c',
  },
  container: {
    backgroundColor: 'white',
  },
  spaceContainer: {
    marginTop: 20,
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
  tankContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    zIndex: 2,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  tank: {
    width: '100%',
    height: 40,
    borderWidth: 1.5,
    borderColor: 'grey',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    paddingHorizontal: 20,
  },
  water: {
    backgroundColor: '#d8f2ff',
    position: 'absolute',
    height: '100%',
  },
  fill: {
    position: 'absolute',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    right: 30,
  },
  name: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusIcon: {
    position: 'absolute',
    top: '30%',
    right: 10,
    alignItems: 'center',
  },
  wrapperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
  },
  halfContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    minHeight: 160,
    zIndex: 2,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  metric: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 5,
    zIndex: 2,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  label: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  unit: {
    fontWeight: '400',
    fontSize: 14,
    color: 'black',
  },
  alertBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  alertMessage: {
    color: 'black',
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'center',
    width: '100%',
  },
  alertTime: {
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
    width: '100%',
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: 5,
    marginTop: 0,
    marginLeft: 0,
    position: 'relative',
  },
  chartWrapper: {
    flexDirection: 'row',
  },
  chart: {
    marginRight: 35,
    left: 0,
  },
  percentageContainer: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 20,
    justifyContent: 'space-between',
    width: 30,
    zIndex: 5,
  },
  percentText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'right',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    color: 'white',
    padding: 10,
    // borderRadius: 5,
    backgroundColor: '#1a2341',
    borderWidth: 1,
    borderColor: '#2d355c',
  },
  inputIOS: {
    color: 'white',
    padding: 10,
    //borderRadius: 5,
    backgroundColor: '#1a2341',
    borderWidth: 1,
    borderColor: '#2d355c',
  },
});
