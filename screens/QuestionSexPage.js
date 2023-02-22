import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

const QuestionSexPage = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    });


    const [info, setInfo] = useState({username:"", email:"", password:"", uuid: "",sex: "", weight:"", goal_weight:"", height:"", activity:""});


    const men = (props) => {
        info.sex = props;
        navigation.navigate('QuestionAgePage', {data: info})
    }

    return (
        <View style={styles.container}>
            {/* ใส่พื้นหลัง */}
            <ImageBackground
                source={require("../assets/ImageBackground/QuestionSexPageBG.png")}
                resizeMode="cover"
                style={styles.image}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.boxInfo}
                >
                    <Text style={styles.textTitle}>เลือกเพศของคุณ</Text>
                    <ScrollView style={styles.scrollView}>
                        <TouchableOpacity style={styles.buttonF}
                        onPress={() => men("men")}
                        >
                            <Text style={styles.textButton}>👱🏼‍♂️ ผู้ชาย</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonM}
                        onPress = {() => men("female")}
                        >
                        <Text style={styles.textButton}>👩🏻 ผู้หญิง</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>ต่อไป</Text>
                        </TouchableOpacity> */}
                    </ScrollView>
                </KeyboardAvoidingView>
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
        flex: 0.44,
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
        marginBottom: 10,
        fontFamily: "FCMuffinRegular",
    }
});
export default QuestionSexPage;
