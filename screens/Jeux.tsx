/* eslint-disable prettier/prettier */
import { Button } from '@rneui/base';
import { StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../AppContext';
import React, { useEffect } from 'react';
import CircularImage from './CircularImage';
import firestore from '@react-native-firebase/firestore';

export default function JeuxScreen({ navigation }) {
  const { sharedState } = useAppContext();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('game')
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.players && data.players.length === 0) {
            firestore().collection('game').doc(doc.id).delete()
              .then(() => {
                console.log(`Deleted game with ID: ${doc.id} because it had no players`);
              })
              .catch((error) => {
                console.error(`Error deleting game with ID: ${doc.id}`, error);
              });
          }
        });
      });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  return (
    <View style={styles.game}>
      <View style={styles.info}>
      <CircularImage uri={sharedState.user.image} />
        <Text style={styles.welcomeText}>1 V 1</Text>
        
      </View>
      <View style={styles.btn}>
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
          onPress={() => navigation.navigate('Creer')}
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
          onPress={() => navigation.navigate('RechercheParties')}
        />
      </View>
      
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
    flex:3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 28,
    marginBottom: 10,
  },
  btn: {
    flex: 1,
  }
});
