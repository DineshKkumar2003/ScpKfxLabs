import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '..';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
// Define Prop Types for TankComponent
type TankProps = {
  tankName: string;
  capacity: number;
  currentLevel: number;
};

const TankComponent: React.FC<TankProps> = ({
  tankName,
  capacity,
  currentLevel,
}) => {
  const fillPercentage = (currentLevel / capacity) * 100;
  const isSafe = fillPercentage >= 20 && fillPercentage <= 95;
  return (
    <View style={styles.tankContainer}>
      {/* Tank */}
      <View style={styles.tank}>
        <View style={[styles.water, {width: `${fillPercentage}%`}]} />
        <Text style={styles.fill}>{Math.round(fillPercentage)}%</Text>
        <Text style={styles.name}>{tankName}</Text>
        <Ionicons
          name={isSafe ? 'checkmark-circle' : 'close-circle'}
          size={15}
          color={isSafe ? 'green' : 'red'}
          style={styles.statusIcon}
        />
      </View>
    </View>
  );
};
const TankMonitoring = () => {
  const tankData = [
    {name: 'Tank 1', capacity: 1000, currentLevel: 700},
    {name: 'Tank 2', capacity: 1000, currentLevel: 100},
    {name: 'Tank 3', capacity: 1000, currentLevel: 600},
    {name: 'Tank 4', capacity: 1000, currentLevel: 300},
    {name: 'Tank 5', capacity: 1000, currentLevel: 900},
    {name: 'Tank 6', capacity: 1000, currentLevel: 980},
    {name: 'Tank 7', capacity: 1000, currentLevel: 500},
    {name: 'Tank 8', capacity: 1000, currentLevel: 400},
    {name: 'Tank 9', capacity: 1000, currentLevel: 200},
    {name: 'Tank 9', capacity: 1000, currentLevel: 200},
    {name: 'Tank 9', capacity: 1000, currentLevel: 200},
    {name: 'Tank 9', capacity: 1000, currentLevel: 200},
  ];
  const tabBarheight = useBottomTabBarHeight();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView edges={['top', 'right', 'left']} />
      <StatusBar backgroundColor="#od1632" barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Current Water Level Across All Tanks</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'white',
          marginTop: 10,
          flexGrow: 1,
          paddingBottom: tabBarheight - 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.overHeadTanks}>
          <Text style={styles.ohtText}>Overhead Tanks</Text>
          {tankData.map((tank, index) => (
            <TankComponent
              key={index}
              tankName={tank.name}
              capacity={tank.capacity}
              currentLevel={tank.currentLevel}
            />
          ))}
        </View>
        <View style={styles.sumps}>
          <Text style={styles.sumpsText}>Sumps</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TankMonitoring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0.75},
    textShadowRadius: 1,
  },
  overHeadTanks: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: 10,
    width: '95%',
    zIndex: 2,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  ohtText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  tankContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  tank: {
    width: '95%',
    height: 50,
    borderWidth: 3,
    borderColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: 'white',
    position: 'relative',
    paddingHorizontal: 10,
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
    top: 15,
    right: 5,
  },
  sumps: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: 10,
    width: '95%',
    zIndex: 2,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: '40%',
  },
  sumpsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
});
