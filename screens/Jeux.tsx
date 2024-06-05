/* eslint-disable prettier/prettier */
import { Button } from '@rneui/base';
import {  StyleSheet,  View } from 'react-native';

export default function JeuxScreen({navigation}) {
return (
  <View style={styles.game}>
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
});
