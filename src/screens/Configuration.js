/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { useState, useEffect } from 'react';
import Database from '../config/firebaseInit';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { styles as customStyle } from '../styles/global';
const { width } = Dimensions.get('window');

export default function Role(props) {
  /* @state  */
  const [phone, setPhone] = useState({ number: null });

  /* @var */
  const { navigation } = props;

  /**
   * @desc Runs after the component output has been rendered to the DOM.
   */
  useEffect(function() {
    informationAlreadyAdded();
  });

  /**
   * @internal
   * @desc Check if the user information already added.
   * @function
   * @name {informationAlreadyAdded}
   * @returns {void}
   */
  function informationAlreadyAdded() {
    Database.collection('information')
      .where('_idUser', '==', navigation.getParam('_id'))
      .limit(1)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size === 1)
          navigation.navigate('Role', {
            ...navigation.state.params,
          });
        else new TypeError('Account does not exists');
      });
  }

  /**
   * @internal
   * @desc Save WhatsApp phone number and redirect the user to tracking screen.
   * @function
   * @name {redirectTo}
   * @returns {void}
   */
  function saveConfiguration() {
    if (!navigation.state.params.hasOwnProperty('_id'))
      navigation.navigate('Weclome', null);
    if (phone !== null) {
      Database.collection('information')
        .add({
          phone: phone.number,
          _idUser: navigation.getParam('_id'),
        })
        .then(docRef => {
          navigation.navigate('Role', {
            ...navigation.state.params,
          });
        });
    }
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🕵 First
        <Text style={{ color: '#0AC4BA' }}> Step.</Text>
      </Text>
      <Text style={styles.description}>
        Please Add your WhatsApp Phone Number
      </Text>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          width: width * 0.6,
        }}
      >
        <TextInput
          style={customStyle.textInput}
          onChangeText={HandleInputChange('number')}
          type={'tel'}
          placeholder={'(+212) 662134122'}
        />
        <TouchableOpacity
          style={[customStyle.btn, { backgroundColor: '#0AC4BA' }]}
          onPress={() => saveConfiguration()}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Next
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
});
