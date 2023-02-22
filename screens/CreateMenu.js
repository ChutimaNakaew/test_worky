import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from "react-native"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"
import * as ImagePicker from "expo-image-picker"
import { authentication } from "../Database/firebase"

const CreateMenu = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [show, setShow] = useState(true)
  const [inputName, setInputName] = useState("")
  const [inputCal, setInputCal] = useState(0)
  const myMenu = firebase.firestore().collection("myMenu")
  const user_id = authentication.currentUser?.uid

  const add = async (name, cal, url) => {
    if (name !== "" && url !== null && cal !== "") {
      // get timestamp
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      const data = {
        name: name,
        date: timestamp,
        kcal: cal,
        img: url,
        user_id: user_id,
      }
      await myMenu
        .add(data)
        .then(() => {
          console.log("Add " + name)
          alert("✅ เพิ่มเมนู " + "'" + name + "'")
        })
        .catch((err) => {
          alert(err)
        })
    } else {
      alert("⚠️ โปรดกรอกข้อมูลให้ครบถ้วน")
      navigation.navigate("CreateMenu")
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    const source = { uri: result.uri }
    console.log(source)
    setImage(source)
  }

  const uploadImage = async () => {
    if (inputName !== "" && image !== null) {
      navigation.navigate("MyMenu")
      setUploading(true)
      const response = await fetch(image.uri)
      const blob = await response.blob()
      const fileName = image.uri.substring(image.uri.lastIndexOf("/") + 1)
      var ref = firebase.storage().ref().child(fileName)
      ref.put(blob).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          const name = inputName
          const cal = Number(inputCal)
          add(name, cal, url)
        })
      })

      try {
        await ref
      } catch (e) {
        console.log(e)
      }
      setUploading(false)
      setImage(null)
    } else if(inputName == "" || image == null) {
      alert("⚠️ โปรดกรอกข้อมูลให้ครบถ้วน")
      navigation.navigate("MyMenu")
    }
  }

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffffe0",
      }}
    >
      {show ? (
        <TouchableOpacity onPressIn={pickImage} onPressOut={() => setShow(!show)}>
          <Image
            style={{ width: 320, height: 200 }}
            source={{
              uri: "https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg",
            }}
          />
        </TouchableOpacity>
      ) : null}
      <View>
        {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
        <Text style={[styles.text, { textAlign: "left", marginTop: 15 }]}>ชื่อเมนู</Text>
        <TextInput
          onChangeText={(text) => setInputName(text)}
          style={[
            styles.text,
            {
              width: 320,
              backgroundColor: "#ddd",
              padding: 10,
              borderRadius: 20,
              marginVertical: 5,
            },
          ]}
        ></TextInput>

        <Text style={[styles.text, { textAlign: "left" }]}>ปริมาณแคลอรี่</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            onChangeText={(num) => setInputCal(num)}
            keyboardType="numeric"
            style={[
              styles.text,
              {
                width: 220,
                backgroundColor: "#ddd",
                padding: 10,
                borderRadius: 20,
                marginVertical: 5,
              },
            ]}
          ></TextInput>
          <Text
            style={[
              styles.text,
              {
                width: 95,
                backgroundColor: "#ddd",
                padding: 10,
                borderRadius: 20,
                marginLeft: 5,
                marginVertical: 5,
              },
            ]}
          >
            Kcal
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 320,
            backgroundColor: "lightgreen",
            padding: 10,
            marginTop: 10,
            borderRadius: 20,
            marginVertical: 5,
          }}
          onPress={uploadImage}
        >
          <Text style={styles.text}>สร้างเมนู</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateMenu

const styles = StyleSheet.create({
  text: {
    fontFamily: "FCMuffinRegular",
    fontSize: 24,
    textAlign: "center",
  },
})
