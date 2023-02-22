import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  Pressable,
} from "react-native"
import { useFonts } from "expo-font"
import { AntDesign } from "@expo/vector-icons"
import firebase from "../Database/firebaseDB"
import uuid from "react-uuid"
import { Badge, ListItem } from "react-native-elements"

const UserDetail = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })
  const { userKey } = route.params
  const key = userKey

  const [info, setInfo] = useState({ username: "", email: "", password: "", uuid: "" })
  const [info2, setInfo2] = useState({ username: "", email: "", password: "", uuid: "" })

  const dbRef = firebase.firestore().collection("user").doc(key)

  const InputValueUpdate = (val, props) => {
    info[props] = val
    setInfo(info)
  }

  const updateUser = () => {
    if (info.username !== "" || info.email !== "" || info.password !== "") {
      const updatedbRef = firebase.firestore().collection("user").doc(key)
      updatedbRef
        .set({
          username: info.username,
          email: info.email,
          password: info.password,
          uuid: info.uuid,
        })
        .then((docRef) => {
          setInfo({
            username: "",
            email: "",
            password: "",
            uuid: "",
          })

          navigation.navigate("AddminHome")
        })
    } else {
      alert("⚠️ โปรดกรอกข้อมูลให้ครบ")
    }
  }

  const DelUser = () => {
    const dbRef = firebase.firestore().collection("user").doc(key)
    dbRef.delete().then((res) => {
      navigation.navigate("AddminHome")
    })
  }
  //หลัง render จะเรียกใช้งานเมดตอดนี้

  useEffect(() => {
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data()
        setInfo({
          key: res.id,
          username: user.username,
          email: user.email,
          password: user.password,
          uuid: user.uuid,
        })
      } else {
        console.log("ไม่มีข้อมูลจ้า")
      }
    })
  }, [])

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
          <Text style={styles.textTitle}>แก้ไขสมาชิก {info.username} </Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.textNomal}>ชื่อ</Text>
            <TextInput
              style={styles.TextInput}
              placeholder={info.username}
              onChangeText={(val) => InputValueUpdate(val, "username")}
            />

            <Text style={styles.textNomal}>อีเมล</Text>
            <TextInput
              style={styles.TextInput}
              placeholder={info.email}
              onChangeText={(val) => InputValueUpdate(val, "email")}
            />

            <Text style={styles.textNomal}>รหัสผ่าน</Text>
            <TextInput
              style={styles.TextInput}
              placeholder={info.password}
              onChangeText={(val) => InputValueUpdate(val, "password")}
            />

            <Text style={styles.textNomal}>UUID</Text>
            <TextInput
              style={styles.TextInput}
              value={info.uuid}
              editable={false}
              onChangeText={(val) => InputValueUpdate(val, "password")}
            />
            <TouchableOpacity style={styles.button} onPress={() => updateUser()}>
              <Text style={styles.textButton}>อัพเดท</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDel} onPress={() => DelUser()}>
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
    flex: 0.8,
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
export default UserDetail
