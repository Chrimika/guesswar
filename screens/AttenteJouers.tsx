import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/base';
import {useAppContext} from '../AppContext';
import CircularImage from './CircularImage';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import { Line } from 'react-native-svg';

export default function AttenteJoueursScreen({navigation}) {
  const {sharedState, partyName, setPlayers, players} = useAppContext();

  const [documentIdd, setDocumentIdd] = useState();

  async function getDocumentIdByName(collectionName, fieldName, value) {
    try {
      const snapshot = await firestore()
        .collection(collectionName)
        .where(fieldName, '==', value)
        .get();

      if (!snapshot.empty) {
        const document = snapshot.docs[0];
        const documentId = document.id;
        setDocumentIdd(documentId);
        return documentId;
      } else {
        console.log('No matching documents found.');
        return null;
      }
    } catch (error) {
      console.error('Error getting document ID by name:', error);
    }
  }

  useEffect(() => {
    const fetchDocumentIdAndListenForChanges = async () => {
      const docId = await getDocumentIdByName('game', 'name', partyName);
      if (docId) {
        const documentRef = firestore().collection('game').doc(docId);

        const unsubscribe = documentRef.onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) {
            const playersData = documentSnapshot.data().players;
            setPlayers(playersData);
          } else {
            console.log('Document does not exist.');
          }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
      }
    };

    fetchDocumentIdAndListenForChanges();
  }, [partyName, setPlayers]);

  const annuler = () => {
    navigation.navigate('Creer');
  };

  const lancer = () => {
    console.log('Success');
  };

  return (
    <View style={styles.game}>
      <Text style={styles.head}>Attente Joueurs...</Text>
      <View style={styles.line}>
        <CircularImage uri={sharedState.user.image} />
        <Text>{sharedState.user.uname}</Text>
      </View>
      <View style={styles.container}>
        {players.map((player, index) => (
          <Text key={index} style={styles.line}>
            {player}
          </Text>
        ))}
      </View>
      <View style={styles.nav}>
        <Button
          title="Annuler"
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          titleStyle={{fontWeight: 'bold'}}
          onPress={annuler}
        />
        <Button
          title="Lancer"
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          titleStyle={{fontWeight: 'bold'}}
          onPress={lancer}
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
  nav: {
    flexDirection: 'row',
    marginTop: '40%',
  },
  head: {
    fontSize: 32,
    color: 'white',
    marginVertical: '10%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  playerName: {
    fontSize: 18,
    color: '#fff',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    width: '75%',
  },
});
