import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyMainBottomTab from "./MyMainBottomTab";
import ViewStat from "../screens/ViewStat";
import DashboardScreen from "../screens/DashboardScreen";

const ViewStatNavigator = createNativeStackNavigator();

export default function MyViewStatNavigator() {
    return (
        <ViewStatNavigator.Navigator
            initialRouteName="DashboardScreen"
            screenOptions={{
                shadowColor: 'transparent'
            }}
        >
            <ViewStatNavigator.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    headerShown: false
                }}
            />
            <ViewStatNavigator.Screen
                name="ViewStat"
                component={ViewStat}
                options={{
                    title: "Statistics",
                    shadowColor: 'transparent',
                    headerStyle: {
                        backgroundColor: "#f2f2f2",
                        height: 60, 
                        borderBottomWidth: 0,
                    },
                    headerTintColor: "#909090",
                    
                }}
            />
            <ViewStatNavigator.Screen name="Main" component={MyMainBottomTab} />

        </ViewStatNavigator.Navigator>
    )
}