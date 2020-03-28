import React, { useState } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  TextInput,
  Picker,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { dataTransport } from './Welcome';
import countries from '../data/countries';

export default function Register(props) {
  /* @state  */
  const [data, setData] = useState({
    email: null,
    password: null,
    country: null,
  });

  /* @var */
  const { navigation } = props;

  /**
   * @internal
   * @desc Handle Sign In.
   * @function
   * @name {HandleSignIn}
   * @returns {void}
   */
  function HandleSignIn() {
    const { email, password, country } = data;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dataTransport.call('Configuration', user, { country });
      });
  }

  /**
   * @internal
   * @desc Handle input change.
   * @function
   * @name {HandleInputChange}
   * @param {Object} event
   * @returns {void}
   */
  function HandleInputChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  const listOfCountries = countries.map(({ name, code }) => {
    return <Picker.Item label={name} value={name} key={code} />;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        😷 Weclome
        <Text style={{ color: '#0AC4BA' }}> Jibli.</Text>
      </Text>
      <Text style={styles.description}>You Stay At Home For Us</Text>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        <TextInput
          style={styles.textInput}
          onChange={HandleInputChange}
          name={'email'}
          type={'email'}
          placeholder={'Email Address'}
        />
        <TextInput
          style={styles.textInput}
          onChange={HandleInputChange}
          name={'password'}
          type={'password'}
          placeholder={'Password'}
        />
        <Picker
          style={[
            styles.textInput,
            { backgroundColor: 'white', color: '#4a5568', border: 0 },
          ]}
          selectedValue={'Morocco'}
          onValueChange={(itemValue, itemIndex) =>
            setData({ ...data, country: itemValue })
          }
        >
          {listOfCountries}
        </Picker>
        <TouchableOpacity style={styles.btnNext} onPress={HandleSignIn}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#323643',
    fontWeight: '700',
  },
  description: {
    color: '#9DA3B4',
    fontSize: 14,
    padding: 8,
    marginTop: 6,
    textAlign: 'center',
  },
  textInput: {
    ...(Platform.OS === 'ios' || 'web'
      ? {
          shadowColor: '#323643',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 7,
        }
      : {
          elevation: 1,
        }),
    padding: 10,
    color: '#4a5568',
    textAlign: 'left',
    fontSize: 13,
    marginTop: 15,
  },
  btnNext: {
    ...(Platform.OS === 'ios' || 'web'
      ? {
          shadowColor: '#323643',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 7,
        }
      : {
          elevation: 1,
        }),
    borderRadius: 6,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#0AC4BA',
  },
});
