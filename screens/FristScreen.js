import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { authentication } from "../Database/firebase"

const adminUID = "Uo5njNSrNcab9KdNvmrgR0vnB0s2"

const QuestionSexPage = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    });
    useEffect(() => {    
        const unsubscribe = authentication.onAuthStateChanged((user) => {
          if (user) {
            if(user.uid === adminUID){
              navigation.replace("Admin")
            }else{
              navigation.replace("Main")
            }
          }
        })
        return unsubscribe
        }, [])
    return (
        <View style={styles.container}>
            {/* ใส่พื้นหลัง */}
            <ImageBackground
                source={require("../assets/ImageBackground/FristScreenBG.png")}
                resizeMode="cover"
                style={styles.image}
            >
                <View
                    style={styles.boxInfo}
                >
                    <View style={styles.scrollView}>
                    <Image
        style={styles.logo}
        source={require('../assets/WORKY_LOGO.gif')}
      />
                        <TouchableOpacity style={styles.buttonF} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.textButton} >เข้าสู่ระบบ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonM} onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.textButton} >ลงทะเบียน</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: 270,
        height: 270,
        alignSelf: "center",
        marginBottom: 20,
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
    logo: {
        width: 300,
        height: 300,
        alignSelf: "center",
        marginBottom: 10,
        marginTop: 10,
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
        marginTop: 50,
        fontFamily: "FCMuffinRegular",
    },
    textTitle: {
        fontFamily: "FCMuffinRegular",
        fontSize: 60,
        marginBottom: 20,
        marginTop: 20,
    },
    textNomal: {
        fontFamily: "FCMuffinRegular",
        fontSize: 25,
        marginBottom: 0,
        alignSelf: "start",
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
    },
    buttonF: {
        backgroundColor: "pink",
        width: "50%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        textColor: "balck",
        marginTop: 20,
        fontFamily: "FCMuffinRegular",
    },
    buttonM: {
        backgroundColor: "lightblue",
        width: "50%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        textColor: "balck",
        marginTop: 20,
        fontFamily: "FCMuffinRegular",
    }
});
export default QuestionSexPage;