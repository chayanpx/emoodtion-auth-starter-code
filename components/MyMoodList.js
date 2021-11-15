import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyMoodList = ({
  title,
  description,
  icon,
  iconColor = "black",
  moodColor,
  onPress,
}) => {
  return (
    <View>
      {/* <List.Section> */}
      <List.Item
        title={title}
        description={description}
        left={(props) => (
          <List.Icon
            {...props}
            icon={icon}
            color={iconColor}
            style={{ backgroundColor: moodColor }}
          />
        )}
        onPress={onPress}
      />
      {/* </List.Section> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyMoodList;
