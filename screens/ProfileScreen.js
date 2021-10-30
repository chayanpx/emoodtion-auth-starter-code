import React, { useContext } from "react";
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

const ProfileScreen = () => {
  const { user } = useContext(AuthenticatedUserContext);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.title}>Welcome {user.displayName}!</Text>
      <MyIconButton
        name="logout"
        size={50}
        color="#626262"
        onPress={handleSignOut}
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
    marginBottom: 20,
  },
});

export default ProfileScreen;
