import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Firebase, { db } from "../config/Firebase";
import { useTheme } from "react-native-paper";
import dayjs from "dayjs";

const auth = Firebase.auth();

const greyColor = '#e2e2e2';

function ViewStat() {
    const [isLoading, setIsLoading] = useState(true);
    //for render filter contrubute graph 
    const [emoodtion, setEmoodtion] = useState(5);
    //for annual graph
    const [month, setMonth] = useState([]);
    //for keep date existed in database
    const [haveDate, setHaveDate] = useState([]);
    const [isMood1Click, setIsMood1Click] = useState(false);
    const [isMood2Click, setIsMood2Click] = useState(false);
    const [isMood3Click, setIsMood3Click] = useState(false);
    const [isMood4Click, setIsMood4Click] = useState(false);
    const [isMood5Click, setIsMood5Click] = useState(true);

    const [mood, setMood] = useState([]);
    const { colors } = useTheme();

    const [selectedMood, setSelectedMood] = useState("Happy Mood");

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(58, 58, 60, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false
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

    //remove duplicate
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    var a = haveDate;
    var uniqueDate = a.filter(onlyUnique);

    var b = month;
    var uniqueMonth = b.filter(onlyUnique);

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

    //for set annual graph data
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
                color: (opacity = 1) => `rgba(100, 62, 69, ${opacity})`,
                strokeWidth: 2
            }
        ],
    };

    var date = "";
    var count = 0;
    var filterDateMood = [];
    var useConGraph = [];
    const forContributeGraph = () => {
        for (let i = 0; i < uniqueDate.length; i++) {
            filterDateMood.push(mood.filter(x => (dayjs(x.create_at.toDate()).format("YYYY-MM-DD") == uniqueDate[i]) && (x.emotion == emoodtion)));
        }
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

    return (
        <View style={styles.screen}>
            {/* upper container for heatmap*/}
            <View style={{
                backgroundColor: colors.background,
                borderRadius: 10,
                width: '90%',
                height: '50%',
                alignSelf: 'center'
            }}>
                <View style={styles.moodIcon}>
                    <TouchableOpacity
                        onPress={() => {
                            setIsMood1Click(!isMood1Click)
                            setIsMood2Click(false)
                            setIsMood3Click(false)
                            setIsMood4Click(false)
                            setIsMood5Click(false)
                            setSelectedMood('Terrible Mood');
                            setEmoodtion(1);
                            console.log(selectedMood)
                        }}>
                        <MaterialCommunityIcons name={isMood1Click ? "emoticon-dead" : "emoticon-dead-outline"} color={isMood1Click ? colors.mood1 : greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setIsMood1Click(false)
                            setIsMood2Click(!isMood2Click)
                            setIsMood3Click(false)
                            setIsMood4Click(false)
                            setIsMood5Click(false)
                            setSelectedMood('Bad Mood');
                            setEmoodtion(2);
                        }}>
                        <MaterialCommunityIcons name={isMood2Click ? "emoticon-sad" : "emoticon-sad-outline"} color={isMood2Click ? colors.mood2 : greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setIsMood1Click(false)
                            setIsMood2Click(false)
                            setIsMood3Click(!isMood3Click)
                            setIsMood4Click(false)
                            setIsMood5Click(false)
                            setSelectedMood('Neutral Mood');
                            setEmoodtion(3);
                        }}>
                        <MaterialCommunityIcons name={isMood3Click ? "emoticon-neutral" : "emoticon-neutral-outline"} color={isMood3Click ? "#d7dbd9" : greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setIsMood1Click(false)
                            setIsMood2Click(false)
                            setIsMood3Click(false)
                            setIsMood4Click(!isMood4Click)
                            setIsMood5Click(false)
                            setSelectedMood('Good Mood');
                            setEmoodtion(4);
                        }}>
                        <MaterialCommunityIcons name={isMood4Click ? "emoticon-happy" : "emoticon-happy-outline"} color={isMood4Click ? colors.mood4 : greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setIsMood1Click(false)
                            setIsMood2Click(false)
                            setIsMood3Click(false)
                            setIsMood4Click(false)
                            setIsMood5Click(!isMood5Click)
                            setSelectedMood('Happy Mood');
                            setEmoodtion(5);
                        }}>
                        <MaterialCommunityIcons name={isMood5Click ? "emoticon-cool" : "emoticon-cool-outline"} color={isMood5Click ? colors.mood5 : greyColor} size={38} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detail1}>
                    <Text style={{ marginLeft: 230, color: '#828282' }}> {selectedMood} </Text>
                </View>
                <ScrollView
                    style={{ flexDirection: 'row' }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                >
                    <View>
                        <ContributionGraph
                            style={styles.ContributionGraph}
                            values={useConGraph}
                            horizontal={true}
                            endDate={new Date("2021-12-31")}
                            numDays={186}
                            width={650}
                            squareSize={20}
                            height={200}
                            chartConfig={chartConfig}
                        />
                    </View>
                </ScrollView>
            </View>

            {/* lower container for annual graph */}
            <View style={{
                backgroundColor: colors.background,
                borderRadius: 10,
                width: '90%',
                height: '46%',
                marginTop: 10,
                alignSelf: 'center'
            }}>
                <View>
                    <View style={styles.detail2}>
                        <Text style={styles.Overall}>Overall</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={true}
                    >
                        <LineChart
                            style={styles.LineChart}
                            data={testdata}
                            width={300}
                            height={256}
                            chartConfig={chartConfig}
                            bezier
                        />
                    </ScrollView>
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
    detail1: {
        flexDirection: 'row',
    },
    detail2: {
        flexDirection: 'row',
        marginTop: 15
    },
    selectedMood: {
        marginLeft: 230,
        color: '#828282'
    },
    ContributionGraph: {
        alignSelf: 'center',
    },
    LineChart: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: "center",
    },
    Overall: {
        marginLeft: 250,
        color: "#828282"
    }
});

export default ViewStat;
