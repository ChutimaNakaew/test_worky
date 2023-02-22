import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native"
import { useFonts } from "expo-font"

const AddminHome = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })
  return (
    <View style={styles.container}>
      {/* ใส่พื้นหลัง */}
      <ImageBackground
        source={require("../assets/ImageBackground/AddminHomeBG.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.boxInfo}
        >
          <Text style={styles.textTitle}>ผู้ดูแลระบบ</Text>
          <ScrollView style={styles.scrollView}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate("AddminFood")}
            >
              <Text style={styles.textButton}>🥗 อาหาร</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate("AddminBlog")}
            >
              <Text style={styles.textButton}>📄 บล๊อก</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button3}
              onPress={() => navigation.navigate("AddminWorkoutCategory")}
            >
              <Text style={styles.textButton}>💪🏻 ออกกำลังกาย</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button4} onPress={() => navigation.navigate("AllUser")}>
              <Text style={styles.textButton}>😃 ผู้ใช้งาน</Text>
            </TouchableOpacity>

            <Pressable onPress={() => navigation.navigate("Logout")} style={styles.button}>
              <Text style={styles.textButton}>ออกจากระบบ</Text>
            </Pressable>
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
    flex: 0.7,
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
  button1: {
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
  button2: {
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
  },
  button3: {
    backgroundColor: "lightgreen",
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
  button4: {
    backgroundColor: "#1334",
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
})
export default AddminHome
