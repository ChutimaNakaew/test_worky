import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, useWindowDimensions, TouchableOpacity, Pressable, Dimensions } from "react-native";
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import YoutubePlayer from "react-native-youtube-iframe";
// import Video from 'react-native-video';
import { Video, AVPlaybackStatus } from 'expo-av';
import { authentication } from "../Database/firebase"

const screen = Dimensions.get('window');

const Video_posture = ({ route, navigation }) => {
    const user_id = authentication.currentUser?.uid
    const { width: screenWidth } = useWindowDimensions()
    const { postureId } = route.params;
    const { postureName } = route.params;
    const { postureVideo } = route.params;
    const { postureKcal } = route.params;

    const pos_id = postureId
    const pos_name = postureName
    const pos_video = postureVideo
    const pos_kal = postureKcal

    // con
    let [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    })



    const formatNumber = number => `0${number}`.slice(-2);

    const getRemaining = (time) => {
        const mins = Math.floor(time / 60);
        const secs = time - mins * 60;
        return { mins: formatNumber(mins), secs: formatNumber(secs) };
    }
    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);
    toggle = () => {
        setIsActive(!isActive);
    }

    reset = () => {
        setRemainingSecs(0);
        setIsActive(false);

    }

    record = () => {

        let totalKcal = ((pos_kal) * (remainingSecs / 60)).toFixed(0) //หาร60เพราะคิดเป็นper minute

        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        firebase.firestore().collection("addWorkOut").add({
            name: pos_name,
            date: timestamp,
            kcal: Number((totalKcal)),
            id: pos_id,
            time: Number((remainingSecs / 60).toFixed(2)),
            user_id: user_id
        })
            .then(() => {
                // console.log("Success to Add calories of " + pos_name)
            })
            .catch((err) => {
                alert(err)
            })

            ;

        setRemainingSecs(0);
        setIsActive(false);
        navigation.navigate("Record_history")
    }
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs + 1);
                // console.log(remainingSecs)
            }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);
    return (

        <View style={styles.container}>
            <YoutubePlayer
                height={220}
                play={true}
                videoId={pos_video}
            />
            <Text style={styles.textTitle}>{'- ' + pos_name + ' -'}</Text>
            <View style={styles.subcontainer}>
                <Text style={styles.time}>{`${mins}:${secs}`}</Text>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={this.toggle} style={styles.buttonStart}>
                        <Text style={styles.text}>{isActive ? 'หยุด' : 'เริ่ม'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.reset} style={styles.buttonReset}>
                        <Text style={styles.text}>รีเซต</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.btn2}>
                        <TouchableOpacity onPress={() => record()} style={styles.buttonRecord}>
                            <Text style={styles.text}>บันทึก</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
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
        // flex: 1,
        justifyContent: "center",
        fontSize: 30,
        fontFamily: "FCMuffinRegular",
    },
    video: {
        flex: 1,
        alignSelf: 'stretch',
        // alignSelf: 'center',
        width: 320,
        height: 150,
    },
    time: {
        fontSize: 70,
        textAlign: 'center',
        marginTop: -10,
        marginBottom: 5,
        // color:'white'
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