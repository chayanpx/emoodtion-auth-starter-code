import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Firebase, { db } from "../config/Firebase";

const MoodScreen = () => {
  // useEffect(() => {
  //   const query_mood = db
  //     .collection("mood")
  //     .where("auth_id", "==", currentUser.uid)
  //     .get()
  //     .then((res) => {
  //       const moods = [];
  //       res.docs.forEach((e) => {
  //         moods.push(e.data());
  //       });
  //       console.log(moods);
  //       setMoods(moods);
  //     })
  //     .catch((error) => {
  //       console.log("Error getting documents: ", error);
  //     });
  // }, []);
  return (
    <View style={styles.screen}>
      <Text>Mood Screen</Text>
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

export default MoodScreen;
