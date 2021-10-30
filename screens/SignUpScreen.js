import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MyButton, MyTextInput, MyErrorMessage } from "../components";
import Firebase from "../config/Firebase";

const auth = Firebase.auth();

const SignUpScreen = ({ navigation }) => {
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
      if (email !== "" && password !== "") {
        await auth.createUserWithEmailAndPassword(email, password);
        navigation.navigate("FirstTime");
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
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
          backgroundColor="pink"
          title="Sign Up"
          tileColor="#fff"
          titleSize={16}
          containerStyle={{
            marginBottom: 15,
          }}
        />
        <View style={styles.line} />
        <MyButton
          onPress={() => {
            console.log("sign up with google");
          }}
          backgroundColor="pink"
          title="Sign Up With Google"
          tileColor="#fff"
          titleSize={16}
          containerStyle={{
            marginBottom: 15,
          }}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footertitle}>
          Already have an account,{" "}
          <Text
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            style={styles.signin}
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
    height: 70,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    textAlign: "left",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "left",
  },
  footertitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  signin: {
    color: "salmon",
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
