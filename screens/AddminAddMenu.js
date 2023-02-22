import React, { useState } from 'react';
import { StyleSheet, ImageBackground, Image, View,TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ScrollView, Button, Pressable} from "react-native";
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import firebase from "../Database/firebaseDB";
import uuid from 'react-uuid';


const SignupPage = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
  });

  const [info, setInfo] = useState({img:"", kcal:0, name:""});

  const dbRef = firebase.firestore().collection('food');

  const InputValueUpdate = (val, props) =>{
    info[props] = val;
    setInfo(info)
  }

  const StoreUser = () =>{
    if (info.name == "" || info.img == "" || info.kcal == "") {
      alert('กรุณาใส่ข้อมูลให้ครบ');
    }else {
      dbRef.add({
        img: info.img,
        name: info.name,
        kcal: parseFloat(info.kcal),
      })
      navigation.navigate('AddminHome')
    }
    } 


  return (
    <View style={styles.container}>
      {/* ใส่พื้นหลัง */}
      <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>
      
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.boxInfo}
    >
      <Text style={styles.textTitle}>เพิ่มเมนู</Text>
      <ScrollView style={styles.scrollView}>

<Text style={styles.textNomal}>ชื่อเมนู</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="ชื่อเมนู"
        onChangeText={val => InputValueUpdate(val, 'name')}
      />

      <Text style={styles.textNomal}>รูปภาพ</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="รูปภาพ"
        onChangeText={val => InputValueUpdate(val, 'img')}
      />

<Text style={styles.textNomal}>kcal</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="kcal"
        keyboardType={'numeric'}
        onChangeText={(val) => InputValueUpdate(val, 'kcal')}
      />
      <TouchableOpacity style={styles.button}
      onPress={() => StoreUser()} >
      <Text style={styles.textButton}>สำเร็จ</Text>
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
export default SignupPage
