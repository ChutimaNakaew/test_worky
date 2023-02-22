import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ScrollView, Button, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import firebase from "../Database/firebaseDB";
import { Badge, ListItem } from 'react-native-elements'


const SignupPage = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
    });

    const [info, setInfo] = useState({infoArr: [], islod: false});

    const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('exercise');

    //----------------

    //หลัง render จะเรียกใช้งานเมดตอดนี้
    useEffect(() => {
        console.log("ใช้งาน UseEff")
        const unsub = dbRef.onSnapshot(getCollection);
    }, []);

    //ถ้า element ถูกลบออกจะอัพเดท
    // useEffect(() => {
    //     unsub();
    //     return () => {
    //     }
    // }, []);

    const getCollection = (querySnaphot) => {
        const infoArr = [];
        querySnaphot.forEach((res) => {
            const { name } = res.data();
            infoArr.push({
                key: res.id,
                res,
                name
            })
        })
        setInfo((previousState) => {
            const info = previousState
            return {...info, infoArr: infoArr}
          })
    }
        //----------------

        // const InputValueUpdate = (val, props) => {
        //     info[props] = val;
        //     setInfo(info)
        // }

        // const StoreUser = () => {
        //     console.log("เข้าแล้วจ้า")
        //     if (info.username == "") {
        //         alert('Please fill username');
        //     } else {
        //         dbRef.add({
        //             username: info.username,
        //             email: info.email,
        //             password: info.password,
        //             uuid: info.uuid
        //         })
        //         navigation.navigate('QuestionSexPage')
        //     }
        // }
        // console.log("info");

        return (
            <View style={styles.container}>
                {/* ใส่พื้นหลัง */}
                <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.boxInfo}
                    >
                        <Text style={styles.textTitle}> ประเภทการออกกำลังกาย </Text>
                        <ScrollView style={styles.scrollView}>
                            {
                                info.infoArr.map((item, i) => {
                                    return (
                                        <ListItem
                                        key = {i}
                                        bottomDivider
                                        onPress={() => navigation.navigate('AddminWorkout', {userKey: item.key, name: item.name})}
                                        >
                                            <Badge
                                            value = {i+1}
                                            />

                                            <ListItem.Content>
                                                <ListItem.Title>
                                                    {item.name}
                                                </ListItem.Title>
                                            </ListItem.Content>
                                        </ListItem>
                                    )
                                }
                                )
                            }
                            {/* <TouchableOpacity style={styles.button}
                                onPress={() => navigation.navigate('AddminWorkout')} >
                                <Text style={styles.textButton}>เพิ่มประเภท</Text>
                            </TouchableOpacity> */}

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
            flex: 0.88,
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
            fontSize: 45,
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
            padding: 10,
            borderRadius: 10,
            backgroundColor: "lightgrey",
            fontFamily: "FCMuffinRegular",
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
    export default SignupPage;
