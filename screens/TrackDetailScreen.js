import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMood } from "../store/actions/moodAction";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useTheme, Dialog, Portal } from "react-native-paper";
import {
  MyButton,
  MyLeftTextBubble,
  MyRightTextBubble,
  MyTextArea,
} from "../components";
import Firebase, { db } from "../config/Firebase";

const TrackDetailScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [textarea, setTextarea] = useState("");
  const [visible, setVisible] = React.useState(false);

  const username = useSelector((state) => state.user.username);
  const auth_id = useSelector((state) => state.user.auth_id);
  const moodQues = useSelector((state) => state.mood.moodQues);
  const moodAns = useSelector((state) => state.mood.moodAns);
  const moodColor = useSelector((state) => state.mood.moodColor);
  const textColor = useSelector((state) => state.mood.textColor);
  const value = useSelector((state) => state.mood.value);
  const emotion = useSelector((state) => state.mood.emotion);

  const hideDialog = () => {
    if (auth_id) {
      db.collection("mood").add({
        auth_id: auth_id,
        create_at: new Date(),
        emotion: emotion,
        value: value,
        note: textarea,
      });
    } else {
      console.log("error: don't have auth_id");
    }

    // console.log(
    //   "auth_id",
    //   auth_id,
    //   "emotion",
    //   emotion,
    //   "value",
    //   value,
    //   "note",
    //   textarea
    // );
    setVisible(false);
    navigation.navigate("Mood");
  };

  const onSave = () => {
    setVisible(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text style={styles.dialog}>{textarea}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <MyLeftTextBubble
            backgroundColor={colors.secondary}
            textColor={"white"}
            title={"Hi, " + username}
          />
          <MyLeftTextBubble
            backgroundColor={colors.secondary}
            textColor={"white"}
            title={moodQues}
          />
          <MyRightTextBubble
            backgroundColor={moodColor}
            textColor={textColor}
            title={moodAns}
          />
          <MyLeftTextBubble
            backgroundColor={colors.secondary}
            textColor={"white"}
            title={"What happened, you can tell me"}
          />
          <MyRightTextBubble
            backgroundColor={moodColor}
            textColor={textColor}
            title={". . ."}
          />
          <View style={styles.text_area}>
            <MyTextArea
              onChangeText={(text) => {
                setTextarea(text);
              }}
              defaultValue={textarea}
              maxLength={200}
              placeholder={"Type here . . ."}
              textareaStyle={{ height: 200, margin: 0 }}
              textareaContainerStyle={{
                height: 200,
                borderRadius: 5,
              }}
            />
            <MyButton
              onPress={onSave}
              backgroundColor={colors.secondary}
              title="SAVE"
              color="#fff"
              titleSize={16}
              containerStyle={{
                marginTop: 25,
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 95,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    marginTop: 25,
  },
  text_area: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  dialog: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default TrackDetailScreen;
