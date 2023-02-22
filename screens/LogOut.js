import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Image, View,TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ScrollView, Button, Pressable} from "react-native";
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import firebase from "../Database/firebaseDB";
import uuid from 'react-uuid';
import { authentication } from '../Database/firebase';
import { signOut } from "firebase/auth";

const LoginPage = ({navigation}) => {
  const [fontsLoaded] = useFonts({
    'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [islogin, setIslogin] = useState(false);

  // useEffect(() =>{
  //   const unsubscribe = authentication.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate('QuestionSexPage')
  //     }
  //   })
  //   return unsubscribe
  // }, [])
   

  const LogOut = () =>{
    signOut(authentication).then((re)=>{
    setIslogin(false)
      console.log("ออกจากระบบ");
      // navigation.navigate('FristScreen')
      navigation.replace("FristScreen")
    })
    .catch((re)=>{
      console.log(re);
      console.log("ออกจากระบบบัคจ้า");
    }
    )
  }

  return (
    <View style={styles.container}>
      {/* ใส่พื้นหลัง */}
      <ImageBackground source={require("../assets/ImageBackground/loginPageBG.png")} resizeMode="cover" style={styles.image}>
      
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.boxInfo}
    >
      <Text style={styles.textTitle}>ออกจากระบบ</Text>
      <ScrollView style={styles.scrollView}>

      <Text style={styles.textNomal}>อีเมล: {authentication.currentUser?.email}</Text>
      <Text style={styles.textNomal}>UID: {authentication.currentUser?.uid}</Text>
    
      <TouchableOpacity style={styles.button}
      onPress={() => LogOut()}
      >
      <Text style={styles.textButton}>ออกจากระบบ</Text>
      </TouchableOpacity>

      </ScrollView>
      
      </KeyboardAvoidingView>

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo:{
    width: 270,
    height: 270,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  boxInfo: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    flex: 0.38,
    width: "85%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "pink",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    fontFamily: "FCMuffinRegular",
  },
  textTitle: {
    fontFamily: "FCMuffinRegular",
    fontSize: 60,
    marginTop: 20,
  },
  textNomal: {
    fontFamily: "FCMuffinRegular",
    fontSize: 25,
    marginBottom: 0,
    alignSelf: "flex-start",
    marginHorizontal: 12
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
  }
});
export default LoginPage;