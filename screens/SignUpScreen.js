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

const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmVisibility, setConfirmVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("eye");
  const [confirmIcon, setConfirmIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");

  const handlePasswordVisibility = () => {
    if (passwordIcon === "eye") {
      setPasswordIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (passwordIcon === "eye-off") {
      setPasswordIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleConfirmVisibility = () => {
    if (confirmIcon === "eye") {
      setConfirmIcon("eye-off");
      setConfirmVisibility(!confirmVisibility);
    } else if (confirmIcon === "eye-off") {
      setConfirmIcon("eye");
      setConfirmVisibility(!confirmVisibility);
    }
  };

  const onHandleSignup = async () => {
    try {
      if (email !== "" && password !== "" && confirm !== "") {
        if (password == confirm) {
          await auth.createUserWithEmailAndPassword(email, password);
          navigation.navigate("FirstTime");
        } else {
          setSignupError("Password confirmation doesn't match password");
        }
      } else {
        setSignupError("Please fill up this form.");
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  const onGoogleSignup = async () => {
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
      setSignupError(message);
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
        <Text style={styles.title}>Hello Beatiful,</Text>
        <Text style={styles.subtitle}>
          Enter your information below or sign up with google.
        </Text>
      </View>
      <View style={styles.body}>
        {signupError ? (
          <MyErrorMessage error={signupError} visible={true} />
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
            marginBottom: 20,
          }}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={passwordIcon}
          value={password}
          onChangeText={(text) => setPassword(text)}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <MyTextInput
          inputStyle={{
            fontSize: 16,
          }}
          containerStyle={{
            backgroundColor: "#fff",
            marginBottom: 20,
          }}
          leftIcon="lock"
          placeholder="Confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={confirmVisibility}
          textContentType="password"
          rightIcon={confirmIcon}
          value={confirm}
          onChangeText={(text) => setConfirm(text)}
          handlePasswordVisibility={handleConfirmVisibility}
        />
        <MyButton
          onPress={onHandleSignup}
          backgroundColor={colors.secondary}
          title="Sign Up"
          tileColor="#fff"
          titleSize={16}
          containerStyle={{
            marginBottom: 15,
          }}
        />
        <View style={styles.line} />
        <MyButton
          onPress={onGoogleSignup}
          backgroundColor={colors.primary}
          title="Sign Up With Google"
          tileColor="#fff"
          titleSize={16}
          containerStyle={{
            marginBottom: 15,
          }}
        />
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footertitle, { color: colors.title }]}>
          Already have an account,{" "}
          <Text
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            style={[styles.signin, { color: colors.primary }]}
          >
            Sign in
          </Text>
        </Text>
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
    paddingHorizontal: 55,
    marginTop: 150,
    marginBottom: 40,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200,
  },
  footer: {
    height: 65,
    backgroundColor: "white",
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
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
  },
  footertitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  signin: {
    fontWeight: "600",
  },
  line: {
    height: 2,
    backgroundColor: "white",
    width: "75%",
    marginBottom: 15,
  },
});

export default SignUpScreen;
