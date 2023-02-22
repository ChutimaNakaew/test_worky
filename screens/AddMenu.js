import React, { Component, useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList } from "react-native"
import { useFonts } from "expo-font"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import firebase from "../Database/firebaseDB"
import { authentication } from "../Database/firebase"

const AddMenu = ({ props, navigation, route }) => {
  const thisday = route.params.getdate
  const user_id = authentication.currentUser?.uid
  // const thisday = date
  const addFood = firebase.firestore().collection("addFood")
  const [showMenu, setAddMenu] = useState([])
  useEffect(() => {
    addFood
    .where('user_id', '==', user_id)
    .orderBy("date", "desc")
    .onSnapshot(async (querySnapshot) => {
      const showMenu = []
      await querySnapshot.forEach((doc) => {
        const { name, kcal, date, img, } = doc.data()
        showMenu.push({
          key: doc.id,
          name,
          kcal,
          date,
          img,
        })
      })
      setAddMenu(showMenu)
    })
  }, [])

  const delMenu = (item) => {
    addFood
      .doc(item.key)
      .delete()
      .then(() => {
        console.log("Delete " + item.name)
        alert("❌ ลบเมนู " + "'" + item.name + "'")
      })
      .catch((err) => {
        alert(err)
      })
  }

  const sameday = showMenu.filter((item) => {
    if (item.date !== null) {
      const date = new Date(item.date.toDate().toISOString())
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const menuDate = day + "/" + month + "/" + year
      return menuDate == thisday
    }
  })

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ flex: 2, paddingTop: 10 ,backgroundColor: "#ffffe0"}}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AllMenu")
          }}
          style={{ backgroundColor: "lightblue", padding: 10, width: 120, borderRadius: 15, marginLeft: 30, marginVertical: 10 }}
        >
          <Text style={styles.text}>เมนูอาหาร</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddMyMenuNavigator")
          }}
          style={{ backgroundColor: "pink", padding: 10, width: 120, borderRadius: 15, marginLeft: 100, marginVertical: 10 }}
        >
          <Text style={styles.text}>เมนูของฉัน</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.text, { textAlign: "left", margin: 10 }]}>เมนูวันนี้</Text>

      <FlatList
        data={sameday}
        numColumns={1}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#f9f9f9",
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
              <Text style={[styles.text, { color: "#000" }]}>{item.name}</Text>
              <Text style={[styles.text, { color: "#000" }]}>{item.kcal} Kcal</Text>
            </View>
            <TouchableOpacity
              onPress={() => delMenu(item)}
              style={{
                marginRight: 4,
                marginBottom: 4,
                alignSelf: "flex-end",
              }}
            >
              <MaterialCommunityIcons name="delete-circle" size={32} color="#ff3f5b" />
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
export default AddMenu
