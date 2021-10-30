import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MyButton } from "../components";

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text style={{ marginBottom: 40 }}>Landing Screen</Text>
      <MyButton
        onPress={() => {
          navigation.navigate("SignIn");
        }}
        backgroundColor="pink"
        title="SIGN IN"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />
      <MyButton
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        backgroundColor="pink"
        title="SIGN UP"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
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
});

export default LandingScreen;
