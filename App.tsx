import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import JeuxScreen from './screens/Jeux';
import SplashScreen from 'react-native-splash-screen';
import CreationScreen from './screens/CreerJeux';
import {AppProvider} from './AppContext';
import AttenteJoueursScreen from './screens/AttenteJouers';

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Jeux" component={JeuxScreen} />
          <Stack.Screen name="Creer" component={CreationScreen} />
          <Stack.Screen name="Attente" component={AttenteJoueursScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
