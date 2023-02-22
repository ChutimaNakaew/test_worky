import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, ImageBackground, Button, useWindowDimensions, TouchableOpacity, Pressable, Dimensions } from "react-native";
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import YoutubePlayer from "react-native-youtube-iframe";
import { authentication } from "../Database/firebase"
// import Video from 'react-native-video';
import { Video, AVPlaybackStatus } from 'expo-av';
const screen = Dimensions.get('window');

const Video_posture = ({ route, navigation }) => {
    const user_id = authentication.currentUser?.uid
    const { width: screenWidth } = useWindowDimensions()
    const { postureId } = route.params;
    const { postureName } = route.params;
    const { postureVideo } = route.params;
    const { postureKcal } = route.params;
    const { postureTiming } = route.params;

    const pos_id = postureId
    const pos_name = postureName
    const pos_video = postureVideo
    const pos_kal = postureKcal
    const post_timing = postureTiming

    const [status, setStatus] = React.useState({});

    let [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    })


    record = () => {

        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        firebase.firestore().collection("addWorkOut").add({
            name: pos_name,
            date: timestamp,
            kcal: pos_kal,
            id: pos_id,
            time: Number((post_timing).toFixed(2)),
            user_id: user_id,
        })
            .then(() => {
                console.log("Success to Add calories of " + pos_name)
            })
            .catch((err) => {
                alert(err)
            })

            ;
        navigation.navigate("Record_history")
    }

    return (

        <View style={styles.container}>
            <YoutubePlayer
                height={220}
                play={true}
                videoId={pos_video}
            />
            <Text style={styles.textTitle}>{'- ' + pos_name + ' -'}</Text>

            <View style={styles.subcontainer}>

                <View>
                    <View style={styles.btn2}>
                        <TouchableOpacity onPress={() => record()} style={styles.buttonRecord}>
                            <Text style={styles.text}>บันทึกผล</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    header: {
        marginTop: 60,
    },
    container: {
        marginTop: 60,
    },
    subcontainer: {
        marginTop: -20,
    },
    textTitle: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 50,
        fontFamily: "FCMuffinRegular",
    },
    text: {
        justifyContent: "center",
        fontSize: 30,
        fontFamily: "FCMuffinRegular",
    },
    video: {
        flex: 1,
        alignSelf: 'stretch',
        width: 320,
        height: 150,
    },
    time: {
        fontSize: 70,
        textAlign: 'center',
        marginTop: -10,
        marginBottom: 5,
    },
    buttonStart: {
        borderWidth: 10,
        borderColor: '#68b97a',
        width: 110,
        height: 65,
        borderRadius: screen.width / 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonReset: {
        borderWidth: 10,
        borderColor: '#f09090',
        width: 110,
        height: 65,
        borderRadius: screen.width / 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonRecord: {
        borderWidth: 10,
        borderColor: '#7fa4eb',
        width: 110,
        height: 65,
        borderRadius: screen.width / 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
    },
    btn2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
});
export default Video_posture;