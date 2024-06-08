import {Button} from '@rneui/base';
import {Text} from '@rneui/themed';
import {StyleSheet, View, TextInput} from 'react-native';
import {useAppContext} from '../AppContext';
import firestore from '@react-native-firebase/firestore';

export default function CreationScreen({navigation}) {
  const {
    sharedState,
    partyName,
    setPartyName,
    intervalMin,
    setIntervalMin,
    intervalMax,
    setIntervalMax,
    numPlayers,
    setNumPlayers,
  } = useAppContext();
  const playerShow = {
    name: '',
    picture: ''
  }

  const lancer = () => {
    console.log('Nom de la partie:', partyName);
    console.log('Intervale Min:', intervalMin);
    console.log('Intervale Max:', intervalMax);
    console.log('Nombre de joueurs:', numPlayers);
    if (
      partyName === '' ||
      intervalMin === '' ||
      intervalMax === '' ||
      numPlayers === ''
    ) {
      console.log('Informations indefinie');
    } else if (intervalMin >= intervalMax) {
      console.log('intervales non valide');
    } else {
      firestore()
        .collection('game')
        .add({
          name: partyName,
          minInterval: intervalMin,
          maxInterval: intervalMax,
          creatorName: sharedState.user.uname,
          maxPlayers: numPlayers,
          players: [sharedState.user.uname],
          joinstate: true,
        })
        .then(() => console.log('Game registered!'));
      navigation.navigate('Attente');
    }
  };

  const annuler = () => {
    setPartyName('');
    setIntervalMin('');
    setIntervalMax('');
    setNumPlayers('');
    navigation.navigate('Jeux');
  };

  return (
    <View style={styles.game}>
      <Text style={styles.head}>CREATION PARTIE</Text>
      <Text style={{color: 'white'}}>Nom partie</Text>
      <TextInput
        placeholder="Nom Partie"
        style={{
          borderRadius: 5,
          backgroundColor: 'black',
          color: 'gray',
          width: '80%',
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          textAlign: 'center',
          marginHorizontal: 20,
        }}
        value={partyName}
        onChangeText={setPartyName}
      />
      <Text style={{color: 'white', marginTop: '10%'}}>intervale</Text>
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        <TextInput
          placeholder="nbr_min"
          style={{
            borderRadius: 5,
            backgroundColor: 'black',
            color: 'gray',
            width: '30%',
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            textAlign: 'center',
          }}
          keyboardType="numeric"
          value={intervalMin}
          onChangeText={setIntervalMin}
        />
        <TextInput
          placeholder="nbr_max"
          style={{
            borderRadius: 5,
            backgroundColor: 'black',
            color: 'gray',
            width: '30%',
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            textAlign: 'center',
            marginHorizontal: 20,
          }}
          keyboardType="numeric"
          value={intervalMax}
          onChangeText={setIntervalMax}
        />
      </View>
      <TextInput
        placeholder="Nbr de joueurs"
        style={{
          borderRadius: 5,
          backgroundColor: 'black',
          color: 'gray',
          width: '30%',
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          textAlign: 'center',
          marginTop: '15%',
        }}
        keyboardType="numeric"
        value={numPlayers}
        onChangeText={setNumPlayers}
      />
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
});
