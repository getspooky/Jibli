import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import Database from '../config/firebaseInit';
import MapView, { Marker } from 'react-native-maps';
import Delivery from '../components/Delivery';
import mapStyle from '../data/mapStyle.js';

const { height, width } = Dimensions.get('screen');

export default function Tracking(props) {
  /* @state */
  const [location, setLocation] = useState({});
  const [info, setInfo] = useState([]);

  /* @var */
  const user = firebase.auth().currentUser;
  const { navigation } = props;

  /**
   * @useEffect
   * @desc Runs after the component output has been rendered to the DOM.
   */

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      if (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    });
    Database.collection('information')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));
        setInfo(data);
      });
  }, []);

  /**
   * @desc Update Information collection
   * @function
   * @name {setDBLocation}
   * @returns {void}
   */
  function setDBLocation() {
    if (navigation.getParam('_id') !== undefined) {
      Database.collection('information')
        .where('_idUser', '==', navigation.getParam('_id'))
        .limit(1)
        .get()
        .then(querySnapshot => {
          if (querySnapshot)
            querySnapshot.forEach(function(doc) {
              // set current geolocation of the user.
              doc.ref.update({
                location: {
                  latitude: parseFloat(location.latitude),
                  longitude: parseFloat(location.longitude),
                },
              });
              Alert.alert('Great', 'Thank you for your contribution ✌');
            });
        });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={setDBLocation} style={styles.iconMaps}>
        <Icon name="link" size={16 * 1.25} color="#2d3748" />
      </TouchableOpacity>
      <MapView
        region={location}
        minZoomLevel={3}
        style={styles.map}
        customMapStyle={mapStyle}
      >
        {info
          .filter(
            ele =>
              ele.hasOwnProperty('location') &&
              Object.keys(ele.location).length !== 0,
          )
          .map(marker => (
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
  iconMaps: {
    backgroundColor: '#fff',
    width: 35,
    height: 35,
    borderRadius: 50,
    position: 'absolute',
    top: 40,
    right: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
});
