import React from 'react';
import { Translate } from '../config/i18n';
import {
  StyleSheet,
  Text,
  TextInput,
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
        }}
      >
        <TextInput style={styles.textInput} placeholder={'(+212) 662134122'} />
        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => redirectTo('delivery')}
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
    textAlign: 'center',
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
