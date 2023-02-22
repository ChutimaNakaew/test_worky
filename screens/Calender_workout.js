import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import { authentication } from "../Database/firebase"

const Calender = ({ route, navigation }) => {
    const user_id = authentication.currentUser?.uid
    const { date_pick } = route.params;

    const date_cal = date_pick
    const [history, setHistory] = useState([])
    const [date, setDate] = useState('')
    const workoutRef = firebase.firestore().collection("addWorkOut").where('user_id', '==', user_id);
    const sumRef = firebase.firestore().collection("user").doc("u1").collection("TotalWorkout");


    // ---------------------------------set default ของปฎฺิทิน--------------------------
    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        setDate(
            date + '/' + month + '/' + year
        );
    }, []);
    //----------------------------------------------------------
    useEffect(() => {
        workoutRef.onSnapshot((querySnapshot) => {
            const history = []
            querySnapshot.forEach((doc) => {
                const { id, date, name, kcal, time } = doc.data()
                history.push({
                    id: doc.id,
                    kcal,
                    id,
                    name,
                    date,
                    time,
                })
            })
            setHistory(history)
        })
    }, [])
    //--------------------------------คำนวณจ้า-----------------------
    let total = 0;
    const [time_posture, setTime] = useState('');
    const name_posture = [];
    history.forEach(item => {
        if (item.date !== null) {
            const date_kcal = new Date(item.date.toDate().toISOString());
            const year_kcal = date_kcal.getFullYear();
            const month_kcal = date_kcal.getMonth() + 1;
            const dt_kcal = date_kcal.getDate();
            if (dt_kcal < 10) {
                dt_kcal = '0' + dt_kcal;
            }
            if (month_kcal < 10) {
                month_kcal = '0' + month_kcal;
            }
            const date_picker = (dt_kcal + '/' + month_kcal + '/' + year_kcal)
            if (date_picker === date_cal) {
                total += item.kcal
                let obj = {
                    name: item.name,
                    time: item.time

                }
                name_posture.push(obj)
            }

        }
    });
    let total_workout = total.toFixed(2)
    sumRef.add({
    }).then(() => {
    })
        .catch((err) => {
            alert(err)
        })

    // -----------------------------------------------------------



    let [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <View style={{ flex: 2, backgroundColor: 'lightblue' }}>
            <Text style={{ textAlign: 'center', marginTop: 5, fontFamily: "FCMuffinRegular", fontSize: 25 }}>- บันทึกการออกกำลังกายประจำวันที่ {date_cal} -</Text>
            <FlatList
                data={name_posture}
                numColumns={2}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.gridItem}>
                            <Text style={styles.title}> {item.name} </Text>
                            <Text style={styles.title}> {item.time} min. <FontAwesome5 name="check" size={24} color="#61B15A" /> </Text>
                        </View>
                    </View>
                )}
            />
            <Text style={styles.text}> <FontAwesome5 name="fire-alt" size={30} color="#f29811" /> ปริมาณแคลอรี่ที่ลดไปวันนี้ {total_workout} Kcal</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        marginLeft: 15,
        fontFamily: "FCMuffinRegular",
        fontSize: 28,
        marginBottom: 10,
        marginTop: 10,

    },
    gridItem: {
        padding: 17,
        height: 170,
        width: 170,
        backgroundColor: "#faf7dc",
        borderWidth: 5,
        borderColor: '#edeaca',
        margin: 12,
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    title: {
        fontFamily: "FCMuffinRegular",
        fontSize: 25,
        textAlign: "center",
        flexWrap: "wrap",
    },
    img_bg: {
        flex: 1,
        width: 180,
        height: 150
    },

})
export default Calender