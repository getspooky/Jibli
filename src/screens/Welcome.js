/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { useEffect } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

/**
 * @export
 * @desc Passing Data Between Screens.
 * @function
 * @name {dataTransport}
 * @param {Object} navigator
 * @param {String} screen
 * @param {Object} options
 * @returns {void}
 */
export function dataTransport(navigator, screen, options = {}) {
  navigator.navigate(screen, {
    _id: this.uid,
    username: this.displayName,
    email: this.email,
    phoneNumber: this.phoneNumber,
  });
}

export default function Welcome(props) {
  /* @var */
  const { navigation } = props;

  /**
   * @desc Runs after the component output has been rendered to the DOM.
   */
  useEffect(function() {
    //isAuthenticated();
  }, []);

  /**
   * @internal
   * @desc Check if the user is already signed in.
   * @function
   * @name {isAuthenticated}
   * @returns {void}
   */
  function isAuthenticated() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user)
        // User is signed in.
        dataTransport.call(user, navigation, 'Role', {
          username: user.displayName,
        });
    });
  }

  /**
   * @internal
   * @desc Look for volunteer deliveryman
   * @function
   * @name {searchVolunteer}
   * @returns {void}
   */
  function searchVolunteer() {
    navigation.navigate('Tracking', null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Become a<Text style={{ color: '#0AC4BA' }}> Volunteer.</Text>
      </Text>
      <Text style={styles.description}>Help at Your Door 💓.</Text>
      <Image
        style={styles.stretch}
        resizeMode="contain"
        source={require('../assets/courier_deliver_kit8_nety.jpg')}
      />
      <TouchableOpacity
        style={[styles.CustomButton]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={{ fontWeight: '500', fontSize: 16, color: '#3B5998' }}>
          <Icon name="sign-in" size={16} color="#3B5998" /> Getting Started
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.CustomButton]} onPress={searchVolunteer}>
        <Text style={{ fontWeight: '500', fontSize: 16, color: '#55ACEE' }}>
          <Icon name="user" size={16} color="#55ACEE" /> Find volunteer
        </Text>
      </TouchableOpacity>
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
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#323643',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 7,
        }
      : {
          elevation: 0.7,
        }),
    borderRadius: 0,
    justifyContent: 'center',
    marginVertical: 10,
    width: '60%',
    padding: 8,
    alignItems: 'center',
  },
});
