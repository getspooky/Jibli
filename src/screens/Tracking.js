import React from 'react';
import { StyleSheet, Dimensions, Text, View, FlatList } from 'react-native';
import Delivery from '../components/Delivery';
const { height, width } = Dimensions.get('screen');
import data from '../data/fake.js';

export default function Tracking() {
  return (
    <View style={styles.container}>
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
});
