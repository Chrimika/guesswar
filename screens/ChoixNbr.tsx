import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, BackHandler } from 'react-native';
import { Button } from '@rneui/base';
import { useAppContext } from '../AppContext';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-root-toast';

const ChoixNombre = ({ navigation }) => {
  const { sharedState, partyName, idGamePlay } = useAppContext();
  const [chosenNumber, setChosenNumber] = useState('');
  const [minInterval, setMinInterval] = useState(0);
  const [maxInterval, setMaxInterval] = useState(100);
  const [countdown, setCountdown] = useState(20); // Délai initial en secondes
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const fetchInterval = async () => {
      try {
        const gameRef = firestore().collection('game').where('name', '==', partyName);
        const snapshot = await gameRef.get();
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setMinInterval(data.minInterval);
          setMaxInterval(data.maxInterval);
        } else {
          console.log('No matching document found for partyName:', partyName);
        }
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchInterval();

    // Démarrer le compte à rebours
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // Gestion du timeout pour l'éjection automatique après 20 secondes
    const timeout = setTimeout(() => {
      handleTimeout();
    }, 20000);

    setTimeoutId(timeout);

    // Nettoyer le timer et le timeout lors du démontage du composant
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  const handleTimeout = async () => {
    try {
        console.log(idGamePlay);
      const gameRef = firestore().collection('game').doc(idGamePlay);

      await gameRef.update({
        players: firestore.FieldValue.arrayRemove(sharedState.user.uname),
      });

      Toast.show('Temps écoulé. Vous avez été retiré de la partie.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });

      navigation.navigate('Jeux');
    } catch (error) {
      console.error('Error removing player:', error);
    }
  };

  const handleSubmit = async () => {
    // Vérifier que chosenNumber est un nombre entier
    const num = parseInt(chosenNumber);
    if (!isNaN(num) && num >= minInterval && num <= maxInterval) {
      try {
        const gameRef = firestore().collection('game').doc(idGamePlay);

        // Ajouter le choix du joueur dans le tableau `choices` du document `game`
        await gameRef.update({
          choices: firestore.FieldValue.arrayUnion({
            name: sharedState.user.uname,
            number: num,
          }),
        });

        Toast.show('Choix enregistré avec succès !', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });

        navigation.navigate('Manche');
      } catch (error) {
        console.error('Error updating choices:', error);
        Toast.show('Erreur lors de l\'enregistrement du choix.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      }
    } else {
      Toast.show(`Choisissez un nombre entre ${minInterval} et ${maxInterval}.`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  const handleBackButton = () => {
    // Bloquer le bouton de retour matériel pendant le choix
    return true;
  };

  // Ajouter un écouteur pour le bouton de retour
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => backHandler.remove();
  }, []);

  // Gérer la navigation lorsque countdown atteint 0
  useEffect(() => {
    if (countdown === 0) {
      handleSubmit();
    }
  }, [countdown]);

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Choix du Nombre</Text>
      <Text>Intervalle: {minInterval} - {maxInterval}</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez votre nombre"
        keyboardType="numeric"
        value={chosenNumber}
        onChangeText={setChosenNumber}
      />
      <Text style={styles.countdown}>{countdown} secondes restantes</Text>
      <Button
        title="Valider"
        onPress={handleSubmit}
        buttonStyle={{
          backgroundColor: 'black',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
          marginVertical: 20,
        }}
        containerStyle={{ width: 150 }}
        titleStyle={{ fontWeight: 'bold' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  head: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: 'black',
    color: 'gray',
    borderRadius: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    textAlign: 'center',
    marginVertical: 10,
  },
  countdown: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
});

export default ChoixNombre;
