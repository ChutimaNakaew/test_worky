import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useFonts } from "expo-font"
import firebase from "../../Database/firebaseDB"

const Blog = ({ props, navigation }) => {
  const [blog, setBlog] = useState([])
  const blogRef = firebase.firestore().collection('workout').doc('XXVlurGq69GuDCTFmCU2').collection('blog');

  useEffect(() => {
    blogRef.onSnapshot((querySnapshot) => {
      const blog = []
      querySnapshot.forEach((res) => {
        const { name, id, detail, image, background } = res.data()
        blog.push({
          id: res.id,
          name,
          id,
          detail,
          image,
          background
        })
      })
      setBlog(blog)
    })
  }, [])

  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.header}>
      <FlatList
        data={blog}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => { navigation.navigate("BlogDetail", { blogId: item.id, blogdetail: item.detail, blogName: item.name, blogImage: item.image }) }}
            >
              <ImageBackground source={{ uri: item.background }} style={{ flex: 1 }} resizeMode="cover">
                <View style={[styles.container, { flexDirection: "row" }]}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
              </ImageBackground>
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
    fontSize: 18,
    textAlign: "center",
  },
  header: {
    marginTop: 50,
    backgroundColor: "lightblue"
  },
  gridItem: {
    flex: 1,
    // margin: 5,
    height: 250,
    width: '100%',
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "FCMuffinRegular",
    fontSize: 22,
    textAlign: 'center',
    flexWrap: "wrap",
    flex: 1,
    backgroundColor: "#e6edfa",
  },
})
export default Blog
