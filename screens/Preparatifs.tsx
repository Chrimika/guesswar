import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { useAppContext } from "../AppContext";
import firestore from "@react-native-firebase/firestore";
import { Button } from "@rneui/base"; // Importer Button depuis react-native-elements

const soldierImage = require("../assets/soldier1.png"); // Importer l'image depuis assets
const desertBackground = require("../assets/desert.png"); // Importer l'image de fond depuis assets

export default function Preparatifs() {
  const { partyName } = useAppContext();
  const [positions, setPositions] = useState([]);
  const [nbrSoldats, setNbrSoldats] = useState(0); // État pour le nombre de soldats à afficher
  const [soldiersPlaced, setSoldiersPlaced] = useState(0); // État pour le nombre de soldats placés
  const [readyButtonVisible, setReadyButtonVisible] = useState(false); // État pour l'affichage du bouton "Continuer"
  const [turns, setTurns] = useState([]); // État pour les tours des joueurs

  useEffect(() => {
    fetchNbrSoldats(); // Appel à la fonction pour récupérer nbrSoldats depuis Firestore
  }, []);

  // Fonction pour récupérer nbrSoldats depuis Firestore
  const fetchNbrSoldats = async () => {
    try {
      const jeuRef = firestore()
        .collection("Jeux")
        .where("nomJeux", "==", partyName);
      const snapshot = await jeuRef.get();
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setNbrSoldats(data.nbrSoldats); // Mettre à jour l'état nbrSoldats
      } else {
        console.log("No matching documents.");
      }
    } catch (error) {
      console.error("Error fetching nbrSoldats:", error);
    }
  };

  // Fonction pour placer un soldat à une position spécifique
  const placeSoldier = (event) => {
    if (soldiersPlaced < nbrSoldats) {
      const { locationX, locationY } = event.nativeEvent;
      const newPosition = { left: locationX - 50, top: locationY - 50 }; // Ajuster pour le centre de l'image
      setPositions([...positions, newPosition]);
      setSoldiersPlaced(soldiersPlaced + 1);
    }

    // Afficher le bouton "Continuer" lorsque tous les soldats sont placés
    if (soldiersPlaced === nbrSoldats - 1) {
      setReadyButtonVisible(true);
    }
  };

  // Handler pour le double tap sur une image de soldat
  const handleReady = async () => {
    try {
      const jeuRef = firestore()
        .collection("Jeux")
        .where("nomJeux", "==", partyName);
      const snapshot = await jeuRef.get();
      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        await firestore()
          .collection("Jeux")
          .doc(docId)
          .update({ ready: firestore.FieldValue.increment(1) });

        // Vérifier si ready est maintenant >= 2
        const updatedSnapshot = await jeuRef.get();
        if (!updatedSnapshot.empty) {
          const updatedData = updatedSnapshot.docs[0].data();
          if (updatedData.ready >= 2) {
            // Créer un tableau de maps dans la collection 'tours'
            const players = updatedData.joueurs; // Supposons que vous avez un champ 'joueurs' dans votre document 'Jeux'
            const turns = shuffleTurns(players); // Fonction pour mélanger les tours
            setTurns(turns); // Mettre à jour l'état des tours dans votre composant
            await firestore()
              .collection("tours")
              .add({ players: turns });

            // Afficher un message ou effectuer d'autres actions si nécessaire
          }
        }
        setReadyButtonVisible(false);
      } else {
        console.log("No matching documents.");
      }
    } catch (error) {
      console.error("Error updating ready attribute:", error);
    }
  };

  // Fonction pour mélanger les tours
  const shuffleTurns = (players) => {
    const firstTurn = Math.random() < 0.5; // Choix aléatoire du premier joueur
    return [
      { name: players[0], turn: firstTurn },
      { name: players[1], turn: !firstTurn },
    ];
  };

  // Handler lorsque le joueur à 'turn' true touche l'écran
  const handleTouch = async (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const playerTurn = turns.find((player) => player.turn); // Trouver le joueur avec 'turn' à true
    if (playerTurn) {
      try {
        const tourRef = await firestore()
          .collection("tours")
          .where("name", "==", playerTurn.name)
          .limit(1)
          .get();
        if (!tourRef.empty) {
          const docId = tourRef.docs[0].id;
          await firestore()
            .collection("tours")
            .doc(docId)
            .update({
              position: { x: locationX, y: locationY },
            });
        } else {
          console.log("No matching documents for player turn.");
        }
      } catch (error) {
        console.error("Error updating position:", error);
      }
    }
  };

  return (
    <ImageBackground source={desertBackground} style={styles.background}>
      <View style={styles.container} onTouchEnd={placeSoldier}>
        {positions.map((position, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.imageContainer, position]}
            onPress={handleTouch} // Ajouter l'événement onPress pour enregistrer la position
          >
            <Image source={soldierImage} style={styles.image} />
          </TouchableOpacity>
        ))}
        {readyButtonVisible && (
          <View style={styles.buttonContainer}>
            <Button
              title="Continuer"
              onPress={handleReady}
              buttonStyle={styles.button}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Stretch the image to cover entire container
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "transparent", // Make the background transparent to show desertBackground
  },
  imageContainer: {
    position: "absolute",
    width: 100,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20, // Ajuster selon la taille de votre bouton et vos préférences
    alignSelf: "center",
  },
  button: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    width: 150,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

