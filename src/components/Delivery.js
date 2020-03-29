/*
 * This file is part of the Jibli project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 * (c) react-ui-kit/dribbble2react
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
const { width } = Dimensions.get('screen');

/**
 * @exports
 * @desc List Of Volunteer delivery drivers.
 * @author {Yasser Ameur El Idrissi}
 * @update 27/03/2018
 * @function
 * @name {Delivery}
 * @param {Object} props
 * @returns {Component}
 */
export default function Delivery(props) {
  /* @var  */
  const { item } = props;
  return (
    <TouchableWithoutFeedback key={`parking-${item._id}`}>
      <View style={styles.delivery}>
        <View style={styles.details}>
          <Text style={styles.tranportTitle}>{item.transport}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#7D818A', fontSize: 12 }}>
              <Icon name="whatsapp" size={13} color="#7D818A" />
              {' ' + item.tel}
            </Text>
          </View>
        </View>
        <View style={styles.deliveryContainer}>
          <View style={styles.deliveryInfo}>
            <View style={styles.deliveryIcon}>
              <Icon name="car" size={16} color={'#4a5568'} />
              <Text style={{ fontSize: 10, color: '#7D818A', marginTop: 4 }}>
                {parseFloat(item.km).toFixed(1)}km
              </Text>
            </View>
            <View style={styles.deliveryIcon}>
              <Icon name="link" size={16} color={'#4a5568'} />
              <Text style={{ fontSize: 10, color: '#7D818A', marginTop: 3 }}>
                {parseFloat(item.link / 1000).toFixed(1)}k
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buy}>
            <View style={styles.buyTotal}>
              <Text style={{ color: 'white' }}>Price</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="dollar" size={16 * 1.25} color="white" />
                <Text style={styles.buyTotalPrice}>{'FREE'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  delivery: {
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
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 12 * 2,
    width: width - 24 * 2,
  },
  buy: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12 * 1.5,
    paddingVertical: 12,
    backgroundColor: '#0AC4BA',
    borderRadius: 6,
  },
  buyTotal: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buyTotalPrice: {
    color: 'white',
    fontSize: 12 * 2,
    fontWeight: '600',
    paddingLeft: 12 / 4,
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12 / 2,
    justifyContent: 'space-evenly',
  },
  tranportTitle: {
    fontSize: 16,
    color: '#718096',
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  deliveryContainer: {
    flex: 1.5,
    flexDirection: 'row',
  },
  deliveryInfo: {
    justifyContent: 'space-evenly',
    marginHorizontal: 12 * 1.5,
  },
  payBtn: {
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12 * 1.5,
    backgroundColor: 'red',
  },
  payText: {
    fontWeight: '600',
    fontSize: 12 * 1.5,
    color: 'white',
  },
});
