import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Image,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { useFonts } from "expo-font";

const QuestionWeightPage = ({navigation, route}) => {

    const [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
    });

    const {info3} = route.params
    const [info, setInfo] = useState(info3);

      const InputValueUpdate = (val, props) => {
        info[props] = val;
        setInfo(info)
         
    }

    return (
        <View style={styles.container}>
            {/* ใส่พื้นหลัง */}
            <ImageBackground
                source={require("../assets/ImageBackground/QuestionWeightBG.png")}
                resizeMode="cover"
                style={styles.image}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.boxInfo}
                >
                    <Text style={styles.textTitle}>น้ำหนักของคุณ</Text>
                    <ScrollView style={styles.scrollView}>

                    <TextInput
        style={styles.TextInput}
        placeholder="กก."
        keyboardType= "numeric"
        onChangeText={val => InputValueUpdate(val, 'weight')}
      />

    <Text style={styles.textTitle}>เป้าหมาย</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="กก."
        keyboardType= "numeric"
        onChangeText={val => InputValueUpdate(val, 'goal_weight')}
      />
      
                        
                        <TouchableOpacity style={styles.button}
                        onPress ={()=> {navigation.navigate('QuestionActivityPage',{info4: info})}}
                        >
                            <Text style={styles.textButton}>ต่อไป</Text>
                        </TouchableOpacity>
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
        flex: 0.73,
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
        marginTop: 40,
        fontFamily: "FCMuffinRegular",
    },
    textTitle: {
        fontFamily: "FCMuffinRegular",
        fontSize: 60,
        marginBottom: 20,
        marginTop: 20,
        textAlign: "center"
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
        height: 100,
        width: 100,
        marginTop: 0,
        marginHorizontal: 12,
        marginBottom: 0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "lightgrey",
        fontFamily: "FCMuffinRegular",
        textColor: "white",
        alignSelf: "center",
        textAlign: "center",
        fontSize: 50,
    },
});
export default QuestionWeightPage;
