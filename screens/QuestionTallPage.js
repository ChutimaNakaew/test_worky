import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { useFonts } from "expo-font";

const QuestionTallPage = ({navigation, route}) => {
    let [fontsLoaded] = useFonts({
        FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
      })

    const {info2} = route.params
    const [info, setInfo] = useState(info2);
    
      if (!fontsLoaded) {
        return null
      }

      const InputValueUpdate = (val, props) => {
        info[props] = val;
        setInfo(info)
         
    }
    return (
        <View style={styles.container}>
            {/* ใส่พื้นหลัง */}
            <ImageBackground
                source={require("../assets/ImageBackground/QuestionTallBG.png")}
                resizeMode="cover"
                style={styles.image}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.boxInfo}
                >
                    <Text style={styles.textTitle}>ส่วนสูงของคุณ</Text>
                    <ScrollView style={styles.scrollView}>

                    <TextInput
        style={styles.TextInput}
        placeholder="ซม."
        keyboardType= "numeric"
        onChangeText={val => InputValueUpdate(val, 'height')}
      />
                        
                        <TouchableOpacity style={styles.button}
                        onPress ={()=> {navigation.navigate('QuestionWeighPage',{info3: info})}}
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
        flex: 0.45,
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
        width: 200,
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
export default QuestionTallPage;
