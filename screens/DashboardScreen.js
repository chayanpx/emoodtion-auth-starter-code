import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Firebase, { db } from "../config/Firebase";
import { List, useTheme } from "react-native-paper";
import dayjs from "dayjs";
import { MyMoodList } from "../components";

const auth = Firebase.auth();

//เก้ทค่าได้ทุกอย่างแล้ว ไปเอาลอจิคใส่สีตอนเรนเด้อมา ฮืออออออออออออออออออออออออออออออออออออออออออออออออ

const DashboardScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [mood, setMood] = useState([]);
    const { colors } = useTheme();

    const [testDate, setTestDate] = useState();
    const [currentDate, setCurrentDate] = useState(dayjs(new Date()).format("DD MMM YYYY"));
    const [keepDate, setKeepDate] = useState([]);
    const [avgValue, setAvgValue] = useState(0);
    const pickDate = (date) => {
        setCurrentDate(
            dayjs(date).format("DD MMM YYYY")
        );
    };

    const checkDate = (pickDate) => {
        const tempKeepDate = (mood.filter(x => dayjs(x.create_at.toDate()).format("YYYY-MM-DD") == pickDate));
        setKeepDate(tempKeepDate);
        console.log(tempKeepDate);
        return (true);
    }

    const calValue = () => {
        const tempKeep = keepDate;
        let avg = 0;
        tempKeep.map((data, index) => {
            avg += data.value;
        });
        avg = avg / tempKeep.length;
        setAvgValue(avg);
    }

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
            <Calendar
                current={Date()}
                style={styles.calendar}
                onDayPress={(date) => {
                    console.log();
                    pickDate(date.dateString);
                    checkDate(date.dateString);
                    calValue();
                }}
            // markingType={'custom'}
            // markedDates={{
            //   '2021-11-28': {
            //     customStyles: {
            //       container: {
            //         backgroundColor: 'green'
            //       },
            //       text: {
            //         color: 'black',
            //         fontWeight: 'bold'
            //       }
            //     }
            //   },
            // }}
            />
            <View style={styles.bigContainer}>
                <View style={styles.noteContainer}>
                    <Text style={styles.noteDate}>
                        {currentDate}
                    </Text>
                    <TouchableOpacity
                        style={styles.viewStatistics}
                        onPress={() => {
                            navigation.navigate("ViewStat");
                        }}
                    >
                        <Text>view statistics <MaterialCommunityIcons name="chart-line" size={19} color="#4F4F4F" /></Text>
                    </TouchableOpacity>
                </View>
                <List.Section style={{ height: 360 }}>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                        {keepDate.map((item, index) => {
                            // console.log("item", item);
                            return (
                                <MyMoodList
                                    key={index}
                                    title={item.create_at
                                        .toDate()
                                        .toLocaleTimeString()
                                        .replace(/:\d{2}\s/, " ")}
                                    description={item.note}
                                    icon={item.icon}
                                    moodColor={item.background}
                                    onPress={() => console.log("Pressed")}
                                />
                            );
                        })}
                    </ScrollView>
                </List.Section>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: "center",
        // alignItems: "center",
    },
    calendar: {
        paddingTop: '8%',
    },
    bigContainer: {
        backgroundColor: '#F2F2F2',
        width: '90%',
        position: "relative",
        marginBottom: 10,
        flex: 1,
        marginLeft: '5%',
        borderRadius: 10
    },
    noteContainer: {
        position: "relative",
        marginTop: 15,
        // marginBottom: 2,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        // alignItems: "center"
    },
    noteDate: {
        position: "absolute",
        color: "#4F4F4F",
        top: '4%',
        left: '8%',
        fontSize: 18,
        fontWeight: "600"
    },
    viewStatistics: {
        color: "#4F4F4F",
        top: '4.5%',
        left: '27%',

    }
});

export default DashboardScreen;
