/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { StyleSheet, Platform } from 'react-native';

/**
 * @exports
 * @desc Global custom style
 * @var {style}
 * @types {Object}
 */
export const style = StyleSheet.create({
  textInput: {
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#323643',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 7,
        }
      : {
          elevation: 2,
        }),
    backgroundColor: 'white',
    color: '#4a5568',
    padding: 10,
    color: '#4a5568',
    textAlign: 'left',
    fontSize: 13,
    marginTop: 15,
    borderWidth: 0,
    width: '100%',
  },
  btn: {
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
    borderRadius: 6,
    padding: 10,
    marginTop: 15,
    width: '100%',
  },
});
