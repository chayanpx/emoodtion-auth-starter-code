import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Firebase, { db } from "../config/Firebase";
import { useTheme } from "react-native-paper";
import dayjs from "dayjs";

const auth = Firebase.auth();

const greyColor = '#4F4F4F';

function ViewStat() {
    const [isLoading, setIsLoading] = useState(true);
    //for render filter contrubute graph 
    const [emoodtion, setEmoodtion] = useState(5);
    //for annual graph
    const [month, setMonth] = useState([]);
    //for keep date existed in database
    const [haveDate, setHaveDate] = useState([]);

    const [mood, setMood] = useState([]);
    const { colors } = useTheme();

    const [selectedMood, setSelectedMood] = useState("");

    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 0.7) => `rgba(255, 158, 177, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    useEffect(() => {
        const currentUser = auth.currentUser;
        const unsubscribe = db
            .collection("mood")
            .where("auth_id", "==", currentUser.uid)
            .orderBy("create_at", "asc")
            .onSnapshot(
                {
                    includeMetadataChanges: true,
                },
                (querySnapshot) => {
                    const user_mood = [];
                    const keepMonth = [];
                    const keepDate = [];
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
                        keepDate.push(dayjs(create_at).format("YYYY-MM-DD"));
                        keepMonth.push(dayjs(create_at).format("YYYY-MM"));
                    });
                    setMood(user_mood);
                    setHaveDate(keepDate);
                    setMonth(keepMonth);
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

    console.log("moodLength: ", mood.length)
    console.log("haveDate: ", haveDate, "haveDateLength: ", haveDate.length)
    console.log("month: ", month, "monthLength: ", month.length)

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    var a = haveDate;
    var uniqueDate = a.filter(onlyUnique);

    var b = month;
    var uniqueMonth = b.filter(onlyUnique);

    // console.log("unique date : ", uniqueDate);
    console.log(month)
    console.log("unique month : ", uniqueMonth);
    // console.log("mood : ", mood)

    var testkeepMood = [];
    var labels = "";
    var avgMonthValue = 0;
    var data = 0;
    var useAnnual = [];
    var testkeeplength = 0;

    const forAnnualGraph = () => {
        for (let i = 0; i < uniqueMonth.length; i++) {
            testkeepMood.push(mood.filter(x => dayjs(x.create_at.toDate()).format("YYYY-MM") == uniqueMonth[i]));
        }

        for (let i = 0; i < testkeepMood.length; i++) {
            testkeepMood[i].map((item, index) => {
                testkeeplength = testkeepMood[i].length
                labels = dayjs(item.create_at.toDate()).format("MMM")
                avgMonthValue += item.value
            })
            data = avgMonthValue / testkeeplength
            console.log(data, testkeeplength)
            useAnnual.push({ labels, data })
            labels = "";
        avgMonthValue = 0;
        data = 0;
        }
        
    }
    forAnnualGraph();
    // console.log("testkepp : ", testkeepMood)
    // console.log("useannual : ",useAnnual)

    //for annual graph
    var testdata = {};
    var forLabel = [];
    var forData = []
    useAnnual.map((item, index) => {
        forLabel.push(item.labels);
        forData.push(item.data);
    })
    testdata = {
        labels: forLabel,
        datasets: [
          {
            data: forData,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
    };
    console.log(forLabel)

    var date = "";
    var count = 0;
    var filterDateMood = [];
    var useConGraph = [];
    const forContributeGraph = () => {
        for (let i = 0; i < uniqueDate.length; i++) {
            filterDateMood.push(mood.filter(x => (dayjs(x.create_at.toDate()).format("YYYY-MM-DD") == uniqueDate[i]) && (x.emotion == emoodtion)));
        }
        // console.log(filterDateMood)
        filterDateMood.map((item, index) => {
            item.map((check, index) => {
                date = dayjs(check.create_at.toDate()).format("YYYY-MM-DD")
                count = item.length;
            })
            if (date != '' && count != 0) {
                useConGraph.push({ date, count })
            }
            date = "";
            count = 0;
        })
    }
    forContributeGraph();
    // console.log(useConGraph)

    return (
        <View style={styles.screen}>
            {/* upper container */}
            <View style={styles.upperContainer}>
                <View style={styles.moodIcon}>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Terrible Mood');
                            setEmoodtion(1);
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-dead-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Bad Mood');
                            setEmoodtion(2);
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-sad-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Neutral Mood');
                            setEmoodtion(3);
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-neutral-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Good Mood');
                            setEmoodtion(4);
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-happy-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setSelectedMood('Happy Mood');
                            setEmoodtion(5);
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name="emoticon-cool-outline" color={greyColor} size={38} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detail1}>
                    <Text style={styles.selectedMood}> {selectedMood} </Text>
                </View>
                <View>
                    <ScrollView
                        style={{ flexDirection: 'row' }}
                        horizontal={true}>
                        <ContributionGraph
                            style={styles.ContributionGraph}
                            values={useConGraph}
                            endDate={new Date()}
                            numDays={366}
                            width={300}
                            height={200}
                            chartConfig={chartConfig}
                        />
                    </ScrollView>

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
                        data={testdata}
                        width={300}
                        height={256}
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
        width: '90%',
        height: '50%',
        alignSelf: 'center'
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
