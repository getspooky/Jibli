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
  Alert,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { style as customStyle } from '../styles/global';
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
    if (email === null || password === null) {
      Alert.alert('Oops', 'Email and Password required');
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          dataTransport.call(user, navigation, 'Role');
        })
        .catch(({ message }) => {
          Alert.alert('Oops', message);
        });
    }
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
          style={customStyle.textInput}
          onChangeText={HandleInputChange('email')}
          name={'email'}
          type={'email'}
          placeholderTextColor={'#718096'}
          placeholder={'Email Address'}
        />
        <TextInput
          style={customStyle.textInput}
          onChangeText={HandleInputChange('password')}
          name={'password'}
          type={'password'}
          placeholderTextColor={'#718096'}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={[customStyle.btn, styles.btnNext]}
          onPress={HandleSignIn}
        >
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
  btnNext: {
    backgroundColor: '#0AC4BA',
  },
});
