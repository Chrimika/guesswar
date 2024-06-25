/* eslint-disable prettier/prettier */
import { Button } from '@rneui/base';
import { StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../AppContext';
import React, { useEffect } from 'react';
import CircularImage from './CircularImage';
import firestore from '@react-native-firebase/firestore';

export default function Menu({ navigation }) {
  const { sharedState } = useAppContext();

  return (
    <View style={styles.game}>
      <View style={styles.info}>
        
        <Text style={styles.welcomeText}>Welcome, {sharedState.user ? sharedState.user.uname : 'Guest'}!</Text>
        <View style={styles.imageContainer}>
          <CircularImage uri={sharedState.user.image} />
        </View>
      </View>
      <View style={styles.title}>
        <Text style={{fontSize: 30, color: "white"}}>Game Mode</Text> 
      </View>
      <View style={styles.viewMid}>
        <Text>Embark on a quest for dominance in a world torn apart by conflict, where strategic alliances and cunning tactics will be your only hope for survival. Engage in epic battles against formidable foes, both human and artificial, and emerge victorious to claim your rightful place among the greatest warlords of all time.</Text>
      </View>
      <View style={styles.view2}>
      <Button
        title="Solo"
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
        title="1 v 1"
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
        onPress={() => navigation.navigate('Jeux')}
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
    flex:0.4,
    alignItems: "center",
    flexDirection: "row",
  },
  welcomeText: {
    color: '#fff',
    fontSize: 10,
  },
  imageContainer: {
    
  },
  view2: {
    flex:1
  },
  viewMid: {
    flex:2,
    justifyContent: "center",
    alignItems: "center",
    padding:20,
  },
  title:{
    flex:0.2,
    marginTop: 30,
  }
});
