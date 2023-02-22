import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ScrollView, Button, Pressable } from "react-native";
import { useFonts } from 'expo-font';
import firebase from "../Database/firebaseDB";


const UserDetail = ({ navigation, route }) => {
    let [fontsLoaded] = useFonts({
        'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
    });
    const { userKey } = route.params;
    const key = userKey

    const [info, setInfo] = useState({ image: "", kcal: "", posture_name: "", video: "", video_time:0 });

    const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('blog').doc(key)

    //     setInfo((previousState) => {
    //         const info = previousState
    //         return {...info, userArr: userArr}
    //       })

    const InputValueUpdate = (val, props) => {
        info[props] = val;
        setInfo(info)
    }

    const updateUser = () => {
        const updatedbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('blog').doc(key)
        updatedbRef.set({
            image: info.image,
            detail: info.detail,
            name: info.name,
            background: info.background
        }).then((docRef) => {
            setInfo({
                image: "", detail: "", name:"", background:""
            })
            navigation.navigate('AddminHome');
        })
    }

    const DelUser = () => {
        const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('blog').doc(key)
        dbRef.delete().then((res) => {
            navigation.navigate('AddminHome');
        })
    }
    //หลัง render จะเรียกใช้งานเมดตอดนี้
    useEffect(() => {
        console.log("ใช้ UseEff");
        dbRef.get().then((res) => {
            if (res.exists) {
                const blog = res.data();
                setInfo({ key: res.id, image: blog.image, detail: blog.detail, name: blog.name, background: blog.background })
            } else {
                console.log("ไม่มีข้อมูลจ้า")
            }
        })
    }, []);


    return (
        <View style={styles.container}>
            {/* ใส่พื้นหลัง */}
            <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.boxInfo}
                >
                    <Text style={styles.textTitle}>{info.name}</Text>
                    <ScrollView style={styles.scrollView}>
                    <Text style={styles.textNomal}>ชื่อ</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={info.name}
                            onChangeText={val => InputValueUpdate(val, 'name')}
                        />

                        <Text style={styles.textNomal}>รูปภาพ</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={info.image}
                            onChangeText={val => InputValueUpdate(val, 'img')}
                        />

                        <Text style={styles.textNomal}>รายละเอียด</Text>
                        <TextInput
                        multiline={true}
                        numberOfLines={12}
                        textAlignVertical = "top"
                            style={styles.TextArea}
                            placeholder={info.detail}
                            onChangeText={(val) => InputValueUpdate(val, 'kcal')}
                        />

<Text style={styles.textNomal}>รูปพื้นหลัง</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={info.background}
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
        flex: 0.9,
        width: "85%",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
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
    },TextArea: {
        height: 200,
        width: "90%",
        marginTop: 2,
        marginHorizontal: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "lightgrey",
        fontFamily: "FCMuffinRegular",
      }
})
export default UserDetail;
