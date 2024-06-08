/* eslint-disable prettier/prettier */
 import { Button } from '@rneui/base';
import {  Image, StyleSheet,  View } from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAppContext } from '../AppContext';
import Toast from 'react-native-root-toast';


export default function LoginScreen ({navigation}) {
  const { setSharedState, sharedState } = useAppContext();
  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '615748426859-2r48esvgl2l9j2dtss2dlfvoe43o63p3.apps.googleusercontent.com',
    });
    
  },[]);
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken, user } = await GoogleSignin.signIn();
  setSharedState((prevState: any) => ({
    ...prevState,
    user: {
      uname: user.name,
      adresse: user.email,
      uid: user.id,
      image: user.photo,
    },
  }));
  console.log(user.name);

  const userSnapshot = await firestore().collection("player").where("name", "==", user.name).get();


  if (userSnapshot.empty) {
    firestore()
   .collection("player")
   .add({
    name: user.name,
    victoires: 0,
    gamesplayed: 0,
    image: user.photo
   })
   .then(()=> Toast.show('user added!'))
  }else{
    Toast.show('user already exists !')
  }
  
  // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.game}>
      <Image
        source={require('../assets/google.png')} // Assurez-vous que le chemin est correct
        style={styles.logo}
      />
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
    logo: {
      width: 100, // Ajustez la largeur selon vos besoins
      height: 100, // Ajustez la hauteur selon vos besoins
      marginBottom: 20, // Ajoutez un espace entre l'image et le bouton
    },
});
