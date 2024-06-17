import { StyleSheet, Text, View, BackHandler, ScrollView } from "react-native";
import { Button } from "@rneui/base";
import { useAppContext } from "../AppContext";
import CircularImage from "./CircularImage";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-root-toast";

export default function AttenteJoueursScreen({ navigation }) {
  const { sharedState, partyName } = useAppContext();
  const [documentId, setDocumentId] = useState();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("game")
      .where("name", "==", partyName)
      .onSnapshot(async (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          const playerNames = data.players;

          const playerPromises = playerNames.map(async (playerName) => {
            const playerDoc = await firestore()
              .collection("player")
              .where("name", "==", playerName)
              .get();

            if (!playerDoc.empty) {
              const playerData = playerDoc.docs[0].data();
              return { name: playerData.name, image: playerData.image };
            } else {
              return { name: playerName, image: null }; // Si aucune image n'est trouvée
            }
          });

          const playersWithImages = await Promise.all(playerPromises);
          setPlayers(playersWithImages);
          setDocumentId(snapshot.docs[0].id);
        } else {
          console.log("No matching documents found.");
          setPlayers([]); // Réinitialiser les joueurs si aucun document n'est trouvé
        }
      });

    const backAction = () => {
      // Empêcher la navigation lorsque le bouton de retour est pressé
      return true;
    };

    // Ajouter un écouteur pour le bouton de retour
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Nettoyer l'écouteur lorsque le composant est démonté
    return () => {
      unsubscribe();
      backHandler.remove();
    };
  }, [partyName]);

  const annuler = async () => {
    try {
      // Récupérer l'ID du document correspondant au nom de la partie
      const docId = await getDocumentIdByName("game", "name", partyName);
      if (docId) {
        // Référence au document dans Firestore
        const documentRef = firestore().collection("game").doc(docId);

        // Retirer le joueur du tableau `players`
        await documentRef.update({
          players: firestore.FieldValue.arrayRemove(sharedState.user.uname),
        });

        // Naviguer vers l'écran "Jeux"
        navigation.navigate("Jeux");
      }
    } catch (error) {
      console.error("Error removing player:", error);
    }
  };

  const lancer = async () => {
    try {
      // Vérifier si l'ID du document existe
      if (documentId) {
        // Référence au document dans Firestore
        const documentRef = firestore().collection("game").doc(documentId);

        // Mettre à jour l'attribut "joinstate" à false
        await documentRef.update({ joinstate: false });
      }
    } catch (error) {
      Toast.show(`Error updating joinstate: ${error}`);
    }
  };

  useEffect(() => {
    // Vérifiez si la partie est lancée
    if (documentId) {
      const documentRef = firestore().collection("game").doc(documentId);

      // Utilisez `onSnapshot` pour écouter les mises à jour du document
      const unsubscribe = documentRef.onSnapshot((doc) => {
        const data = doc.data();
        // Si `joinstate` est `false`, naviguez vers l'écran "Choix"
        if (data.joinstate === false) {
          navigation.navigate("Choix");
        }
      });

      // Retirez l'écouteur lorsque le composant est démonté
      return () => unsubscribe();
    }
  }, [documentId]);

  return (
    <View style={styles.game}>
      <Text style={styles.head}>Attente Joueurs...</Text>
      <ScrollView style={styles.scrollView}>
        {players.map((player, index) => (
          <View key={index} style={styles.line}>
            <CircularImage uri={player.image} />
            <Text style={styles.playerName}>{player.name}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.nav}>
        <Button
          title="Annuler"
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
        <Button
          title="Lancer"
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
          onPress={lancer}
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
    marginTop: "40%",
  },
  head: {
    fontSize: 32,
    color: "white",
    marginVertical: "10%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
  },
  scrollView: {
    width: "100%",
  },
  playerName: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    width: "100%",
    marginVertical: 10,
    padding: 10, // Ajout d'un padding pour une meilleure apparence
  },
});
