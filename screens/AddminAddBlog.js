import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View,TouchableOpacity, Text, TextInput, KeyboardAvoidingView, ScrollView} from "react-native";
import { useFonts } from 'expo-font';
import firebase from "../Database/firebaseDB";
import uuid from 'react-uuid';


const SignupPage = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    'FCMuffinRegular': require('../assets/fonts/FCMuffinRegular.otf'),
  });

  const [info, setInfo] = useState({image: "", detail: "", name: "", background: ""});

  const dbRef = firebase.firestore().collection('workout').doc("XXVlurGq69GuDCTFmCU2").collection('blog');

  const InputValueUpdate = (val, props) =>{
    info[props] = val;
    setInfo(info)
  }

  const StoreUser = () =>{
    if (info.image == "" || info.detail == "" || info.name == "" || info.background == "") {
      alert('กรุณาใส่ข้อมูลให้ครบ');
    }else {
      dbRef.add({
        detail: info.detail,
        name: info.name,
        background: info.background,
        image: info.image,
        id: uuid()
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
      <Text style={styles.textTitle}>เพิ่มบล๊อก</Text>
      <ScrollView style={styles.scrollView}>
<Text style={styles.textNomal}>ชื่อบล๊อก</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="ชื่อบล๊อก"
        onChangeText={val => InputValueUpdate(val, 'name')}
      />

      <Text style={styles.textNomal}>รูปภาพ</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="รูปภาพ"
        onChangeText={val => InputValueUpdate(val, 'image')}
      />

<Text style={styles.textNomal}>รายละเอียด</Text>

<TextInput
   multiline={true}
   numberOfLines={12}
   textAlignVertical = "top"
   style={styles.TextArea}
        placeholder="รายละเอียด"
        onChangeText={(val) => InputValueUpdate(val, 'detail')}
        />

<Text style={styles.textNomal}>ภาพพื้นหลัง</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="ภาพพื้นหลัง"
        onChangeText={(val) => InputValueUpdate(val, 'background')}
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
export default SignupPage
