import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  ImageBackground,
  Image,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  Alert,
} from "react-native"
import { useFonts } from "expo-font"
import { AntDesign } from "@expo/vector-icons"
import firebase from "../Database/firebaseDB"
import uuid from "react-uuid"
import { authentication } from "../Database/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

const LoginPage = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [islogin, setLogin] = useState(false)
  const [info2, setInfo2] = useState([])
  const userRef = firebase.firestore().collection('addmin')
  const adminUID = "Uo5njNSrNcab9KdNvmrgR0vnB0s2"

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

  const LoginUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        setLogin(true)
        console.log(re)
      })
      .catch((re) => {
        console.log(re)
        Alert.alert("ข้อมูลไม่ถูกต้อง")
      })
  }

  return (
    <View style={styles.container}>
      {/* ใส่พื้นหลัง */}
      <ImageBackground
        source={require("../assets/ImageBackground/loginPageBG.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.boxInfo}
        >
          <Text style={styles.textTitle}>ลงชื่อเข้าใช้</Text>
          <ScrollView style={styles.scrollView}>

            <Text style={styles.textNomal}>อีเมล</Text>
            <TextInput
              onChangeText={(val) => setEmail(val)}
              style={styles.TextInput}
              // value="2@gmail.com"
              placeholder="อีเมล"
            />

            <Text style={styles.textNomal}>รหัสผ่าน</Text>
            <TextInput
              onChangeText={(val) => setPassword(val)}
              style={styles.TextInput}
              placeholder="Password"
              secureTextEntry={true}
            // value="111111111"
            />

            <TouchableOpacity style={styles.button} onPress={() => LoginUser()}>
              <Text style={styles.textButton}>เข้าสู่ระบบ</Text>
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
  logo: {
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
    flex: 0.5,
    width: "85%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightblue",
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
  marginBottom: 10,
  borderWidth: 1,
  padding: 4,
  paddingLeft: 9,
  borderRadius: 10,
  backgroundColor: "lightgrey",
  fontFamily: "FCMuffinRegular",
  fontSize: 24,
        },
})
export default LoginPage
