import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../../Database/firebaseDB"
import DateTimePicker from "@react-native-community/datetimepicker"
import { authentication } from "../../Database/firebase"

const Cal = ({ props, navigation }) => {
  const user_id = authentication.currentUser?.uid
  const addFood = firebase.firestore().collection("addFood")
  const [showMenu, setAddMenu] = useState([])
  useEffect(() => {
    addFood
      .where("user_id", "==", user_id)
      .orderBy("date", "desc")
      .onSnapshot(async (querySnapshot) => {
        const showMenu = []
        await querySnapshot.forEach((doc) => {
          const { name, kcal, id, date, img } = doc.data()
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

  const userRef = firebase.firestore().collection("user").where("uuid", "==", user_id)
  const [info, setInfo] = useState([])
  useEffect(() => {
    userRef.onSnapshot((querySnapshot) => {
      const info = []
      querySnapshot.forEach((doc) => {
        const { activity, age, email, goal_weight, height, password, sex, username, weight } =
          doc.data()
        info.push({
          id: doc.id,
          activity,
          age,
          email,
          goal_weight,
          height,
          password,
          sex,
          username,
          weight,
        })
      })
      setInfo(info)
    })
  }, [])

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)
  const [text, setText] = useState("Empty")
  const [getdate, setGetdate] = useState("")

  let bmi_num = 0
  let text_bmi = ""
  let bmr = 0
  let activity = ""
  let TDEE = 0
  let id_users = ""
  const [bmi, setBmi] = useState(0)
  const [active, setActive] = useState(0)

  let bmi_img = ""
  const [img, setImg] = useState("")
  info.forEach((item) => {
    id_users += item.id
    let bmi = (
      (parseFloat(item.weight) * 10000) /
      (parseFloat(item.height) * parseFloat(item.height))
    ).toFixed(2)
    bmi_num += Number(bmi)
    if (bmi_num < 18.5) {
      if (item.sex === "men") {
        bmi_img +=
          "https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/boy1-removebg-preview.png?alt=media&token=7ce82eeb-6238-4778-8551-10bbfce56e8a"
        text_bmi += "ผอม"
      } else if (item.sex === "female") {
        bmi_img +=
          "https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/g1-removebg-preview.png?alt=media&token=7d28d7ab-d808-46ba-8b59-99652ac3fb80"
        text_bmi += "ผอม"
      }
    } else if (bmi_num >= 18.5 && bmi_num < 25) {
      if (item.sex === "men") {
        bmi_img +=
          "https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/boy2-removebg-preview.png?alt=media&token=8a371bc6-33f6-4d08-b05c-8000d4ecfebf"
        text_bmi += "สมส่วน"
      } else if (item.sex === "female") {
        bmi_img +=
          "https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/g2-removebg-preview.png?alt=media&token=83aa020d-d3e7-4f1e-83cb-32fb52725e17"
        text_bmi += "สมส่วน"
      }
    } else if (bmi_num >= 25 && bmi_num < 30) {
      if (item.sex === "men") {
        text_bmi += "อ้วน"
        bmi_img +=
          "https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/boy3-removebg-preview.png?alt=media&token=887e0699-2604-4305-938a-f4d9db6966a9"
      } else if (item.sex === "female") {
        text_bmi += "อ้วน"
        bmi_img +=
          "https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/g3-removebg-preview.png?alt=media&token=a7c27a51-83f4-4cc3-8d24-1efa977f3403"
      }
    } else if (bmi_num >= 30) {
      if (item.sex === "men") {
        text_bmi += "อ้วนมาก"
        bmi_img +=
          "https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/boy4-removebg-preview.png?alt=media&token=fa888a6b-4c99-42c1-b5d4-aaf666d04408"
      } else if (item.sex === "female") {
        text_bmi += "อ้วนมาก"
        bmi_img +=
          "https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/g4-removebg-preview.png?alt=media&token=bde4e9de-f75a-413b-8f22-1ccd9673d4cf"
      }
    }

    if (item.sex === "men") {
      bmr += 66 + 13.7 * item.weight + 5 * item.height - 6.8 * item.age
    } else if (item.sex === "female") {
      bmr += 665 + 9.6 * item.weight + 1.8 * item.height - 4.7 * item.age
    }

    if (item.activity === "นั่งอยู่กับที่และไม่ออกกำลังกายเลย") {
      activity += 1.2

      TDEE += Number((bmr * activity).toFixed(0))
    } else if (item.activity === "ออกกำลังกายอาทิตย์ละ 1-3 วัน") {
      activity += 1.375

      TDEE += Number((bmr * activity).toFixed(0))
    } else if (item.activity === "ออกกำลังกายอาทิตย์ละ 3-5 วัน") {
      activity += 1.55
      TDEE += Number((bmr * activity).toFixed(0))
    } else if (item.activity === "ออกกำลังกายอาทิตย์ละ 6-7 วัน") {
      activity += 1.725
      TDEE += Number((bmr * activity).toFixed(0))
    } else if (item.activity === "ออกกำลังกายทุกวันเช้าเย็น") {
      activity += 1.9
      TDEE += Number((bmr * activity).toFixed(0))
    }
  })

  useEffect(() => {
    var date = new Date().getDate() //Current Date
    var month = new Date().getMonth() + 1 //Current Month
    var year = new Date().getFullYear() //Current Year
    setGetdate(date + "/" + month + "/" + year)
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "androi")
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear()
    setGetdate((getdate) => (getdate = fDate)) //---------------------วันที่ที่เลือกจะถูกเก็บค่าไว้ที่ getdate

    navigation.navigate("HistoryMenu", { fDate, TDEE })
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const sameday = showMenu.filter((item) => {
    if (item.date !== null) {
      const date = new Date(item.date.toDate().toISOString())
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const menuDate = day + "/" + month + "/" + year
      return menuDate == getdate
    }
  })

  // --------------ดึงข้อมูลKcalมาแสดงผลจ้า------------------------
  const [history, setHistory] = useState([])
  const workoutRef = firebase.firestore().collection("addWorkOut").where("user_id", "==", user_id)
  //-------------------------KCAl workout---------------------
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
    if (item.date !== null) {
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
      if (date_picker === getdate) {
        total += item.kcal
      }
    }
  })

  let Kcal_food = 0
  sameday.forEach((item) => {
    Kcal_food += item.kcal
  })

  let total_kcal = (Kcal_food - total).toFixed(2)

  // --------------------------------------------------------------

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }
  return (
    <View style={{ flex: 2, marginTop: 40, backgroundColor: "#ffffe0", }}>
      <View style={{ alignItems: "flex-end", marginTop: 10, marginRight: 10 }}>
        {show && (
          <DateTimePicker
            testID="dateTimePicket"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <TouchableOpacity
          style={{ backgroundColor: "lightblue", width: 100, padding: 10, borderRadius: 15 }}
          onPress={() => showMode("date")}
        >
          <Text style={styles.text}>ประวัติ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddMenuNavigator", { screen: "AddMenu", params: { getdate } })
          }}
          style={{
            backgroundColor: "lightgreen",
            width: 100,
            padding: 10,
            borderRadius: 15,
            marginTop: 10,
          }}
        >
          <Text style={styles.text}>บันทึกเมนู</Text>
        </TouchableOpacity>
      </View>
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
        <Text style={[styles.text, { fontSize: 30, marginTop: 20 }]}>{TDEE}</Text>
      </TouchableOpacity>
      <FlatList
        data={sameday}
        numColumns={2}
        renderItem={({ item }) => (
          <View>
            <View
              style={styles.gridItem}
              onPress={() => {
                props.onSelect()
              }}
            >
              <ImageBackground source={{ uri: item.img }} style={{ flex: 1 }} resizeMode="cover">
                <View style={[styles.container, { flexDirection: "row" }]}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.title} numberOfLines={1}>
                    { } {item.kcal} Kcal
                  </Text>
                </View>
              </ImageBackground>
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
    fontSize: 18,
    textAlign: "center",
  },
  gridItem: {
    flex: 1,
    margin: 5,
    height: 120,
    width: 185,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "FCMuffinRegular",
    fontSize: 16,
    textAlign: "center",
    flexWrap: "wrap",
    flex: 1,
    backgroundColor: "#rgba(217, 217, 217, 0.8)",
  },
})
export default Cal
