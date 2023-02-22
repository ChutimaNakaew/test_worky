import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import { SearchBar } from "react-native-elements"
import { authentication } from "../Database/firebase"

const AllMenu = ({ props, navigation }) => {

  const [food, setFood] = useState([])
  const foodRef = firebase.firestore().collection("food")
  const addFood = firebase.firestore().collection("addFood")
  const [input, setInput] = useState("")
  const [data, setData] = useState("")

  useEffect(() => {
    if (data == "") {
      return setData(food)
    }
  })

  useEffect(() => {
    foodRef.onSnapshot((querySnapshot) => {
      const food = []
      querySnapshot.forEach((doc) => {
        const { name, kcal, img } = doc.data()
        food.push({
          id: doc.id,
          name,
          kcal,
          img,
        })
      })
      setFood(food)
    })
  }, [])

  const add = (item) => {
    // check have this menu
    if (item.name && item.id && item.kcal && item.img) {
      // get timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      const user_id = authentication.currentUser?.uid
      const data = {
        name: item.name,
        date: timestamp,
        kcal: item.kcal,
        id: item.id,
        img: item.img,
        user_id: user_id,
      }
      addFood
        .add(data)
        .then(() => {
          console.log("Add " + item.name)
          alert("✅ เพิ่มเมนู " + "'" + item.name + "'")
        })
        .catch((err) => {
          alert(err)
        })
    }
  }

  const searchFunction = (text) => {
    if (text.length > -1 && text !== " ") {
      const updatedData = food.filter((item) => {
        const item_data = `${item.name.toUpperCase()})`
        const text_data = text.toUpperCase()
        return item_data.indexOf(text_data) > -1
      })
      setData(updatedData)
      setInput(text)
    } else {
      setData(food)
    }
  }

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ backgroundColor: "#fff", flex: 2 }}>
      <SearchBar
        platform="ios"
        placeholder="ค้นหา"
        lightTheme
        round
        value={input}
        onChangeText={(text) => searchFunction(text)}
        autoCorrect={false}
      />
      <FlatList
        data={data}
        numColumns={1}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F2F4C0",
              marginHorizontal: 30,
              marginVertical: 10,
              shadowColor: "#171717",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Image style={styles.image} source={{ uri: item.img }} />
            <View style={{ flexDirection: "column", justifyContent: "center", flex: 2 }}>
              <Text style={[styles.text, { marginLeft: 0 }]}>{item.name}</Text>
              <Text style={[styles.text, { marginLeft: 0 }]}>{item.kcal} Kcal</Text>
            </View>
            <TouchableOpacity
              onPress={() => add(item)}
              style={{
                marginRight: 5,
                marginTop: 5,
                alignSelf: "flex-start",
              }}
            >
              <FontAwesome5 name="plus-circle" size={24} color="#61B15A" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  text: {
    fontFamily: "FCMuffinRegular",
    fontSize: 22,
    textAlign: "center",
  },

  image: {
    width: 180,
    height: 200,
    resizeMode: "cover",
    flex: 2,
  },
})
export default AllMenu
