import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button, ButtonGroup,  withTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import Jeux from './Jeux';


const SplashScreen = () => {
  return (
    <View style={styles.splashScreen}>
      <Image
        source={require('./assets/splash.png')}
        style={styles.splashImage}
      />
      <Text style={styles.loading}>
        Loading ...
      </Text>
    </View>
  );
};

const HelloWorldApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <Jeux />;
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  splashImage: {
    width: '100%', // ajustez la largeur de l'image selon vos besoins
    height: '100%', // ajustez la hauteur de l'image selon vos besoins
    resizeMode: 'contain', // ajustez le mode de redimensionnement selon vos besoins
  },
  mainApp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  loading: {
    fontSize: 20,
    color: "white",
    marginBottom: "8%"
  }
});

export default HelloWorldApp;
