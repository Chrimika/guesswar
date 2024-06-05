/* eslint-disable prettier/prettier */
 import { Button } from '@rneui/base';
import {  StyleSheet,  View } from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';

export default function LoginScreen ({navigation}) {

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '615748426859-2r48esvgl2l9j2dtss2dlfvoe43o63p3.apps.googleusercontent.com',
    });
  },[]);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
  }

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
              onPress={() => onGoogleButtonPress().then(() => navigation.navigate('Jeux'))}
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
