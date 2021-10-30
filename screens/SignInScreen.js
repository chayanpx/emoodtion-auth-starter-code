import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MyButton, MyTextInput, MyErrorMessage } from "../components";
import Constants from "expo-constants";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import Firebase from "../config/Firebase";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";

const auth = Firebase.auth();

const SignInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signinError, setSigninError] = useState("");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onSignin = async () => {
    try {
      if (email !== "" && password !== "") {
        await auth.signInWithEmailAndPassword(email, password);
      } else {
        setSigninError("Please fill up this form.");
      }
    } catch (error) {
      setSigninError(error.message);
    }
  };

  const onGoogleSignin = async () => {
    try {
      //await GoogleSignIn.askForPlayServicesAsync();
      const result = await Google.logInAsync({
        //return an object with result token and user
        iosClientId: Constants.manifest.extra.IOS_KEY, //From app.json
        // androidClientId: Constants.manifest.extra.ANDROIUD_KEY, //From app.json
        scopes: ["profile", "email"],
      });
      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          //Set the tokens to Firebase
          result.idToken,
          result.accessToken
        );
        auth
          .signInWithCredential(credential) //Login to Firebase
          .catch((error) => {
            console.log(error);
          });
      } else {
        //CANCEL
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
      setSigninError(message);
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
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>you've been missed !</Text>
      </View>
      <View style={styles.body}>
        {signinError ? (
          <MyErrorMessage error={signinError} visible={true} />
        ) : null}
        <MyTextInput
          inputStyle={{
            fontSize: 16,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <MyTextInput
          inputStyle={{
            fontSize: 16,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 5,
          }}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          value={password}
          onChangeText={(text) => setPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <Text style={[styles.forgot, { color: colors.subtitle }]}>
          Forgot password?
        </Text>
        <MyButton
          onPress={onSignin}
          backgroundColor={colors.primary}
          title="Sign In"
          tileColor="#fff"
          titleSize={16}
          containerStyle={{
            marginBottom: 15,
          }}
        />
        <View style={styles.line} />
        <MyButton
          onPress={onGoogleSignin}
          backgroundColor={colors.secondary}
          title="Sign In With Google"
          tileColor="#fff"
          titleSize={16}
          containerStyle={{
            marginBottom: 15,
          }}
        />
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footertitle, { color: colors.title }]}>
          Don’t have an account?{" "}
          <Text
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            style={[styles.signup, { color: colors.secondary }]}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  header: {
    paddingHorizontal: 55,
    marginTop: 150,
    // marginBottom: 40,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200,
  },
  footer: {
    height: 65,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 5,
  },
  subtitle: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "left",
  },
  footertitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  forgot: {
    alignSelf: "flex-end",
    fontSize: 14,
    marginRight: 55,
    marginBottom: 20,
  },
  signup: {
    fontWeight: "600",
  },
  line: {
    height: 2,
    backgroundColor: "#fff",
    width: "75%",
    marginBottom: 15,
  },
});

export default SignInScreen;
