/* eslint-disable prettier/prettier */
 import { Button } from '@rneui/base';
import {  StyleSheet,  View } from 'react-native';


export default function LoginScreen ({navigation}) {
    return (
      <View style={styles.game}>
        <Button
              title="Login"
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
              onPress={() => navigation.navigate("Jeux")}
        />
      </View>
    );
  }
  const styles = StyleSheet.create({
    game: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
});
