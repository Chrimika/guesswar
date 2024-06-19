import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Manche = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default Manche;
