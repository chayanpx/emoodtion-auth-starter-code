import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  MyButton,
  MyTextInput,
  MyErrorMessage,
  MyIconButton,
} from "../components";
import Firebase from "../config/Firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const auth = Firebase.auth();

const FirstTimeScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticatedUserContext);
  const [name, setName] = useState("");

  const currentUser = auth.currentUser;

  const onDone = () => {
    currentUser
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        // Update successful
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
    navigation.navigate("Main");
  };

  return (
    <View style={styles.screen}>
      <Text>FirstTime Screen</Text>
      <Text style={styles.title}>Welcome {user.email} !</Text>

      <MyTextInput
        inputStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        placeholder="Enter username"
        autoCapitalize="none"
        autoCorrect={false}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <MyButton
        onPress={onDone}
        backgroundColor="pink"
        title="DONE"
        tileColor="#fff"
        titleSize={16}
        containerStyle={{
          marginBottom: 15,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});

export default FirstTimeScreen;
