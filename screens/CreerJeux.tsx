import {Button} from '@rneui/base';
import {Text} from '@rneui/themed';
import {StyleSheet, View, TextInput} from 'react-native';

export default function CreationScreen() {
  return (
    <View style={styles.game}>
      <Text style={styles.head}>CREATION PARTIE</Text>
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
      />
      <View style={{flexDirection: 'row', marginVertical: 50}}>
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
        />
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
    marginTop: '70%',
  },
  head: {
    fontSize: 32,
    color: 'white',
    marginBottom: '20%',
  },
});
