import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ScrollView, Button, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import firebase from "../Database/firebaseDB";
import uuid from 'react-uuid';
import { Badge, ListItem } from 'react-native-elements'


const UserDetail = ({ navigation, route }) => {
    let [fontsLoaded] = useFonts({
        'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
    });
    const { name_Weight, collect_name, userKey } = route.params;
    const colName = collect_name
    const name_weight = name_Weight;
    const key = userKey

    const [info, setInfo] = useState({image: "",
    kcal: "",
    posture_name: "",
    video: "",
    video_time: 0});
    const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('exercise').doc(name_weight).collection(colName).doc(key);
    
    const InputValueUpdate = (val, props) => {
        info[props] = val;
        setInfo(info)
         
    }

    const updateUser = () => {
         

        if (name_weight === "Weight Training"){
            const updatedbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('exercise').doc(name_weight).collection("Weight_Training_posture").doc(key);
            updatedbRef.set({
                image: info.image,
                kcal: parseFloat(info.kcal),
                posture_name: info.posture_name,
                video: info.video,
                video_time: parseFloat(info.video_time)
            }).then((docRef) => {
                 
                setInfo({
                    image: "",
                kcal: "",
                posture_name: "",
                video: "",
                video_time: 0
                })
                 
                navigation.navigate('AddminHome');
            })
        }else{
            const updatedbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('exercise').doc(name_weight).collection(colName).doc(key);
            
            updatedbRef.set({
                image: info.image,
                kcal: parseFloat(info.kcal),
                posture_name: info.posture_name,
                video: info.video,
                video_time: parseFloat(info.video_time)
            }).then((docRef) => {
                 
                setInfo({
                    image: "",
                kcal: "",
                posture_name: "",
                video: "",
                video_time: 0
                })
                 
                navigation.navigate('AddminHome');
            })
        }
    }

    const DelUser = ( )=> {

        if (name_weight === "Weight Training"){
            const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('exercise').doc(name_weight).collection("Weight_Training_posture").doc(key);
            dbRef.delete().then((res) => {
                navigation.navigate('AddminHome');
            })
        }else{
            const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('exercise').doc(name_weight).collection(colName).doc(key);
            dbRef.delete().then((res) => {
                navigation.navigate('AddminHome');
            })
        }

    }

    //หลัง render จะเรียกใช้งานเมดตอดนี้

    useEffect(() => {
        if (name_weight === "Weight Training"){
            const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('exercise').doc(name_weight).collection("Weight_Training_posture").doc(key);
            dbRef.get().then((res)=> {
                if (res.exists) {
                const work = res.data();
                setInfo({key: res.id, image: work.image, kcal: work.kcal, posture_name: work.posture_name, video: work.video, video_time: work.video_time})
                } else{
                    console.log("ไม่มีข้อมูล")
                }
            })
        }else{
            const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('exercise').doc(name_weight).collection(colName).doc(key);
            dbRef.get().then((res)=> {
                if (res.exists) {
                const work = res.data();
                setInfo({key: res.id, image: work.image, kcal: work.kcal, posture_name: work.posture_name, video: work.video, video_time: work.video_time})
                } else{
                    console.log("ไม่มีข้อมูล")
                }
            })
        }


    }, []);

        return (
            <View style={styles.container}>
                {/* ใส่พื้นหลัง */}
                <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.boxInfo}
                    >
                        <Text style={styles.textTitle}>{info.posture_name}</Text>
                        <ScrollView style={styles.scrollView}>
                        <Text style={styles.textNomal}>ชื่อ</Text>
                        <TextInput
        style={styles.TextInput}
        placeholder={info.posture_name}
        onChangeText={val => InputValueUpdate(val, 'posture_name')}
      />

<Text style={styles.textNomal}>kcal</Text>
      <TextInput
      keyboardType={'numeric'}
        style={styles.TextInput}
        placeholder={info.kcal.toString()}
        onChangeText={(val) => InputValueUpdate(val, 'kcal')}
      />

      <Text style={styles.textNomal}>รูปภาพ</Text>
      <TextInput
        style={styles.TextInput}
        placeholder={info.image}
        onChangeText={val => InputValueUpdate(val, 'image')}
      />

<Text style={styles.textNomal}>วีดีโฮ</Text>
      <TextInput
        style={styles.TextInput}
        placeholder={info.video}
        onChangeText={(val) => InputValueUpdate(val, 'video')}
      />

<Text style={styles.textNomal}>ความยาววีดีโฮ</Text>
      <TextInput
        style={styles.TextInput}
        placeholder={info.video_time.toString()}
        onChangeText={(val) => InputValueUpdate(val, 'video_time')}
      />

                            <TouchableOpacity style={styles.button}
                                onPress={() => updateUser()} >
                                <Text style={styles.textButton}>อัพเดท</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonDel}
                                onPress={() => DelUser()} >
                                <Text style={styles.textButton}>ลบ</Text>
                            </TouchableOpacity>

                        </ScrollView>
                    </KeyboardAvoidingView>

                </ImageBackground>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            position: "relative",
            flex: 1,
        },
        logo: {
            width: 250,
            height: 250,
            alignSelf: "center",
            marginBottom: 10,
        },
        image: {
            flex: 1,
            justifyContent: "center",
        },
        boxInfo: {
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: "white",
            flex: 0.9,
            width: "85%",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
        },
        button: {
            backgroundColor: "#F2DE77",
            width: "50%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 10,
            borderWidth: 1,
            textColor: "balck",
            marginTop: 10,
            fontFamily: "FCMuffinRegular",
        },
        textTitle: {
            fontFamily: "FCMuffinRegular",
            fontSize: 40,
            marginBottom: 10,
            marginTop: 10,
        },
        textNomal: {
            fontFamily: "FCMuffinRegular",
            fontSize: 25,
            marginBottom: 0,
            alignSelf: "flex-start",
            marginHorizontal: 12,
        },
        textButton: {
            fontFamily: "FCMuffinRegular",
            fontSize: 25,
            marginBottom: 0,
            alignSelf: "center",
        },
        buttonDel: {
            backgroundColor: "#DC143C",
            width: "50%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 10,
            borderWidth: 1,
            textColor: "balck",
            marginTop: 10,
            fontFamily: "FCMuffinRegular",
        },
        scrollView: {
            height: "100%",
            width: "100%",
        },
        TextInput: {
            height: 40,
            width: "90%",
            marginTop: 2,
            marginHorizontal: 12,
            marginBottom: 12,
            borderWidth: 1,
            padding: 4,
            paddingLeft: 9,
            borderRadius: 10,
            backgroundColor: "lightgrey",
            fontFamily: "FCMuffinRegular",
            fontSize: 24,
        },
        buttonBack: {
            backgroundColor: "black",
            width: 70,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 10,
            borderWidth: 1,
            textColor: "balck",
            marginTop: 10,
            fontFamily: "FCMuffinRegular",
            position: "absolute",
            top: 60,
            left: 20,
            zIndex: 1,
        },
    })
    export default UserDetail;
