/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { useState } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Text,
  TextInput,
  Picker,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { dataTransport } from './Welcome';
import { style as customStyle } from '../styles/global';
import countries from '../data/countries';
const { width } = Dimensions.get('window');

export default function Register(props) {
  /* @state  */
  const [data, setData] = useState({
    username: null,
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
   * @name {HandleSignUp}
   * @returns {void}
   */
  function HandleSignUp() {
    const { username, email, password, country } = data;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            dataTransport.call(user, navigation, 'Configuration', {
              country,
            });
          });
      });
  }

  /**
   * @internal
   * @desc Handle input change.
   * @function
   * @name {HandleInputChange}
   * @param {String} name
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
          alignItems: 'center',
          width: width * 0.6,
        }}
      >
        <TextInput
          style={customStyle.textInput}
          onChange={HandleInputChange('username')}
          name={'username'}
          type={'username'}
          placeholder={'Username'}
        />
        <TextInput
          style={customStyle.textInput}
          onChange={HandleInputChange('email')}
          name={'email'}
          type={'email'}
          placeholder={'Email Address'}
        />
        <TextInput
          style={[customStyle.textInput]}
          onChange={HandleInputChange('password')}
          name={'password'}
          type={'password'}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <Picker
          style={[customStyle.textInput]}
          selectedValue={'Morocco'}
          onValueChange={(itemValue, itemIndex) =>
            setData({ ...data, country: itemValue })
          }
        >
          {listOfCountries}
        </Picker>
        <TouchableOpacity
          style={[customStyle.btn, { backgroundColor: '#0AC4BA' }]}
          onPress={HandleSignUp}
        >
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
        <TouchableOpacity
          style={[styles.customStyle, { marginTop: 20 }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '600',
              color: '#4a5568',
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 11,
          color: '#718096',
          marginTop: 15,
          textAlign: 'center',
        }}
      >
        Terms Of Service
      </Text>
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
});
