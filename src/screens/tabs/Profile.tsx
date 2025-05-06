import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../../assets';
import {TextInput} from 'react-native-gesture-handler';

const Profile = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
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
      <SafeAreaView edges={['top', 'left', 'right']} />
      <StatusBar barStyle="dark-content" />

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
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter New Password"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confrim Password"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    width: '100%',
    height: 40,
    borderWidth: 0.75,
    borderColor: '#CCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 12,
    borderRadius: 30,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  submitButton: {
    backgroundColor: '#0d1632',
  },
});
