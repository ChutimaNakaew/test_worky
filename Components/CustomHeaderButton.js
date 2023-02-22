import React from "react"
import { Platform } from "react-native"
import { HeaderButton } from "react-navigation-header-buttons"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';

const CustomHeaderButton = ( props ) => {
  const navigation = useNavigation();
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={28}
      color={"black"}
      onPress={() => navigation.navigate("BeforeLogin", {screen: "Logout"})}
    />
  )
}

export default CustomHeaderButton