import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  FlatList,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '..';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import IMAGES from '../../assets';

const categories = [
  {
    name: 'Dashboard',
    image: IMAGES.DASHBOARD,
    screen: 'WaterManagementDasboard',
  },
  {name: 'Tanks', image: IMAGES.TANKLOGO, screen: 'TankMonitoring'},
  {name: 'IssueLog', image: IMAGES.ASSETLOG, screen: 'AssetIssueLog'},
  {name: 'Reports', image: IMAGES.REPORTS, screen: 'Reports'},
  {name: 'Alerts', image: IMAGES.ALERTS, screen: 'Alerts'},
  {name: 'Indicators', image: IMAGES.INDICATORS, screen: 'Indicators'},
];
const WaterManagement = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //Rendering item
  const renderItem = ({item}: {item: any}) => (
    <View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.screen)}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={item.image} />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView
        style={{
          backgroundColor: '#0d1632',
        }}
        edges={['top', 'left', 'right']}
      />
      <StatusBar barStyle="light-content" backgroundColor="#0d1632" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Water Management</Text>
      </View>

      {/* Content */}

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        numColumns={3} // Change to 2 for better spacing
        key={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default WaterManagement;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#FFF7E6',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 120,
    margin: 10,
    borderRadius: 15,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
  },
  imageContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
});
