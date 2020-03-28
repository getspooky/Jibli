/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component, useEffect } from 'react';
import firebase from 'firebase';
import { Auth as HandleSignIn } from '../authentication';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

export default function Welcome(props) {
  /* @var */
  const { navigation } = props;

  /**
   * @desc Runs after the component output has been rendered to the DOM.
   */
  useEffect(function() {
    isAuthenticated();
  }, []);

  /**
   * @internal
   * @desc Passing Data Between Screens.
   * @function
   * @name {dataTransport}
   * @returns {void}
   */
  function dataTransport() {
    navigation.navigate('Role', {
      _id: this.uid,
      name: this.displayName,
      avatar: this.photoURL,
      email: this.email,
      phoneNumber: this.phoneNumber,
    });
  }

  /**
   * @internal
   * @desc Check if the user is already signed in.
   * @function
   * @name {isAuthenticated}
   * @returns {void}
   */
  function isAuthenticated() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) console.log(navigation);
      // User is signed in.
      dataTransport.call(user);
    });
  }

  /**
   * @internal
   * @desc Authenticate action.
   * @function
   * @name {SignIn}
   * @param {string} strategy
   * @returns {Component | void}
   */
  function SignIn(strategy) {
    switch (strategy) {
      case 'facebook':
        HandleSignIn(new firebase.auth.FacebookAuthProvider()).then(user =>
          dataTransport.call(user),
        );
      case 'twitter':
        return HandleSignIn(
          new firebase.auth.TwitterAuthProvider(),
        ).then(() => {});
      default:
        console.error(`Please choose valid strategy`);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Text
        <Text style={{ color: '#0AC4BA' }}> Text.</Text>
      </Text>
      <Text style={styles.description}>Enjoy the experience.</Text>
      <Image
        style={styles.stretch}
        resizeMode="contain"
        source={require('../assets/courier_deliver_kit8_nety.jpg')}
      />
      <TouchableOpacity
        style={[styles.CustomButton]}
        onClick={() => SignIn('facebook')}
      >
        <Text style={{ fontWeight: '500', fontSize: 15, color: '#3B5998' }}>
          <Icon name="facebook" size={15} color="#3B5998" /> Login with Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.CustomButton]}
        onClick={() => SignIn('twitter')}
      >
        <Text style={{ fontWeight: '500', fontSize: 15, color: '#55ACEE' }}>
          <Icon name="twitter" size={15} color="#55ACEE" /> Login with Twitter
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 8, color: '#718096', marginTop: 9 }}>
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
    fontSize: 16,
    padding: 8,
  },
  stretch: {
    width: width,
    height: height / 2,
    overflow: 'visible',
  },
  CustomButton: {
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
    borderRadius: 1,
    justifyContent: 'center',
    marginVertical: 10,
    width: '60%',
    padding: 8,
    alignItems: 'center',
  },
});
