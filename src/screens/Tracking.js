import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, FlatList } from 'react-native';
import firebase from 'firebase';
import Database from '../config/firebaseInit';
import MapView, { Marker } from 'react-native-maps';
import Delivery from '../components/Delivery';
import mapStyle from '../data/mapStyle.js';

const { height, width } = Dimensions.get('screen');

export default function Tracking(props) {
  /* @state */
  const [location, setLocation] = useState(null);
  const [info, setInfo] = useState([]);

  /* @var */
  const user = firebase.auth().currentUser;
  const { navigation } = props;

  /**
   * @desc Runs after the component output has been rendered to the DOM.
   */
  useEffect(function() {
    if (user) {
      if (navigation.getParam('strategy') == 'delivery') setDBLocation();
    }
    initUserGeoLocal();
    getAllLocations();
  }, []);

  /**
   * @desc Get Users Locations
   * @function
   * @name {getAllLocations}
   * @returns {void}
   */
  function getAllLocations() {
    Database.collection('information')
      .get()
      .then(querySnapshot => {
        if (querySnapshot)
          querySnapshot.forEach(function(doc) {
            // set current geolocation of the user.
            setInfo([doc.data()]);
          });
      });
  }

  /**
   * @desc Update Information collection
   * @function
   * @name {setDBLocation}
   * @returns {void}
   */
  function setDBLocation() {
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
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        region={location}
        minZoomLevel={3}
        style={styles.map}
        customMapStyle={mapStyle}
      >
        {info.map(marker => (
          <Marker coordinate={marker.location} />
        ))}
      </MapView>
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.deliveryList}
        data={info}
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
});
