import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image } from "react-native"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import { authentication } from "../Database/firebase"

const HistoryMenu = ({ props, route }) => {
  const user_id = authentication.currentUser?.uid
  const thisday = route.params.fDate
  const tdee = route.params.TDEE
  const addFood = firebase.firestore().collection("addFood")
  const [showMenu, setAddMenu] = useState([])

  useEffect(() => {
    addFood
      .where("user_id", "==", user_id)
      .orderBy("date", "desc")
      .onSnapshot((querySnapshot) => {
        const showMenu = []
        querySnapshot.forEach((doc) => {
          const { name, kcal, date, img } = doc.data()
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

  const sameday = showMenu.filter((item) => {
    const date = new Date(item.date.toDate().toISOString())
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const menuDate = day + "/" + month + "/" + year
    return menuDate == thisday
  })

  const [history, setHistory] = useState([])
  const workoutRef = firebase.firestore().collection("addWorkOut").where("user_id", "==", user_id)
  useEffect(() => {
    workoutRef.onSnapshot((querySnapshot) => {
      const history = []
      querySnapshot.forEach((doc) => {
        const { kcal, date } = doc.data()
        history.push({
          id: doc.id,
          kcal,
          date,
        })
      })
      setHistory(history)
    })
  }, [])

  let total = 0
  history.forEach((item) => {
    const date_kcal = new Date(item.date.toDate().toISOString())
    const year_kcal = date_kcal.getFullYear()
    const month_kcal = date_kcal.getMonth() + 1
    const dt_kcal = date_kcal.getDate()

    if (dt_kcal < 10) {
      dt_kcal = "0" + dt_kcal
    }
    if (month_kcal < 10) {
      month_kcal = "0" + month_kcal
    }
    const date_picker = dt_kcal + "/" + month_kcal + "/" + year_kcal
    if (date_picker === thisday) {
      total += item.kcal
    }
  })

  let Kcal_food = 0
  sameday.forEach((item) => {
    Kcal_food += item.kcal
  })

  let total_kcal = (Kcal_food - total).toFixed(2)

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={[styles.text, { flex: 2, backgroundColor: "#ffffe0" }]}>
      <TouchableOpacity
        style={{
          backgroundColor: "lightpink",
          width: 250,
          height: 250,
          borderRadius: 200,
          alignSelf: "center",
          margin: 10,
          borderColor: "#f25e97",
          borderWidth: 5,
        }}
      >
        <Text style={[styles.text, { fontSize: 30, marginTop: 45, marginBottom: 20 }]}>
          {total_kcal}
        </Text>
        <Text
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            width: 240,
            alignSelf: "center",
          }}
        ></Text>
        <Text style={[styles.text, { fontSize: 30, marginTop: 20 }]}>{tdee}</Text>
      </TouchableOpacity>

      <FlatList
        data={sameday}
        numColumns={1}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#eee",
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
export default HistoryMenu
