import { Button } from "@rneui/base";
import { Image, StyleSheet, Text, View } from "react-native";

const Jeux = () => {
    return (
      <View style={styles.game}>
        <Button
              title="Creer partie"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
        />
        <Button
              title="Rejoindre partie"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
            />

      </View>
    );
  };

  const styles = StyleSheet.create({
    game: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
    }
})

  export default Jeux;