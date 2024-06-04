// import React, {useState, useEffect} from 'react';
// import {Text, View, StyleSheet, Image} from 'react-native';
// import {Button} from '@rneui/base';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// const Stack = createStackNavigator();

// const SplashScreen = () => {
//   return (
//     <View style={styles.splashScreen}>
//       <Image
//         source={require('./assets/splash.png')}
//         style={styles.splashImage}
//       />
//       <Text style={styles.loading}>Loading ...</Text>
//     </View>
//   );
// };

// const HelloWorldApp = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000); // 10 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return <SplashScreen />;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Jeux" component={Jeux} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const Login = (navigation) => {
//   return (
//     <View style={styles.mainApp}>
//       <Button
//         title="Login"
//         buttonStyle={{
//           backgroundColor: 'black',
//           borderWidth: 2,
//           borderColor: 'white',
//           borderRadius: 30,
//         }}
//         containerStyle={{
//           width: 200,
//           marginHorizontal: 50,
//           marginVertical: 10,
//         }}
//         titleStyle={{fontWeight: 'bold'}}
//         onPress={() => navigation.navigate('Jeux')}
//       />
//     </View>
//   );
// };

// const Jeux = () => {
//   return (
//     <View style={styles.mainApp}>
//       <Button
//         title="Login"
//         buttonStyle={{
//           backgroundColor: 'black',
//           borderWidth: 2,
//           borderColor: 'white',
//           borderRadius: 30,
//         }}
//         containerStyle={{
//           width: 200,
//           marginHorizontal: 50,
//           marginVertical: 10,
//         }}
//         titleStyle={{fontWeight: 'bold'}}
//       />

//       <Button
//         title="Login"
//         buttonStyle={{
//           backgroundColor: 'black',
//           borderWidth: 2,
//           borderColor: 'white',
//           borderRadius: 30,
//         }}
//         containerStyle={{
//           width: 200,
//           marginHorizontal: 50,
//           marginVertical: 10,
//         }}
//         titleStyle={{fontWeight: 'bold'}}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   splashScreen: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000000',
//   },
//   splashImage: {
//     width: '100%', // ajustez la largeur de l'image selon vos besoins
//     height: '100%', // ajustez la hauteur de l'image selon vos besoins
//     resizeMode: 'contain', // ajustez le mode de redimensionnement selon vos besoins
//   },
//   mainApp: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   loading: {
//     fontSize: 20,
//     color: 'white',
//     marginBottom: '8%',
//   },
// });

// export default HelloWorldApp;

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import JeuxScreen from './screens/Jeux';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Jeux" component={JeuxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
