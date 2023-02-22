import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import { authentication } from "../Database/firebase"

const History = ({ route, navigation }) => {
    const [history, setHistory] = useState([])
    const [date, setDate] = useState('')
    const user_id = authentication.currentUser?.uid
    const workoutRef = firebase.firestore().collection("addWorkOut").where('user_id', '==', user_id);


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
                const { id, date, name, kcal, time, user_id } = doc.data()
                history.push({
                    id: doc.id,
                    kcal,
                    id,
                    name,
                    date,
                    time,
                    user_id
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
            if (date_picker === date) {
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

    let [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    })

    if (!fontsLoaded) {
        return null
    }

    return (
        <View style={{ flex: 2, backgroundColor:'lightblue' }}>
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
            <View>
            <Text style={styles.text}> <FontAwesome5 name="fire-alt" size={30} color="#f29811" /> ปริมาณแคลอรี่ที่ลดไปวันนี้ {total_workout} Kcal</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        marginLeft: 20,
        fontFamily: "FCMuffinRegular",
        fontSize: 28,
        marginBottom: 10,
        marginTop:10,

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
export default History