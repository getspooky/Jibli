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
import { Auth as HandleSignIn } from '../authentication';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GitHubUrl } from '../data/links';
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
    navigation.navigate('Configuration', {
      _id: this.uid,
      name: this.displayName,
      email: this.email,
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
      if (user)
        // User is signed in.
        dataTransport.call(user);
    });
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
        onPress={() => navigator.navigate('Login')}
      >
        <Text style={{ fontWeight: '500', fontSize: 15, color: '#3B5998' }}>
          <Icon name="sign-in" size={15} color="#3B5998" /> Getting Started
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.CustomButton]}
        onPress={() => Linking.openURL(GitHubUrl || '')}
      >
        <Text style={{ fontWeight: '500', fontSize: 15, color: '#1a202c' }}>
          <Icon name="github" size={15} color="#1a202c" /> Contribute on GitHub
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 10, color: '#718096', marginTop: 9 }}>
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
    borderRadius: 1,
    justifyContent: 'center',
    marginVertical: 10,
    width: '60%',
    padding: 8,
    alignItems: 'center',
  },
});
