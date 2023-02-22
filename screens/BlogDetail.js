import React from "react";
import { View, StyleSheet, Text, ScrollView, ImageBackground, Image } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useFonts } from "expo-font"

const BlogDetail = ({ route, navigation }) => {
  const { blogId } = route.params;
  const { blogdetail } = route.params;
  const { blogName } = route.params;
  const { blogImage } = route.params;
  const blogid = blogId;
  const blog_detail = blogdetail
  const blog_name = blogName
  const blog_image = blogImage


  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })


  return (

    <View style={styles.container}>

      <ImageBackground style={styles.image_bg} source={{ uri: blog_image }}>
        <View style={styles.header}>
          <Text>
          <Icon name="chevron-left" size={45} color="#000"
            onPress={navigation.goBack}
          />
          </Text>
        </View>

      </ImageBackground>
      <ScrollView>
        <Card
          title='HELLO WORLD' style={styles.cards}>

          <Text style={styles.textTitle}>
            {blog_name}
          </Text>
          <Text style={styles.text}> {blog_detail} </Text>
        </Card>

      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    // padding:5,
    backgroundColor: 'white',
    flex: 2
  },
  header: {
    marginTop: 50,
    flexDirection: 'row'
  },
  textTitle: {
    fontSize: 38,
    // fontWeight:"bold",
    justifyContent: "center",
    marginBottom: 10,
    fontFamily: "FCMuffinRegular",
  },
  text: {
    // flex: 1,
    justifyContent: "center",
    fontSize: 28,
    fontFamily: "FCMuffinRegular",
    color: '#4a4a4a'
    // alignItems: "center",
  },
  image_bg: {
    height: 280,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#f5cbcb',
    shadowOffset: { width: 5, height: 10 },
  },
  cards: {
    // borderColor:'#000',
    borderWidth: 10,
  }
});
export default BlogDetail;