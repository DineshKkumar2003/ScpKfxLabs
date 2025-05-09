import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import {BottomTabParamList, RootStackParamList} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PumpMonitoring from '../screens/tabs/PumpMonitoring';
import DGMonitoring from '../screens/tabs/DGMonitoring';
import Profile from '../screens/tabs/Profile';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WaterManagementStack from './WaterManagementStack';
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WaterManagement"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Water"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          borderRadius: 30,
          marginLeft: '5%',
          marginRight: '5%',
          position: 'absolute',
          width: '90%',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          marginBottom: 50,
        },
        tabBarActiveTintColor: '#0A58CA',
        tabBarInactiveTintColor: 'grey',
      }}>
      <Tab.Screen
        name="DG"
        component={DGMonitoring}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="speedometer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Pump"
        component={PumpMonitoring}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="pulse" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Water"
        component={WaterManagementStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="water" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default StackNavigation;
