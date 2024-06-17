import { StyleSheet, Text, TextInput, View, BackHandler } from "react-native";
import { Button } from "@rneui/base";
import { useAppContext } from "../AppContext";
import CircularImage from "./CircularImage";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function Manche({ navigation }) {
  const { sharedState, partyName } = useAppContext();
  const { numPlayer, setNumPlayer, idGamePlay } = useAppContext();
  const [counter, setCounter] = useState(60); // Temps en secondes
  const [timerRunning, setTimerRunning] = useState(true);

  

  return (
    <View style={styles.game}>
      <Text style={styles.head}>Choix du Nombre</Text>
      <Text style={styles.timer}>{counter}</Text>
      <TextInput
        placeholder="Choisir Nombre"
        style={{
          borderRadius: 5,
          backgroundColor: "black",
          color: "gray",
          width: "50%",
          borderBottomColor: "white",
          borderBottomWidth: 1,
          textAlign: "center",
          marginTop: "15%",
        }}
        keyboardType="numeric"
        value={numPlayer}
        onChangeText={setNumPlayer}
      />
      <Button
        title="Valider"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
          marginVertical: 25,
        }}
        containerStyle={{
          width: 150,
          marginHorizontal: 20,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: "bold" }}
      />
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
  head: {
    fontSize: 32,
    color: "white",
    marginVertical: "10%",
  },
  timer: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
});
