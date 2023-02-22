import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { useFonts } from "expo-font"

import MyNavigator from "./navigation/MyNavigator"

export default function App() {
  const [fontsLoaded] = useFonts({
    'FCMuffinRegular': require('./assets/fonts/FCMuffinRegular.otf'),
  });

  return (
    <MyNavigator/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
})
