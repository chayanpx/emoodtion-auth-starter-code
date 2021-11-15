import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { MyButton, MyLeftTextBubble, MyRightTextBubble } from "../components";
import VerticalSlider from "rn-vertical-slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TrackMoodScreen = () => {
  const { colors } = useTheme();
  const [sliderValue, setSliderValue] = useState(70);
  const [moodColor, setMoodColor] = useState(colors.mood4);
  const [moodText, setMoodText] = useState("It’s all right 👍🏼");
  const [textColor, setTextColor] = useState(colors.subtitle);

  const onNext = () => {};

  return (
    <View style={styles.screen}>
      <MyLeftTextBubble
        backgroundColor={colors.secondary}
        textColor={"white"}
        title={"How are you really feeling today?"}
      />
      <MyRightTextBubble
        backgroundColor={moodColor}
        textColor={textColor}
        title={moodText}
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
                setMoodColor(colors.mood1);
                setTextColor("white");
                break;
              }
              case mood > 20 && mood <= 40: {
                setMoodColor(colors.mood2);
                setTextColor("white");
                break;
              }
              case mood > 40 && mood <= 60: {
                setMoodColor(colors.mood3);
                setTextColor(colors.subtitle);
                break;
              }
              case mood > 60 && mood <= 80: {
                setMoodColor(colors.mood4);
                setTextColor(colors.subtitle);
                break;
              }
              case mood > 80 && mood <= 100: {
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
            marginTop: 40,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 120,
  },
  slider_area: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
});

export default TrackMoodScreen;
