import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  MyButton,
  MyTextInput,
  MyErrorMessage,
  MyIconButton,
  MyAvatar,
} from "../components";
import Firebase from "../config/Firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";

const auth = Firebase.auth();

const FirstTimeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useContext(AuthenticatedUserContext);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [avatar, setAvatar] = useState(
    "https://avatars.dicebear.com/api/micah/:seed.svg"
  );

  const random = () => {
    setAvatar(
      `https://avatars.dicebear.com/api/micah/${new Date().getTime()}.svg`
    );
  };

  const currentUser = auth.currentUser;

  const onDone = () => {
    if (name != "") {
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
    } else {
      setError("Please fill up this form.");
    }
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#D1D9E5", "#F0E4EB", "#E8B7D4"]}
        style={styles.background}
      />
      <View style={[styles.header, { color: colors.title }]}>
        <Text style={styles.title}>Welcome </Text>
        <Text style={styles.subtitle}>Good to see you here :)</Text>
      </View>
      <View style={styles.body}>
        {error ? <MyErrorMessage error={error} visible={true} /> : null}
        <MyAvatar height={110} width={110} color={"#FFF"} uri={avatar} />
        <MyButton
          onPress={random}
          backgroundColor="transparent"
          title="random"
          tileColor={colors.primary}
          titleSize={16}
          containerStyle={{
            marginBottom: 15,
            width: "25%",
            borderColor: colors.background,
            borderWidth: 2,
          }}
        />
        <MyTextInput
          editable={false}
          inputStyle={{
            fontSize: 16,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          placeholder=""
          autoCapitalize="none"
          autoCorrect={false}
          value={user.email}
        />
        <MyTextInput
          inputStyle={{
            fontSize: 16,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <MyTextInput
          inputStyle={{
            fontSize: 16,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          placeholder="FirstName"
          autoCapitalize="none"
          autoCorrect={false}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <MyTextInput
          inputStyle={{
            fontSize: 16,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          placeholder="LastName"
          autoCapitalize="none"
          autoCorrect={false}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <MyButton
          onPress={onDone}
          backgroundColor={colors.primary}
          title="DONE"
          tileColor="#fff"
          titleSize={16}
          containerStyle={{
            marginBottom: 15,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    marginBottom: 20,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200,
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default FirstTimeScreen;
