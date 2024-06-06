import {StyleSheet, Text, View} from 'react-native';
import {Button} from '@rneui/base';
import {useAppContext} from '../AppContext';
import CircularImage from './CircularImage';


export default function AttenteJoueursScreen({navigation}) {
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
  const annuler = () => {
    navigation.navigate('Creer');
  };
  const lancer = () => {
    console.log('Success')
  };
  return (
    <View style={styles.game}>
      <Text style={styles.head}>Attente Joueurs...</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 10,
          width: '75%',
        }}>
        <CircularImage uri={sharedState.user.image} />
        <Text>{sharedState.user.uname}</Text>
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
});
