// import React from "react";
// import { StatusBar } from "expo-status-bar";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import LandingScreen from "../screens/LandingScreen";
// import SignInScreen from "../screens/SignInScreen";
// import SignUpScreen from "../screens/SignUpScreen";
// import FirstTimeScreen from "../screens/FirstTimeScreen";
// import MoodScreen from "../screens/MoodScreen";
// import DashboardScreen from "../screens/DashboardScreen";
// import CareCenterScreen from "../screens/CareCenterScreen";
// import ProfileScreen from "../screens/ProfileScreen";

// const LandingStack = createNativeStackNavigator();

// function MyLandingStackNavigator() {
//   return (
//     <LandingStack.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "transparent",
//         },
//         headerTintColor: "pink",
//         headerTransparent: true,
//         headerTitle: "",
//         headerBackTitleVisible: false,
//       }}
//       initialRouteName="Landing"
//     >
//       <LandingStack.Screen
//         name="Landing"
//         component={LandingScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <LandingStack.Screen name="SignIn" component={SignInScreen} />
//       <LandingStack.Screen name="SignUp" component={SignUpScreen} />
//       <LandingStack.Screen name="FirstTime" component={FirstTimeScreen} />
//     </LandingStack.Navigator>
//   );
// }

// const AuthStack = createStackNavigator();

// function MyAuthStackNavigator() {
//   <AuthStack.Navigator headerMode="none">
//     <AuthStack.Screen name="Signin" component={SigninScreen} />
//     <AuthStack.Screen name="Signup" component={SignupScreen} />
//   </AuthStack.Navigator>;
// }

// const Stack = createNativeStackNavigator();

// function MyStackNavigator() {
//   return (
//     <Stack.Navigator headerMode="none">
//       <Stack.Screen
//         name="SignIn"
//         component={SignInScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="SignUp"
//         component={SignUpScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// const Tab = createMaterialBottomTabNavigator();

// function MyBottomTabNavigator() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Mood"
//       activeColor="#fff"
//       inactiveColor="pink"
//       barStyle={{ backgroundColor: "salmon" }}
//     >
//       <Tab.Screen
//         name="Mood"
//         component={MoodScreen}
//         options={{
//           tabBarLabel: "Mood",
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons
//               name="emoticon-happy-outline"
//               color={color}
//               size={26}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Dashboard"
//         component={DashboardScreen}
//         options={{
//           tabBarLabel: "Dashboard",
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons
//               name="chart-timeline-variant"
//               color={color}
//               size={26}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="CareCenter"
//         component={CareCenterScreen}
//         options={{
//           tabBarLabel: "Care Center",
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons
//               name="heart-half-full"
//               color={color}
//               size={26}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarLabel: "Profile",
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="account" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default function MyNavigator() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="dark" />
//       <MyLandingStackNavigator />
//     </NavigationContainer>
//   );
// }
