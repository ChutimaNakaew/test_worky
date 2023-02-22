import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from "react-native"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../../Database/firebaseDB"
import DateTimePicker from "@react-native-community/datetimepicker"
import { authentication } from "../../Database/firebase"
import {Picker} from '@react-native-picker/picker';
import { concat } from "react-native-reanimated"

const Home = ({ props, navigation }) => {
  const user_id = authentication.currentUser?.uid
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
  const val_change = (val) => {
    setAct(val)

    if (val === "1.2") {
      firebase
        .firestore()
        .collection("user")
        .doc(id_users)
        .update({
          activity: "นั่งอยู่กับที่และไม่ออกกำลังกายเลย",
        })
        .then(() => {
        })
        .catch((err) => {
          alert(err)
        })
    } else if (val === "1.375") {
      firebase
        .firestore()
        .collection("user")
        .doc(id_users)
        .update({
          activity: "ออกกำลังกายอาทิตย์ละ 1-3 วัน",
        })
        .then(() => {
        })
        .catch((err) => {
          alert(err)
        })
    } else if (val === "1.55") {
      firebase
        .firestore()
        .collection("user")
        .doc(id_users)
        .update({
          activity: "ออกกำลังกายอาทิตย์ละ 3-5 วัน",
        })
        .then(() => {
        })
    } else if (val === "1.725") {
      firebase
        .firestore()
        .collection("user")
        .doc(id_users)
        .update({
          activity: "ออกกำลังกายอาทิตย์ละ 6-7 วัน",
        })
        .then(() => {
        })
    } else if (val === "1.9") {
      firebase
        .firestore()
        .collection("user")
        .doc(id_users)
        .update({
          activity: "ออกกำลังกายทุกวันเช้าเย็น",
        })
        .then(() => {
        })
    }
  }

  const [weight, onChangeWeight] = useState(0)
  const [height, onChangeHeight] = useState(0)
  const [doc, setDoc] = useState(0)
  const [goal, setGoal] = useState(0)

  useEffect(() => {
    const user = firebase.firestore().collection("user")
    if (weight === 0) {
      info.map((item) => {
        onChangeWeight(item.weight)
        setDoc(item.id)
      })
    }
    if (height === 0) {
      info.map((item) => {
        onChangeHeight(item.height)
      })
    }
    if (goal === 0) {
      info.map((item) => {
        setGoal(item.goal_weight)
      })
    }
    if (weight) {
      user
        .doc(doc)
        .update({
          weight: weight,
        })
        .then(() => {

        })
        .catch((err) => {
          alert(err)
        })
    }
    if (height) {
      user
        .doc(doc)
        .update({
          height: height,
        })
        .then(() => {

        })
        .catch((err) => {
          alert(err)
        })
    }
    if (goal) {
      user
        .doc(doc)
        .update({
          goal_weight: goal,
        })
        .then(() => {

        })
        .catch((err) => {
          alert(err)
        })
    }
  })

  let bmi_num = 0
  let text_bmi = ""
  let bmr = 0
  let activity = ""
  let TDEE = 0
  let id_users = ""
  let bmi_img = ""
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
  // -----------------------------------ปฎิทินจ้า----------------------------------------------------------------------------
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)
  const [text, setText] = useState("Empty")
  const [getdate, setGetdate] = useState("")

  const [act, setAct] = useState("")

  // ---------------------------------set default ของปฎฺิทิน--------------------------
  useEffect(() => {
    var date = new Date().getDate() //Current Date
    var month = new Date().getMonth() + 1 //Current Month
    var year = new Date().getFullYear() //Current Year
    setGetdate(date + "/" + month + "/" + year)
  }, [])
  // ------------------------------------------------------------
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "androi")
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear()

    setText(fDate)

    setGetdate((getdate) => (getdate = fDate)) //---------------------วันที่ที่เลือกจะถูกเก็บค่าไว้ที่ getdate
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  // ----------------------------------------------------------------------จบปฎิทิน---------------------------------

  // --------------ดึงข้อมูลKcal workoutมาแสดงผลจ้า------------------------
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
  //------------------------------------------------------

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
            id,
            date,
            img,
          })
        })
        setAddMenu(showMenu)
      })
  }, [])

  //---------------------------------------------------
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

  let Kcal_food = 0
  sameday.forEach((item) => {
    Kcal_food += item.kcal
  })
  let total_workout = total.toFixed(2)
  let total_kcal = (Kcal_food - total).toFixed(2)
  // --------------------------------------------------------------

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ backgroundColor: "#a2cdfd", }}>
      <View style={{ flexDirection: "row", marginTop: 5, }}>
        <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, alignSelf: "center", marginLeft: 150, color: "#000", }}>
          {" "}
          {getdate}{" "}
        </Text>
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
        <TouchableOpacity style={styles.btnCalendar} onPress={() => showMode("date")}>
          <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 18 }}>ปฎิทิน</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          style={styles.img}
          source={{ uri: bmi_img !== "" ? bmi_img : undefined }}
        />
        <View>
          <TouchableOpacity style={styles.bmi}>
            <Text style={styles.text}>BMI : {bmi_num}</Text>
            <Text style={styles.line}></Text>
            <Text style={[styles.text, { fontSize: 30 }]}>{text_bmi}</Text>
          </TouchableOpacity>
          <View style={styles.goalWeight}>
            <Text style={styles.text}>Goal Weight</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TextInput
                style={styles.input}
                value={goal}
                onChangeText={(goal) => setGoal(goal)}
                keyboardType="numeric"
              ></TextInput>
              <Text style={[styles.text, { marginRight: 10 }]}>กก.</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.boxInfo}>
          {info.map((item, key) => (
            <Text key={key} style={[styles.text, { fontSize: 24 }]}>
              {" "}
              {item.username}{" "}
            </Text>
          ))}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.text}>น้ำหนัก:</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={(weight) => onChangeWeight(weight)}
              keyboardType="numeric"
            ></TextInput>
            <Text style={[styles.text, { marginRight: 10 }]}>กก.</Text>
            <Text style={styles.text}>ส่วนสูง:</Text>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={(height) => onChangeHeight(height)}
              keyboardType="numeric"
            ></TextInput>
            <Text style={[styles.text, { marginRight: 10 }]}>ซม.</Text>
          </View>
          {info.map((item, key) => (
            <Picker
              key={key}
              style={styles.pickerStyle}
              selectedValue={act}
              mode="dialog"
              onValueChange={val_change}
            >
              <Picker.Item label="นั่งอยู่กับที่และไม่ออกกำลังกายเลย" value="1.2" />
              <Picker.Item label="ออกกำลังกายอาทิตย์ละ 1-3 วัน" value="1.375" />
              <Picker.Item label="ออกกำลังกายอาทิตย์ละ 3-5 วัน" value="1.55" />
              <Picker.Item label="ออกกำลังกายอาทิตย์ละ 6-7 วัน" value="1.725" />
              <Picker.Item label="ออกกำลังกายทุกวันเช้าเย็น" value="1.9" />
            </Picker>
          ))}
        </TouchableOpacity>

      </View>


      <TouchableOpacity
        style={styles.resultWorkout}
        onPress={() => {
          navigation.navigate("Calender_workout", { date_pick: getdate })
        }}
      >
        <Text style={styles.text}>
          <Ionicons name="ios-trophy" size={20} color="#ffb81c" />
          บันทึกการออกกำลังกาย
        </Text>
      </TouchableOpacity>

      <View style={{ margin: 10, flexDirection: "row" }}>
        <View style={{ flexDirection: "column", marginRight: 120 }}>
          <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, marginTop: 10 }}>
            Total Workout
          </Text>
          <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 30, color: "red" }}>
            {" "}
            {total_workout} KCAL
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("คำนวณแคล", { screen: "Cal" })
          }}
          style={{ backgroundColor: "#eb5e93", width: 115, height: 115, borderRadius: 100 }}
        >
          <Text style={[styles.text, { marginTop: 10, color: "black" }]}> {total_kcal} </Text>

          <Text
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              width: 115,
              alignSelf: "center",
              marginBottom: 5,
            }}
          ></Text>
          <Text style={styles.text}>{TDEE} </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  pickerStyle: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#0090fd",
    color: "#000",
    alignSelf: "center"
  },
  text: {
    fontSize: 24,
    marginTop: 5,
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "FCMuffinRegular",
    color: "#000",
  },
  btnCalendar: {
    backgroundColor: "#f6bd64",
    padding: 5,
    borderRadius: 10,
    marginLeft: 80,
    alignSelf: "flex-end",
  },
  img: {
    width: 100,
    height: 200,
    resizeMode: "cover",
    marginLeft: 20,
    marginRight: 20,
  },
  bmi: {
    backgroundColor: "#0090fd",
    alignSelf: "flex-end",
    width: 210,
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    margin: 2,
  },
  goalWeight: {
    backgroundColor: "#0090fd",
    alignSelf: "flex-end",
    width: 210,
    marginLeft: 0,
    padding: 10,
    borderRadius: 20,
  },
  boxInfo: {
    backgroundColor: "#0090fd",
    width: 350,
    alignSelf: "center",
    margin: 5,
    borderRadius: 20,
    height: 150,
  },
  input: {
    width: 50,
    margin: 5,
    textAlign: "center",
  },
  resultInfo: {
    backgroundColor: "lightpink",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    margin: 10,
    textAlign: "center",
    fontFamily: "FCMuffinRegular",
  },
  resultWorkout: {
    backgroundColor: "#0090fd",
    width: 200,
    alignSelf: "center",
    margin: 5,
    padding: 10,
    textAlign: "center",
    borderRadius: 15,
  },
})
export default Home
