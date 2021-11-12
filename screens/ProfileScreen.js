import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import {
  MyButton,
  MyTextInput,
  MyErrorMessage,
  MyAvatar,
  MyIconButton,
} from "../components";
import Firebase, { db } from "../config/Firebase";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { useTheme, RadioButton } from "react-native-paper";

const auth = Firebase.auth();

const ProfileScreen = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();
  const currentUser = auth.currentUser;
  const [email, setEmail] = useState(currentUser.email);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [genderIcon, setGenderIcon] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [birthDateText, setBirthDateText] = useState("");
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .where("auth_id", "==", currentUser.uid)
      .onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.data());
          });
          // console.log(users[0].auth_id);
          setName(users[0].username);
          setAvatar(users[0].avatarURL);
          setFirstName(users[0].firstName);
          setLastName(users[0].lastName);
          if (users[0].gender == 1) {
            setGender("male");
            setGenderIcon("face");
          } else if (users[0].gender == 2) {
            setGender("female");
            setGenderIcon("face-woman");
          } else {
            setGender("none");
            setGenderIcon("incognito");
          }
          if (users[0].birthday != null) {
            setBirthDate(users[0].birthday.toDate());
            setBirthDateText(
              birthDate.getDate() +
                "/" +
                birthDate.getMonth() +
                "/" +
                birthDate.getFullYear()
            );
          }
          setIsLoading(false);
        }
      );
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <MyAvatar
        // style={{ marginBottom: 15 }}
        height={110}
        width={110}
        color={"#FFF"}
        uri={avatar}
      />
      <MyTextInput
        editable={false}
        label="E-mail"
        inputStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 15,
        }}
        placeholder=""
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
      />
      <MyTextInput
        editable={false}
        label="Username"
        inputStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 15,
        }}
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <MyTextInput
        editable={false}
        label="Firstname"
        inputStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 15,
        }}
        placeholder=""
        autoCapitalize="none"
        autoCorrect={false}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <MyTextInput
        editable={false}
        label="Lastname"
        inputStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 15,
        }}
        placeholder=""
        autoCapitalize="none"
        autoCorrect={false}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <MyTextInput
        editable={false}
        label="Gender"
        inputStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 15,
        }}
        leftIcon={genderIcon}
        placeholder=""
        autoCapitalize="none"
        autoCorrect={false}
        value={gender}
        onChangeText={(text) => setLastName(text)}
      />
      <MyTextInput
        editable={false}
        label="Birthday"
        inputStyle={{
          fontSize: 16,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 15,
        }}
        placeholder=""
        autoCapitalize="none"
        autoCorrect={false}
        value={birthDateText}
        onChangeText={(text) => setLastName(text)}
      />
      <MyButton
        onPress={handleSignOut}
        backgroundColor={colors.subtitle}
        title="LOGOUT"
        color="#fff"
        titleSize={16}
        containerStyle={{
          marginBottom: 10,
          // marginVertical: 5,
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
    marginTop: "15%",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
});

export default ProfileScreen;
