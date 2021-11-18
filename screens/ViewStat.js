import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';

const greyColor = '#4F4F4F';

function ViewStat() {

    const [mood1, setMood1] = useState("");
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [items1, setItems1] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const [mood2, setMood2] = useState("");
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const [countryOpen, setCountryOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);

    const onCountryOpen = useCallback(() => {
        setCityOpen(false);
    }, []);

    const onCityOpen = useCallback(() => {
        setCountryOpen(false);
    }, []);

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        // backgroundGradientFromOpacity: 0,
        // backgroundGradientTo: "#ffffff",
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

    return (
        <View style={styles.screen}>
            {/* upper container */}
            <View style={styles.upperContainer}>
                <View style={styles.moodIcon}>
                    <TouchableOpacity
                        onPress={() => {
                            setMood1('Terrible Mood');
                            console.log(mood1)
                        }}>
                        <MaterialCommunityIcons name="emoticon-dead-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setMood1('Bad Mood');
                            console.log(mood1)
                        }}>
                        <MaterialCommunityIcons name="emoticon-sad-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setMood1('Neutral Mood');
                            console.log(mood1)
                        }}>
                        <MaterialCommunityIcons name="emoticon-neutral-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setMood1('Good Mood');
                            console.log(mood1)
                        }}>
                        <MaterialCommunityIcons name="emoticon-happy-outline" color={greyColor} size={38} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setMood1('Happy Mood');
                            console.log(mood1)
                        }}>
                        <MaterialCommunityIcons name="emoticon-cool-outline" color={greyColor} size={38} />
                    </TouchableOpacity>
                </View>
                <View style={styles.detail1}>
                    <DropDownPicker
                        // open={countryOpen}
                        // onOpen={onCountryOpen}
                        containerStyle={{
                            width: 100,
                            marginLeft: '5%'
                        }}
                        textStyle={{
                            color: '#4F4F4F',
                            fontSize: 14,
                            fontWeight: '600'
                        }}
                        // placeholder='2021'
                        // value={value}
                        // items={items}
                        // setOpen={setOpen}
                        // setValue={setValue}
                        // setItems={setItems}
                        open={countryOpen}
                        // onOpen={onCountryOpen}
                        value={value1}
                        items={items1}
                        setOpen={setOpen1}
                        setValue={setValue1}
                        setItems={setItems1}
                    />
                    <Text style={styles.selectedMood}> {mood1} </Text>
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
                        <DropDownPicker
                            // open={cityOpen}
                            // onOpen={onCityOpen}
                            containerStyle={{
                                width: 100,
                                marginLeft: '5%'
                            }}
                            textStyle={{
                                color: '#4F4F4F',
                                fontSize: 14,
                                fontWeight: '600'
                            }}
                            // placeholder='2021'
                            // value={value}
                            // items={items}
                            // setOpen={setOpen}
                            // setValue={setValue}
                            // setItems={setItems}
                            open={cityOpen}
                            onOpen={onCityOpen}
                            value={value2}
                            items={items2}
                            setOpen={setOpen2}
                            setValue={setValue2}
                            setItems={setItems2}
                        />
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
        marginTop: -90,
        width: '90%',
        height: '43%',
        alignSelf: 'center'
        // width: '300px',
        // height: '262px'
    },
    lowerContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '90%',
        height: '43%',
        marginTop: 20,
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
        alignSelf: 'center'
    },
    LineChart: {
        alignSelf: 'center',
        justifyContent: "center"
    },
    Overall: {
        marginLeft: 140,
        color: "#828282"
    }
});

export default ViewStat;
