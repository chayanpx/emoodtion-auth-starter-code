import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MyButton } from "../components";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";

import Firebase, { db } from "../config/Firebase";
// import careCenter from "../data/carecenter.json";
// import moodoftest from "../data/moodoftest.json";

const LandingScreen = ({ navigation }) => {
  const { colors } = useTheme();

  // const care_center = careCenter;
  // const mood = moodoftest;

  const getData = () => {
    // db.collection("care_center")
    //   .onSnapshot(
    //     {
    //       includeMetadataChanges: true,
    //     },
    //     (querySnapshot) => {
    //       const care_center = [];
    //       querySnapshot.forEach((doc) => {
    //         let doc_id = doc.id;
    //         care_center.push({ ...doc.data(), doc_id });
    //       });
    //       console.log(care_center);
    //     }
    //   );
  };
  const addData = () => {
    // db.collection("care_center").doc(item.doc_id).collection("reviews").add({
    //   auth_id: auth_id,
    //   username: username,
    //   avatarURL: avatarURL,
    //   review: review,
    //   like: true,
    //   create_at: new Date(),
    // });
    // mood.forEach((item) => {
    //   db.collection("mood")
    //     .add(item)
    //     .then((docRef) => {
    //       console.log("Document written ID: ", docRef.id);
    //     })
    //     .catch((error) => {
    //       console.error("Error adding document: ", error);
    //     });
    // });
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#E2F0FB", "#FFE6E6", "#F0E4EB"]}
        style={styles.background}
      />
      {/* <MyButton
        onPress={getData}
        backgroundColor={colors.primary}
        title="GET DATA"
        color="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      /> */}
      {/* <MyButton
        onPress={addData}
        backgroundColor={colors.primary}
        title="ADD DATA"
        color="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      /> */}
      <Text style={{ marginVertical: 200 }}>Landing Screen</Text>
      <MyButton
        onPress={() => {
          navigation.navigate("SignIn");
        }}
        backgroundColor={colors.primary}
        title="SIGN IN"
        color="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />
      <MyButton
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        backgroundColor={colors.secondary}
        title="SIGN UP"
        color="#fff"
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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

export default LandingScreen;
