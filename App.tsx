import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import JeuxScreen from './screens/Jeux';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    },500);
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Jeux" component={JeuxScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
