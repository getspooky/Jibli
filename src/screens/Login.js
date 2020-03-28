/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { useState, Component } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { dataTransport } from './Welcome';
const { width } = Dimensions.get('window');

/**
 * @desc Login Screen.
 * @function
 * @name Login
 * @param {*} props
 * @returns {Component}
 */
export default function Login(props) {
  /* @state  */
  const [data, setData] = useState({
    email: null,
    password: null,
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
    const { email, password } = data;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dataTransport.call(user, navigation, 'Role');
      });
  }

  /**
   * @internal
   * @desc Handle input change.
   * @function
   * @name {HandleInputChange}
   * @param {String} value
   * @returns {Function}
   */
  function HandleInputChange(name) {
    return value => {
      setData({
        ...data,
        [name]: value,
      });
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        😷 Weclome
        <Text style={{ color: '#0AC4BA' }}> Jibli.</Text>
      </Text>
      <Text style={styles.description}>Please Stay At Home</Text>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          width: width * 0.7,
        }}
      >
        <TextInput
          style={styles.textInput}
          onChangeText={HandleInputChange('email')}
          name={'email'}
          type={'email'}
          placeholder={'Email Address'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={HandleInputChange('password')}
          name={'password'}
          type={'password'}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btnNext} onPress={HandleSignIn}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Sign In
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
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#323643',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 7,
        }
      : {
          elevation: 1,
        }),
    backgroundColor: 'white',
    color: '#4a5568',
    padding: 10,
    color: '#4a5568',
    textAlign: 'left',
    fontSize: 13,
    marginTop: 15,
    width: '100%',
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
    backgroundColor: 'white',
    color: '#4a5568',
    borderRadius: 6,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#0AC4BA',
    width: '100%',
  },
});
