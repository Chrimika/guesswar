import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/base';
import {useAppContext} from '../AppContext';
import CircularImage from './CircularImage';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function RechercheParties({navigation}) {
  const {sharedState, partyName, setPlayers, players} = useAppContext();

  const [documentIdd, setDocumentIdd] = useState();

  useEffect(() => {
    const fetchDocumentIdAndListenForChanges = async () => {

    };

    fetchDocumentIdAndListenForChanges();
  }, [partyName, setPlayers]);

  const annuler = () => {
    navigation.navigate('Jeux');
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
          title="Sortir"
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
