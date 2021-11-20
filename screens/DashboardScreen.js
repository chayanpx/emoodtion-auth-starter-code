import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Firebase, { db } from "../config/Firebase";
import { List, useTheme } from "react-native-paper";
import dayjs from "dayjs";
import { MyMoodList } from "../components";

const auth = Firebase.auth();

const DashboardScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [mood, setMood] = useState([]);
    const { colors } = useTheme();

    const [currentDate, setCurrentDate] = useState(dayjs(new Date()).format("DD MMM YYYY"));
    const [haveDate, setHaveDate] = useState([]);
    const pickDate = (date) => {
        setCurrentDate(
            dayjs(date).format("DD MMM YYYY")
        );
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
                    const createDate = [];
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
                        let create_at = doc.data().create_at.toDate();
                        createDate.push(dayjs(create_at).format("YYYY-MM-DD"));
                    });
                    setHaveDate(createDate)
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

    //remove duplicate dunction
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    var a = haveDate;
    var unique = a.filter(onlyUnique);

    //cal each date acerage emotion 
    var ngong = [];
    var ngong1 = []
    var avg = 0;
    var datee = "";
    var background = "";
    var textCol = "";
    var sum = 0;
    const check = () => {
        for (let i = 0; i < unique.length; i++) {
            ngong.push(mood.filter(x => dayjs(x.create_at.toDate()).format("YYYY-MM-DD") == unique[i]));
        }
        ngong.map((item, index) => {
            item.map((check, num) => {
                datee = dayjs(check.create_at.toDate()).format("YYYY-MM-DD")
                sum += check.value
                avg = sum / item.length
            })
            if (avg > 0 && avg <= 20) {
                background = "#949599";
                textCol = "white";
            }
            else if (avg > 20 && avg <= 40) {
                background = "#87ADC9";
                textCol = "white";
            }
            else if (avg > 40 && avg <= 60) {
                background = "#ECEEED";
                textCol = colors.subtitle;
            }
            else if (avg > 60 && avg <= 80) {
                background = "#F9E786";
                textCol = colors.subtitle;
            }
            else if (avg > 80) {
                background = "#7BD5BC";
                textCol = "white";
            }
            ngong1.push({ avg, datee, background, textCol })
            avg = 0;
            sum = 0;
            datee = "";
            background = "";
            textCol = ""
        })
    }

    check();

    var datasource = {}
    ngong1.map((item, index) => {
        datasource[item.datee] = {
            date: item.datee,
            customStyles: {
                container: {
                    backgroundColor: item.background,
                },
                text: {
                    color: item.textCol
                }
            }
        }
    })

    return (
        <View style={styles.screen}>
            <View style={styles.bigContainer}>
                <Calendar
                    style={styles.calendar}
                    onDayPress={(date) => {
                        pickDate(date.dateString);
                    }}
                    markingType={'custom'}
                    markedDates={datasource}
                />
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
                        {mood.map((item, index) => {
                            if (dayjs(item.create_at.toDate()).format("DD MMM YYYY") == currentDate) {
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
                                        onPress={() => console.log(item.value)}
                                    />
                                );
                            }
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
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
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