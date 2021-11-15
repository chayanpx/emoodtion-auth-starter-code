import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { List, Checkbox } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyGoalList = ({
  title,
  description,
  status,
  color = "black",
  onCheck,
  onPress,
}) => {
  return (
    <View>
      <List.Item
        title={title}
        description={description}
        left={() => (
          <Checkbox
            status={status ? "checked" : "unchecked"}
            onPress={onCheck}
            color={color}
            style={{ paddingTop: 15 }}
          />
        )}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyGoalList;
