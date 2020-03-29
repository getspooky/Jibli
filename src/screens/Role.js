/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

export default function Role(props) {
  /* @var */
  const { navigation } = props;

  /**
   * @desc Redirect the current user to Trancking screen.
   * @function
   * @name {redirectTo}
   * @param {string} strategy
   * @returns {void}
   */
  function redirectTo(strategy) {
    if (navigation.state.params.hasOwnProperty('_id'))
      navigation.navigate('Tracking', { strategy, ...navigation.state.params });
    else navigation.navigate('Weclome', null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🖖Hi,
        <Text style={{ color: '#0AC4BA' }}>
          {' ' + navigation.getParam('username')}.
        </Text>
      </Text>
      <Text style={styles.description}>Enjoy The Experience</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={() => redirectTo('delivery')}
        >
          <Image
            style={{ width: 54, height: 54 }}
            resizeMode="contain"
            source={require('../assets/Delivery_-22_4072098.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '600',
              color: '#4a5568',
            }}
          >
            Delivery man
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => redirectTo('client')}
        >
          <Image
            style={{ width: 54, height: 45 }}
            resizeMode="contain"
            source={require('../assets/client_12-Mask_5929232.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '600',
              paddingTop: 10,
              color: '#4a5568',
            }}
          >
            Client
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
    fontSize: 16,
    padding: 8,
  },
  card: {
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
    padding: 17,
    marginTop: 15,
    marginRight: 10,
  },
});
