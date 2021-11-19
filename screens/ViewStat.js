import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import Firebase, { db } from "../config/Firebase";
import { useTheme } from "react-native-paper";
import dayjs from "dayjs";

const auth = Firebase.auth();

const greyColor = '#4F4F4F';

function ViewStat() {
    const [isLoading, setIsLoading] = useState(true);
    const [mood, setMood] = useState([]);
    const { colors } = useTheme();

    const [selectedMood, setSelectedMood] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    // const setItemForConChart = () => {
    //     const keep = [];
    //     let what = mood.filter(x => dayjs(x.create_at.toDate()).format("YYYY-MM-DD"));
    //     keep.push(what)
    // }

    const chartConfig = {
        backgroundGradientFrom: "#f2f2f2",
        // backgroundGradientFromOpacity: 0,
        // backgroundGradientTo: "transparent",
        color: () => '#ffffff',
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.2,
        useShadowColorFromDataset: false // optional
    };

    const commitsData = [
        { date: "2021-11-02", count: 1 },
        { date: "2021-11-03", count: 2 },
        { date: "2021-11-04", count: 3 },
        { date: "2021-11-05", count: 4 },
        { date: "2021-11-06", count: 5 },
        { date: "2021-11-30", count: 2 },
        { date: "2021-11-31", count: 3 },
        { date: "2021-11-01", count: 2 },
        { date: "2021-11-02", count: 4 },
        { date: "2021-11-05", count: 2 },
        { date: "2021-11-30", count: 4 }
    ];

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 0.1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 3 // optional
            }
        ],
        // legend: ["Rainy Days"] optional
    };

    useEffect(() => {
        const currentUser = auth.currentUser;
        const unsubscribe = db
            .collection("mood")
            .where("auth_id", "==", currentUser.uid)
            .onSnapshot(
                {
                    includeMetadataChanges: true,
                },
                (querySnapshot) => {
                    const user_mood = [];
                    querySnapshot.forEach((doc) => {
                        let icon = "default";
                        let background = "black";
                        switch (doc.data().emotion) {
                            case 1: {
                                icon = "emoticon-dead-outline";
                                background = colors.mood1;
                                break;
                            }
                            case 2: {
                                icon = "emoticon-sad-outline";
                                background = colors.mood2;
                                break;
                            }
                            case 3: {
                                icon = "emoticon-neutral-outline";
                                background = colors.mood3;
                                break;
                            }
                            case 4: {
                                icon = "emoticon-happy-outline";
                                background = colors.mood4;
                                break;
                            }
                            case 5: {
                                icon = "emoticon-cool-outline";
                                background = colors.mood5;
                                break;
                            }
                            default:
                                break;
                        }
                        user_mood.push({ ...doc.data(), icon, background });
                    });
                    console.log(user_mood);
                    // console.log(colorData)
                    setMood(user_mood);
                    setIsLoading(false);
                }
            );
        return unsubscribe;
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator animating={true} size="large" />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            {/* upper container */}
            <View style={styles.upperContainer}>
                <View style={styles.moodIcon}>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Terrible Mood');
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-dead-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Bad Mood');
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-sad-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Neutral Mood');
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-neutral-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Good Mood');
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-happy-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Happy Mood');
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-cool-outline" color={greyColor} size={38} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detail1}>
                    {/* {mood.map(x => x.create_at)} */}
                    <DropDownPicker
                        containerStyle={{
                            width: 100,
                            marginLeft: '5%'
                        }}
                        textStyle={{
                            color: '#4F4F4F',
                            fontSize: 14,
                            fontWeight: '600'
                        }}
                        placeholder='2021'
                        value={value}
                        items={items}
                        open={open}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                    <Text style={styles.selectedMood}> {selectedMood} </Text>
                </View>

                <View>
                    <ContributionGraph
                        style={styles.ContributionGraph}
                        values={commitsData}
                        endDate={new Date()}
                        numDays={105}
                        width={300}
                        height={200}
                        chartConfig={chartConfig}
                    />
                </View>
            </View>

            {/* lower container */}
            <View style={styles.lowerContainer}>
                <View>
                    <View style={styles.detail2}>
                        <Text style={styles.Overall}>Overall</Text>
                    </View>
                    <LineChart
                        style={styles.LineChart}
                        data={data}
                        width={250}
                        height={256}
                        verticalLabelRotation={30}
                        chartConfig={chartConfig}
                        bezier
                    />
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    },
    moodIcon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '4%',
        marginBottom: 15,
        marginLeft: 20,
        marginRight: 20
    },
    LineChart: {
        marginTop: 50,
        alignSelf: 'center'
    },
    upperContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        // marginTop: ,
        width: '90%',
        height: '50%',
        alignSelf: 'center'
        // width: '300px',
        // height: '262px'
    },
    lowerContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '90%',
        height: '46%',
        marginTop: 10,
        alignSelf: 'center'
    },
    detail1: {
        flexDirection: 'row',
    },
    detail2: {
        flexDirection: 'row',
        marginTop: 15
    },
    selectedMood: {
        marginLeft: 110,
        color: '#828282'
    },
    ContributionGraph: {
        alignSelf: 'center',
    },
    LineChart: {
        marginTop: 2,
        alignSelf: 'center',
        justifyContent: "center",
    },
    Overall: {
        marginLeft: 140,
        color: "#828282"
    }
});

export default ViewStat;
