import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function CircularImage({uri}) {
  return (
    <View style={styles.container}>
      <Image source={{uri}} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 50, // Set the width of the image
    height: 50, // Set the height of the image
    borderRadius: 50, // Make the border radius half of the width/height to make it circular
    borderWidth: 2, // Optional: Add a border around the image
    borderColor: '#fff', // Optional: Color of the border
  },
});
