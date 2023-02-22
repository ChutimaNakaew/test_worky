import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../Database/firebaseDB"

const Aerobic = ({ props, navigation }) => {
  const [aerobic, setAerobic] = useState([])
  const workoutRef = firebase.firestore().collection('workout').doc('XXVlurGq69GuDCTFmCU2').collection('exercise').doc('Aerobic').collection('Aerobic_posture')


  useEffect(() => {
    workoutRef.onSnapshot((querySnapshot) => {
      const aerobic = []
      querySnapshot.forEach((doc) => {
        const { posture_name, kcal, id, image, video, video_time } = doc.data()
        aerobic.push({
          id: doc.id,
          posture_name,
          kcal,
          id,
          image,
          video,
          video_time
        })
      })
      setAerobic(aerobic)
    })
  }, [])

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.header}>
    <Text onPress={navigation.goBack} style={{paddingLeft:8}}><FontAwesome5 name="chevron-left" size={30} color="#000" /> </Text>
       <FlatList
          data={aerobic}
          numColumns={2}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => { navigation.navigate("Video_pose(Mix ver.)", { postureId: item.id, postureName: item.posture_name, postureVideo: item.video, postureKcal: item.kcal, postureTiming: item.video_time }) }}
              >
                <Text numberOfLines={1} style={styles.title}>
                      {item.posture_name}
                    </Text>
                <ImageBackground source={{ uri: item.image }} style={styles.img_bg} resizeMode='stretch'>
                 
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        />
    </View>
  )
}
const styles = StyleSheet.create({
  header:{
    marginTop:60,
    backgroundColor: 'lightblue',
  },
  text: {
    fontFamily: "FCMuffinRegular",
    fontSize: 18,
    textAlign: "center",
  },
  gridItem: {
    flex: 1,
    margin: 5,
    height: 200,
    width: 185,
  },
  container: {
    flex: 1,
    // borderRadius: 10,
    // shadowColor: "black",
    // shadowOpacity: 0.26,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 10,
    // elevation: 3,
    // padding: 5,
    justifyContent: "space-between",
    alignItems: "flex-end",
    // marginBottom:20
    // flexWrap: "wrap",
  },
  title: {
    fontFamily: "FCMuffinRegular",
    fontSize: 25,
    textAlign: "center",
    flexWrap: "wrap",
    // marginBottom:10,
    // flex: 1,
    // backgroundColor: "#rgba(217, 217, 217, 0.8)",
  },
  img_bg:{
    flex: 1 ,
    width:180,
    height:150
  },
  
})
export default Aerobic