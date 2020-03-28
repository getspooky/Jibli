import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Delivery from '../components/Delivery';
import Database from '../config/firebaseInit';
const { height, width } = Dimensions.get('screen');
import data from '../data/fake.js';

export default function Tracking(props) {
  /* @var */
  const { navigation } = props;

  /**
   * @desc Update Information collection
   * @function
   * @name {setDBLocation}
   * @param {Object} location
   * @returns {void}
   */
  function setDBLocation(location) {
    Database.collection('information')
      .where('_idUser', '==', navigation.getParam('_id'))
      .limit(1)
      .get()
      .then(querySnapshot => {
        if (querySnapshot)
          querySnapshot.forEach(function(doc) {
            // set current geolocation of the user.
            doc.ref.update({
              location,
            });
          });
        else new TypeError('Account does not exists');
      });
  }

  /**
   * @desc Set the User geographical location
   * @function
   * @name {initUserGeoLocal}
   * @returns {void}
   */
  function initUserGeoLocal() {
    navigator.geolocation.getCurrentPosition(position => {
      setDBLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.localisation} onPress={initUserGeoLocal}>
        <Icon name="map-marker" size={20} color="#4a5568" />
      </TouchableOpacity>
      {/*<MapView 
        region={currentPosition}
        style={styles.map} 
       />*/}
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.deliveryList}
        data={data.deliveryList}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => <Delivery item={item} />}
      />
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
  map: {
    flex: 1,
    width: width,
    height: height,
  },
  deliveryList: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: 12 * 2,
  },
  localisation: {
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
    borderRadius: 40,
    position: 'absolute',
    top: 20,
    right: 20,
    justifyContent: 'center',
    width: 40,
    height: 40,
    padding: 10,
    alignItems: 'center',
  },
});
