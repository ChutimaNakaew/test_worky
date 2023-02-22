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
import { Badge, ListItem, SearchBar } from "react-native-elements"

const SignupPage = ({ navigation }) => {
  const [info, setInfo] = useState({ foodArr: [], islod: false })
  const [data, setData] = useState([])
  const [input, setInput] = useState("")
  const dbRef = firebase.firestore().collection("food")

  useEffect(() => {
    if (data == "") {
      return setData(info.foodArr)
    }
  })

  //----------------

  //หลัง render จะเรียกใช้งานเมดตอดนี้
  useEffect(() => {
    console.log("ใช้งาน UseEff")
    const unsub = dbRef.onSnapshot(getCollection)
  }, [])

  //ถ้า element ถูกลบออกจะอัพเดท
  // useEffect(() => {
  //     unsub();
  //     return () => {
  //     }
  // }, []);

  const getCollection = (querySnaphot) => {
    const foodArr = []
    querySnaphot.forEach((res) => {
      const { image, kcal, name } = res.data()
      foodArr.push({
        key: res.id,
        res,
        image,
        kcal,
        name,
      })
    })
    setInfo((previousState) => {
      const info = previousState
      return { ...info, foodArr: foodArr }
    })
  }
  //----------------

  // const InputValueUpdate = (val, props) => {
  //     info[props] = val;
  //     setInfo(info)
  // }

  // const StoreUser = () => {
  //     console.log("เข้าแล้วจ้า")
  //     if (info.username == "") {
  //         alert('Please fill username');
  //     } else {
  //         dbRef.add({
  //             username: info.username,
  //             email: info.email,
  //             password: info.password,
  //             uuid: info.uuid
  //         })
  //         navigation.navigate('QuestionSexPage')
  //     }
  // }
  // console.log("info");

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  const searchFunction = (text) => {
    if (text.length > -1 && text !== " ") {
      const updatedData = info.foodArr.filter((item) => {
        const item_data = `${item.name.toUpperCase()})`
        const text_data = text.toUpperCase()
        return item_data.indexOf(text_data) > -1
      })
      setData(updatedData)
      setInput(text)
    } else {
      setData(info.foodArr)
    }
  }

  return (
    <View style={styles.container}>
      {/* ใส่พื้นหลัง */}
      <ImageBackground
        source={require("../assets/ImageBackground/loginPageBG.png")}
        resizeMode="cover"
        style={styles.image}
      >
        {/* <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.navigate("AddminHome")}
        >
          <AntDesign name="arrowleft" size={40} color="white" />
        </TouchableOpacity> */}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.boxInfo}
        >
          <Text style={styles.textTitle}> รายชื่ออาหาร </Text>
          <View style={{ width: "100%" }}>
            <SearchBar
              platform="ios"
              placeholder="ค้นหา"
              lightTheme
              round
              value={input}
              onChangeText={(text) => searchFunction(text)}
              autoCorrect={false}
            />
          </View>
          <ScrollView style={styles.scrollView}>
            {data.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => navigation.navigate("AddminFoodDetail", { userKey: item.key })}
                >
                  <Badge value={i + 1} />

                  <ListItem.Content>
                    <ListItem.Title style={{ fontFamily: "FCMuffinRegular", fontSize: 25 }}>
                      {item.name}
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              )
            })}
          </ScrollView>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("AddminAddMenu")}
            >
              <Text style={styles.textButton}>เพิ่มเมนู</Text>
            </TouchableOpacity>
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
    // backgroundColor: "#e1e8ee",
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
    marginBottom: 10,
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
