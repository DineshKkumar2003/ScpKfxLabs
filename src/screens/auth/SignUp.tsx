import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {RootStackParamList} from '..';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IMAGES} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
const SignUp = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [focusedInput, setFocusedInput] = useState<number | null>(null);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled">
            {/* Logo Container */}
            <View style={styles.logoContainer}>
              <Image source={IMAGES.LOGO} style={styles.logo} />
            </View>
            {/* SignUp Container */}
            <View style={styles.signupContainer}>
              <Text style={styles.title}>New User Registration</Text>
              {[
                'Name',
                'E-mail-ID',
                'Phone Number',
                'Password',
                'Society ID',
              ].map((field, index) => (
                <TextInput
                  key={index}
                  style={[
                    styles.input,
                    focusedInput === index && styles.focusedInput,
                  ]}
                  placeholder={field}
                  keyboardType={
                    field === 'Phone Number' || field === 'Society ID'
                      ? 'number-pad'
                      : 'default'
                  }
                  secureTextEntry={field === 'Password'}
                  onFocus={() => setFocusedInput(index)}
                  onBlur={() => setFocusedInput(null)}
                />
              ))}
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.signupText}>
              Already Registered?{' '}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate('SignIn')}>
                Sign In
              </Text>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    height: 120,
    width: 120,
    backgroundColor: '#fff',
    borderRadius: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    top: '13%',
    zIndex: 5,
    elevation: 5,
    position: 'absolute',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  signupContainer: {
    width: '85%',
    height: '55%',
    backgroundColor: '#F9FCFF',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    color: '474747',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 0.75,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  focusedInput: {
    borderBottomColor: 'lightblue',
    borderWidth: 1.5,
  },
  button: {
    backgroundColor: '#081F5C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  signupLink: {
    color: '#081F5C',
    fontWeight: 'bold',
  },
});
