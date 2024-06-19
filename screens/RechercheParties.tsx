import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/base";
import { useAppContext } from "../AppContext";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-root-toast";

export default function RechercheParties({ navigation }) {
  const { sharedState, setPartyName, setPlayers, setIdGamePlay, idGamePlay } =
    useAppContext();
  //const [idGamePlay, setIdGamePlay] = useAppContext();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("game")
      .onSnapshot(
        (snapshot) => {
          const gamesList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGames(gamesList);
        },
        (error) => {
          Toast.show(`Error fetching games: ${error.message}`, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        }
      );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleGamePress = async (game) => {
    try {
      const { id, players, maxPlayers, name } = game;

      // Vérifier si le joueur existe déjà dans la partie
      if (players.includes(sharedState.user.uname)) {
        Toast.show(`User ${sharedState.user.uname} is already in the game`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });

        // Supprimer le joueur de la liste des joueurs
        const updatedPlayers = players.filter(
          (player) => player !== sharedState.user.uname
        );
        setPlayers(updatedPlayers);
      }

      // Mettre à jour le partyName avec le nom du jeu et setIdGamePlay avec l'ID de la partie
      setPartyName(name);
      setIdGamePlay(id);
      console.log(idGamePlay);

      if (players.length < maxPlayers) {
        // Ajouter le nom de l'utilisateur au tableau `players`
        const updatedPlayers = [...players, sharedState.user.uname];

        // Mettre à jour le document avec le nouveau tableau `players`
        await firestore()
          .collection("game")
          .doc(id)
          .update({ players: updatedPlayers });

        Toast.show(`User ${sharedState.user.uname} added to game ${name}`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });

        navigation.navigate("Attente");
      } else {
        Toast.show(`Game ${name} is already full`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      }
    } catch (error) {
      Toast.show(`Error updating game: ${error.message}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    }
  };

  const annuler = () => {
    navigation.navigate("Jeux");
  };

  return (
    <View style={styles.game}>
      <Text style={styles.head}>Liste des Parties</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        {games.map((game) => (
          <TouchableOpacity
            key={game.id}
            onPress={() => handleGamePress(game)}
            style={styles.line}
          >
            <Text style={styles.playerName}>Nom: {game.name}</Text>
            <Text style={styles.playerName}>
              Max Joueurs: {game.maxPlayers}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.nav}>
        <Button
          title="Retour"
          buttonStyle={{
            backgroundColor: "black",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={annuler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  game: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  nav: {
    flexDirection: "row",
    marginTop: "20%",
  },
  head: {
    fontSize: 32,
    color: "white",
    marginVertical: "10%",
  },
  scrollView: {
    width: "100%",
  },
  container: {
    alignItems: "center",
    paddingBottom: 20, // Add padding at the bottom to prevent last item from being cut off
  },
  playerName: {
    fontSize: 18,
    color: "#fff",
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between", // Add spacing between name and max players
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    width: "75%",
    marginVertical: 5,
    padding: 10,
  },
});
