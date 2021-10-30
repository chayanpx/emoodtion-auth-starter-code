import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyTextInput = ({
  leftIcon,
  rightIcon,
  iconColor = "#626262",
  inputStyle,
  containerStyle,
  placeholderTextColor = "#c4c4c4",
  handlePasswordVisibility,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon ? (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color={iconColor}
          style={styles.leftIcon}
        />
      ) : null}
      <TextInput
        {...rest}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, inputStyle]}
      />
      {rightIcon ? (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={iconColor}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    flexDirection: "row",
    padding: 12,
    width: "75%",
  },
  leftIcon: {
    marginTop: 2,
    marginRight: 10,
  },
  input: {
    flex: 1,
    width: "100%",
    fontSize: 20,
  },
  rightIcon: {
    alignSelf: "center",
    marginTop: 2,
    marginLeft: 10,
  },
});

export default MyTextInput;
