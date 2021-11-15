import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  MyButton,
  MyTextInput,
  MyErrorMessage,
  MyIconButton,
  MyAvatar,
  MyMoodList,
  MyGoalList,
} from "../components";
import { Card, List, FAB, useTheme } from "react-native-paper";
import Firebase, { db } from "../config/Firebase";
import dayjs from "dayjs";

const auth = Firebase.auth();

const MoodScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [today, setToday] = useState(new Date());
  const [todayText, setTodayText] = useState(
    dayjs(today).format("DD MMM YYYY")
  );
  const [mood, setMood] = useState([]);
  const [goalStatus, setGoalStatus] = useState(5);

  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    const currentUser = auth.currentUser;
    const start_day = dayjs().startOf("date").toDate();
    const end_day = dayjs().endOf("date").toDate();
    console.log("today", today, "start_day", start_day, "end_day", end_day);
    const unsubscribe = db
      .collection("mood")
      .where("auth_id", "==", currentUser.uid)
      .orderBy("create_at", "asc")
      .startAt(start_day)
      .endAt(end_day)
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
          // console.log(user_mood);
          setMood(user_mood);
          // setIsLoading(false);
          // console.log("today_mood", today_mood);
        }
      );

    db.collection("goal")
      .where("auth_id", "==", currentUser.uid)
      .orderBy("start_date", "asc")
      .startAt(start_day)
      // .endAt(end_day)
      .onSnapshot(
        {
          includeMetadataChanges: true,
        },
        (querySnapshot) => {
          const user_goal = [];
          querySnapshot.forEach((doc) => {
            user_goal.push(doc.data());
          });
          // console.log("goal", user_goal);
          setIsLoading(false);
          // console.log("today_mood", today_mood);
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
      <View style={styles.goal_card}>
        <Card>
          <Card.Content>
            <List.Subheader
              style={[styles.goal_title, { color: colors.title }]}
            >
              Today goal
            </List.Subheader>
            <List.Section>
              <MyGoalList
                title={"title"}
                status={goalStatus}
                onPress={() => setGoalStatus(!goalStatus)}
              />
            </List.Section>
          </Card.Content>
        </Card>
      </View>
      <View style={{ width: 350 }}>
        <Card>
          <Card.Content>
            <List.Subheader style={[styles.title, { color: colors.title }]}>
              Hi, {username}
            </List.Subheader>
            <List.Subheader
              style={[styles.subtitle, { color: colors.subtitle }]}
            >
              {todayText}
            </List.Subheader>
            <List.Section style={{ height: 200 }}>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                {mood.map((item, index) => {
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
          </Card.Content>
        </Card>
      </View>
      <FAB
        style={[styles.fab, { backgroundColor: colors.subtitle }]}
        icon="plus"
        color="#fff"
        onPress={() => navigation.navigate("TrackMood")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: -15,
  },
  subtitle: {
    // fontWeight: "600",
    fontSize: 16,
    textAlign: "left",
    marginBottom: -10,
  },
  goal_card: {
    width: 350,
    marginBottom: 15,
  },
  goal_title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: -15,
  },
});

export default MoodScreen;
