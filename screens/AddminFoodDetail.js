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
    const { userKey } = route.params;
    const key = userKey

    const [info, setInfo] = useState({img:"", kcal:"", name:""});
    const [name, setName] = useState({img:"", kcal:"", name:""});

    const dbRef = firebase.firestore().collection('food').doc(key)

    
    const InputValueUpdate = (val, props) => {
        info[props] = val;
        setInfo(info)
         
        setName(info)
    }
    const food = info.name

    const updateUser = () =>{
         
        const updatedbRef = firebase.firestore().collection('food').doc(key)
        updatedbRef.set({
            img: info.img,
            kcal: parseFloat(info.kcal),
            name: info.name,
        }).then((docRef) => {
             
            setInfo({
                img:"", kcal:"", name:""
            })
             
            navigation.navigate('AddminHome');
        })
    }

    const DelUser = ( )=> {
        const dbRef = firebase.firestore().collection('food').doc(key)
        dbRef.delete().then((res) => {
            navigation.navigate('AddminHome');
        })
    }

    //หลัง render จะเรียกใช้งานเมดตอดนี้

    useEffect(() => {
        dbRef.get().then((res)=> {
            if (res.exists) {
            const food = res.data();
            setInfo({key: res.id, name: food.name, img: food.img, kcal:food.kcal})
            } else{
                console.log("ไม่มีข้อมูล")
            }
        })
    }, []);

    //ถ้า element ถูกลบออกจะอัพเดท
    // useEffect(() => {
    //     unsub();
    //     return () => {
    //     }
    // }, []);

        return (
            <View style={styles.container}>
                {/* ใส่พื้นหลัง */}
                <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.boxInfo}
                    >
                        <Text style={styles.textTitle}>{food}</Text>
                        <ScrollView style={styles.scrollView}>
                        <TextInput
        style={styles.TextInput}
        placeholder={info.name}
        onChangeText={val => InputValueUpdate(val, 'name')}
      />

      <Text style={styles.textNomal}>รูปภาพ</Text>
      <TextInput
        style={styles.TextInput}
        placeholder={info.img}
        onChangeText={val => InputValueUpdate(val, 'img')}
      />

<Text style={styles.textNomal}>kcal</Text>
      <TextInput
        style={styles.TextInput}
        placeholder={info.kcal.toString()}
        keyboardType={'numeric'}
        onChangeText={(val) => InputValueUpdate(val, 'kcal')}
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
            flex: 0.6,
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
        textTitle: {
            fontFamily: "FCMuffinRegular",
            fontSize: 60,
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
    export default UserDetail;
