import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ansMood } from "../store/actions/moodAction";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { MyButton, MyLeftTextBubble, MyRightTextBubble } from "../components";
import VerticalSlider from "rn-vertical-slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TrackMoodScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [sliderValue, setSliderValue] = useState(70);
  const [emotion, setEmotion] = useState(4);
  const [moodQues, setMoodQues] = useState("");
  const [moodAns, setMoodAns] = useState("slide me :)");
  const [mood1, setMood1] = useState("");
  const [mood2, setMood2] = useState("");
  const [mood3, setMood3] = useState("");
  const [mood4, setMood4] = useState("");
  const [mood5, setMood5] = useState("");
  const [moodColor, setMoodColor] = useState(colors.mood4);
  const [textColor, setTextColor] = useState(colors.subtitle);

  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    const ques = randomItem(arrQues);
    setMoodQues(ques);
    const mood1 = randomItem(arrMood1);
    setMood1(mood1);
    const mood2 = randomItem(arrMood2);
    setMood2(mood2);
    const mood3 = randomItem(arrMood3);
    setMood3(mood3);
    const mood4 = randomItem(arrMood4);
    setMood4(mood4);
    const mood5 = randomItem(arrMood5);
    setMood5(mood5);
  }, []);

  const arrQues = [
    "How are you really feeling today?",
    "How was your day?",
    "How's your day been?",
    "How was your day so far?",
  ];
  const arrMood1 = [
    "It’s sick 🤢",
    "It’s been a hard day",
    "It’s been a terrible day",
    "It’s been a horrible day",
  ];
  const arrMood2 = ["It’s a bit bad"];
  const arrMood3 = ["Nothing much", "Same as usual", "As usual"];
  const arrMood4 = [
    "It’s a good day",
    "It’s all right 👍🏼",
    "It’s a nice day",
    "It’s OK!",
  ];
  const arrMood5 = [
    "It’s been perfect!",
    "It’s been awesome!",
    "It’s been amazing!",
  ];

  const randomItem = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  const onNext = () => {
    if (moodAns != "slide me :)") {
      dispatch(
        ansMood(sliderValue, emotion, moodQues, moodAns, moodColor, textColor)
      );
      navigation.navigate("Detail");
    } else {
      alert("slide me!");
    }
  };

  return (
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
      <View style={styles.slider_area}>
        <MaterialCommunityIcons
          name="emoticon-cool-outline"
          size={36}
          color={colors.subtitle}
          style={{ marginBottom: 15 }}
        />
        <VerticalSlider
          value={sliderValue}
          disabled={false}
          min={0}
          max={100}
          onChange={(value) => {
            setSliderValue(value);
            // console.log("CHANGE", value);
            const mood = value;
            switch (true) {
              case mood > 0 && mood <= 20: {
                setEmotion(1);
                setMoodAns(mood1);
                setMoodColor(colors.mood1);
                setTextColor("white");
                break;
              }
              case mood > 20 && mood <= 40: {
                setEmotion(2);
                setMoodAns(mood2);
                setMoodColor(colors.mood2);
                setTextColor("white");
                break;
              }
              case mood > 40 && mood <= 60: {
                setEmotion(3);
                setMoodAns(mood3);
                setMoodColor(colors.mood3);
                setTextColor(colors.subtitle);
                break;
              }
              case mood > 60 && mood <= 80: {
                setEmotion(4);
                setMoodAns(mood4);
                setMoodColor(colors.mood4);
                setTextColor(colors.subtitle);
                break;
              }
              case mood > 80 && mood <= 100: {
                setEmotion(5);
                setMoodAns(mood5);
                setMoodColor(colors.mood5);
                setTextColor("white");
                break;
              }
              default:
                break;
            }
          }}
          onComplete={(value) => {
            setSliderValue(value);
            console.log("COMPLETE", value);
          }}
          width={50}
          height={300}
          step={1}
          borderRadius={10}
          minimumTrackTintColor={"#FFDEED"}
          maximumTrackTintColor={"white"}
          // showBallIndicator
          // ballIndicatorColor={"gray"}
          // ballIndicatorTextColor={"white"}
        />
        <MaterialCommunityIcons
          name="emoticon-dead-outline"
          size={36}
          color={colors.subtitle}
          style={{ marginTop: 15 }}
        />
        <MyButton
          onPress={onNext}
          backgroundColor={colors.secondary}
          title="NEXT"
          color="#fff"
          titleSize={16}
          containerStyle={{
            marginTop: 25,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 95,
  },
  slider_area: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default TrackMoodScreen;
