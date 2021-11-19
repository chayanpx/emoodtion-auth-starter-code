import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MyButton } from "../components";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import ImageSlider from 'react-native-image-slider';

import Firebase, { db } from "../config/Firebase";
// import careCenter from "../data/carecenter.json";
// import moodoftest from "../data/moodoftest.json";

const LandingScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const images = [
    'https://pbs.twimg.com/media/EWN4kPOU4AAbsjV.jpg',
    'https://cdn.kstarlive.com/image/1593655433117-0.jpg',
    'https://v-phinf.pstatic.net//20201222_37/1608619033493I7Ofg_JPEG/image.jpg?type=w1000',
  ];

  // const care_center = careCenter;
  // const mood = moodoftest;

  // const addData = () => {
  //   mood.forEach((item) => {
  //     db.collection("mood")
  //       .add(item)
  //       .then((docRef) => {
  //         console.log("Document written ID: ", docRef.id);
  //       })
  //       .catch((error) => {
  //         console.error("Error adding document: ", error);
  //       });
  //   });
  // };

  return (
    <View style={styles.screen}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#E2F0FB", "#FFE6E6", "#F0E4EB"]}
        style={styles.background}
      />
      <ImageSlider
        style={styles.imageSlider}
        autoPlayWithInterval={3000}
        images={images}
      />
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
  imageSlider: {
    width: '90%',
    maxHeight: '70%',
    borderRadius: '50%',
    alignSelf: 'center'
  }
});

export default LandingScreen;
