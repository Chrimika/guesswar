import { Button } from "@rneui/base";
import { Text } from "@rneui/themed";
import { StyleSheet, View, TextInput } from "react-native";
import { useAppContext } from "../AppContext";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-root-toast";

export default function CreationScreen({ navigation }) {
  const { sharedState, partyName, setPartyName, numSoldats, setNumSoldats } =
    useAppContext();

  const isInteger = (value) => {
    return /^[0-9]+$/.test(value);
  };

  const lancer = () => {
    console.log("Nom du jeu:", partyName);
    console.log("Nombre de soldats:", numSoldats);

    if (partyName === "" || numSoldats === "") {
      Toast.show("Remplissez tous les champs");
    } else if (!isInteger(numSoldats)) {
      Toast.show("Le nombre de soldats doit être un entier");
    } else {
      firestore()
        .collection("Jeux")
        .add({
          nomJeux: partyName,
          nbrSoldats: parseInt(numSoldats),
          joueurs: [sharedState.user.uname],
          ready: 0,
        })
        .then((docRef) => {
          console.log("Jeu enregistré!", docRef.id);
          navigation.navigate("Attente");
        })
        .catch((error) => {
          console.error("Erreur lors de la création du jeu: ", error);
          Toast.show("Erreur lors de la création du jeu");
        });
    }
  };

  const annuler = () => {
    setPartyName("");
    setNumSoldats("");
    navigation.navigate("Jeux");
  };

  return (
    <View style={styles.game}>
      <Text style={styles.head}>CREATION PARTIE</Text>
      <Text style={{ color: "white" }}>Nom du jeu</Text>
      <TextInput
        placeholder="Nom du jeu"
        style={styles.input}
        value={partyName}
        onChangeText={setPartyName}
      />
      <Text style={{ color: "white", marginTop: 20 }}>Nombre de soldats</Text>
      <TextInput
        placeholder="Nombre de soldats"
        style={styles.input}
        keyboardType="numeric"
        value={numSoldats}
        onChangeText={setNumSoldats}
      />
      <View style={styles.nav}>
        <Button
          title="Annuler"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={{ fontWeight: "bold" }}
          onPress={annuler}
        />
        <Button
          title="Lancer"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
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
    marginTop: 40,
  },
  head: {
    fontSize: 32,
    color: "white",
    marginVertical: 20,
  },
  input: {
    borderRadius: 5,
    backgroundColor: "black",
    color: "gray",
    width: "80%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
  },
  buttonContainer: {
    width: 150,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
