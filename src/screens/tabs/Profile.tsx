import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../assets';

const Profile = () => {
  const navigation = useNavigation();
  const profileFields = [
    {key: 'Name', icon: 'person'},
    {key: 'Email', icon: 'mail'},
    {key: 'Phone', icon: 'call'},
    {key: 'Id', icon: 'card'},
  ];
  const profileValues: any = {
    Name: 'xyz',
    Email: 'xyz@gmail.com',
    Phone: '9876543210',
    Id: '7701',
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <SafeAreaView
        style={{backgroundColor: '#0d1632'}}
        edges={['top', 'left', 'right']}
      />
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={IMAGES.LOGO} style={styles.logo} />
        </View>
        <View style={styles.detailsContainer}>
          {profileFields.map((field, index) => (
            <View key={index} style={styles.rowWrapper}>
              <View style={styles.row}>
                <Ionicons
                  name={field.icon}
                  size={20}
                  color="dark blue"
                  style={styles.icon}
                />
                <Text style={styles.value}>{profileValues[field.key]}</Text>
              </View>
              <View style={styles.underLine} />
            </View>
          ))}
          ;
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'left',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0.75},
    textShadowRadius: 1,
  },
  backButton: {
    marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    backgroundColor: 'white',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 60,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    borderRadius: 30,
    //elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  rowWrapper: {marginBottom: 40},
  value: {
    color: 'darkblue',
    fontSize: 16,
    marginBottom: 4,
    marginRight: 30,
  },
  underLine: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
  },
  button: {
    backgroundColor: '#0d1632',
    height: 40,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
