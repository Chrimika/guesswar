/* eslint-disable prettier/prettier */
import { Button } from '@rneui/base';
import {  StyleSheet,  Text,  View } from 'react-native';
import { useAppContext } from '../AppContext';
import React from 'react';
import CircularImage from './CircularImage';

export default function JeuxScreen({navigation}) {
  const {sharedState} = useAppContext();
return (
  <View style={styles.game}>
    <View style={styles.info}>
    <Text>Welcome, {sharedState.user ? sharedState.user.uname : 'Guest'}!</Text>
    <CircularImage uri={sharedState.user.image} />
    </View>
    
    <Button
          title="Créer partie"
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={()=>navigation.navigate('Creer')}
    />

    <Button
          title="Rejoindre partie"
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={()=>navigation.navigate('RechercheParties')}
    />
  </View>
);
  }
  const styles = StyleSheet.create({
    game: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
    },
    info: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10%',
    }
});
