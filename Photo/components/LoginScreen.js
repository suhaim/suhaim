import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'dev-6wjnb4s8q4f1x6k4.us.auth0.com', clientId: 'qvkIYPmGXyrAT5GYxPJBFLcjegbLIluH' });

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      const options = {
        username: email,
        password: password,
        connection: 'Username-Password-Authentication'
      };

      const response = await auth0.webAuth.authorize(options);
      console.log(response);
      // handle success
    } catch (error) {
      console.log(error);
      // handle error
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.versionText}>V0.0.1</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={() => onLogin()}>
        <Text>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 12,
    color: 'grey'
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
export default LoginScreen;
