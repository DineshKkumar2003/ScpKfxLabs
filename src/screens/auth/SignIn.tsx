import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '..';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IMAGES} from '../../assets';
const SignIn = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <Image source={IMAGES.LOGO} style={styles.logo} />
        </View>

        {/* Login Box */}
        <View style={styles.loginBox}>
          <Text style={styles.title}>Smart Community Login</Text>
          <TextInput
            style={[styles.input, emailFocused && styles.focusedInput]}
            placeholder="E-mail"
            keyboardType="email-address"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          <TextInput
            style={[styles.input, passwordFocused && styles.focusedInput]}
            placeholder="Password"
            secureTextEntry={true}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('WaterManagement')}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signupText}>
          Not Registered?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('SignUp')}>
            Sign up here!
          </Text>
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7096D1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#fff',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '20%',
    zIndex: 2,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  loginBox: {
    width: '85%',
    height: '40%',
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 0,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    color: '474747',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
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
  focusedInput: {
    borderBottomColor: '#0A58CA',
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
    color: '1f1f1f',
  },
  signupLink: {
    color: '#081F5C',
    fontWeight: 'bold',
  },
});
export default SignIn;
