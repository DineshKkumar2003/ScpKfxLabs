import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WaterManagement from '../screens/tabs/WaterManagement';
import {RootStackParamList} from '../screens';
import {BottomTabParamList} from '../screens';
import TankMonitoring from '../screens/subTabs/TankMonitoring';
import AssetIssueLog from '../screens/subTabs/AssetIssueLog';
import Reports from '../screens/subTabs/Reports';
import Alerts from '../screens/subTabs/Alerts';
import Indicators from '../screens/subTabs/Indicators';
import WaterManagementDashboard from '../screens/subTabs/WaterManagementDashboard';

const WaterManagementStack = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
    // initialRouteName="WaterManagement"
    >
      <Stack.Screen
        name="WaterManagement"
        component={WaterManagement}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TankMonitoring"
        component={TankMonitoring}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AssetIssueLog"
        component={AssetIssueLog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Reports"
        component={Reports}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Alerts"
        component={Alerts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Indicators"
        component={Indicators}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WaterManagementDasboard"
        component={WaterManagementDashboard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default WaterManagementStack;

const styles = StyleSheet.create({});
