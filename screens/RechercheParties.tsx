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
  const [games, setGames] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("Jeux")
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
      const { id, joueurs, nomJeux } = game;

      // Vérifier si le joueur existe déjà dans la partie
      if (joueurs.includes(sharedState.user.uname)) {
        Toast.show(`Vous faites déjà partie de la partie ${nomJeux}`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
        return; // Sortir de la fonction si le joueur est déjà dans la partie
      }

      // Vérifier si la partie est complète (maximum 2 joueurs)
      if (joueurs.length >= 2) {
        Toast.show(`La partie ${nomJeux} est déjà complète`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
        return; // Sortir de la fonction si la partie est complète
      }

      // Mettre à jour le partyName avec le nom du jeu et setIdGamePlay avec l'ID de la partie
      setPartyName(nomJeux);
      setIdGamePlay(id);

      // Ajouter le nom de l'utilisateur au tableau `joueurs`
      const updatedPlayers = [...joueurs, sharedState.user.uname];

      // Mettre à jour le document avec le nouveau tableau `joueurs`
      await firestore()
        .collection("Jeux")
        .doc(id)
        .update({ joueurs: updatedPlayers });

      setPlayers(updatedPlayers);

      Toast.show(`Vous avez rejoint la partie ${nomJeux}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });

      navigation.navigate("Attente");
    } catch (error) {
      Toast.show(`Erreur lors de la mise à jour de la partie: ${error.message}`, {
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
            <Text style={styles.playerName}>Nom: {game.nomJeux}</Text>
            <Text style={styles.playerName}>
              Nombre de Soldats: {game.nbrSoldats}
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
    fontSize: 13,
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
