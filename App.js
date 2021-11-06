import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  DefaultTheme,
  configureFonts,
  Provider as PaperProvider,
} from "react-native-paper";
import Routes from "./navigation/index";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF9EB1",
    secondary: "#BCA7D5",
    title: "#020202",
    subtitle: "#30343F",
    error: "#E90404",
    background: "#FFFF",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
