import React from "react"
// import library ที่จำเป็น
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import { NavigationContainer, StackActions } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { useFonts } from "expo-font"

// import screen ที่เกี่ยวข้อง
import Home from "../screens/Tab/Home"
import Cal from "../screens/Tab/Cal"
import tab3 from "../screens/Tab/tab3"
import Blog from "../screens/Tab/Blog"
import CustomHeaderButton from "../Components/CustomHeaderButton"
import AddMenu from "../screens/AddMenu"
import HistoryMenu from "../screens/HistoryMenu"
import cardio from "../screens/Cardio"
import hiit from "../screens/HIIT"
import weight_training from "../screens/Weight_Training"
import pilates from "../screens/Pilates"
import yoga from "../screens/Yoga"
import aerobic from "../screens/Aerobic"
import BlogDetail from "../screens/BlogDetail"
import AllMenu from "../screens/AllMenu"
import VideoScreen from "../screens/Video_posture"
import Video_pos from "../screens/Video_pose(Mix ver.)"
import History from "../screens/Record_history"
import MyMenu from "../screens/MyMenu"
import CreateMenu from "../screens/CreateMenu"
import UpdateMyMenu from "../screens/UpdateMyMenu"
import Calender from "../screens/Calender_workout"

//q
import FristScreen from "../screens/FristScreen"
import SignupPage from "../screens/SignupPage"
import QuestionSexPage from "../screens/QuestionSexPage"
import LogOut from "../screens/LogOut"
import QuestionAgePage from "../screens/QuestionAgePage"
import QuestionTallPage from "../screens/QuestionTallPage"
import QuestionWeighPage from "../screens/QuestionWeightPage"
import QuestionActivityPage from "../screens/QuestionActivityPage"
import LoginPage from "../screens/LoginPage"

//admin
import AddminFoodDetail from "../screens/AddminFoodDetail"
import AddminFood from "../screens/AddminFood"
import AddminHome from "../screens/AddminHome"
import AddminAddMenu from "../screens/AddminAddMenu"
import AddminBlog from "../screens/AddminBlog"
import AddminAddBlog from "../screens/AddminAddBlog"
import AddminBlogDetail from "../screens/AddminBlogDetail"
import AllUser from "../screens/AllUser"
import UserDetail from "../screens/UserDetail"
import AddminWorkout from "../screens/AddminWorkout"
import AddminWorkoutCategory from "../screens/AddminWorkoutCategory"
import AddminWorkoutDetail from "../screens/AddminWorkoutDetail"
import AddminAddWork from "../screens/AddminAddWork"

// สร้าง navigator ตามโจทย์กำหนด
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const info_type = createNativeStackNavigator()
const Blogdetail = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function Addmin() {
  return (
    <Stack.Navigator initialRouteName="AddminHome">
      <Stack.Screen name="AddminHome" component={AddminHome} options={{ headerShown: false }} />
      <Stack.Screen name="AddminFood" component={AddminFood} options={{ headerShown: false }} />
      <Stack.Screen name="AddminFoodDetail" component={AddminFoodDetail} options={{ headerShown: false }} />
      <Stack.Screen name="AddminAddMenu" component={AddminAddMenu} options={{ headerShown: false }} />
      <Stack.Screen name="AddminBlog" component={AddminBlog} options={{ headerShown: false }} />
      <Stack.Screen name="AddminAddBlog" component={AddminAddBlog} options={{ headerShown: false }} />
      <Stack.Screen name="AddminBlogDetail" component={AddminBlogDetail} options={{ headerShown: false }} />
      <Stack.Screen name="AllUser" component={AllUser} options={{ headerShown: false }} />
      <Stack.Screen name="UserDetail" component={UserDetail} options={{ headerShown: false }} />
      <Stack.Screen name="AddminWorkout" component={AddminWorkout} options={{ headerShown: false }} />
      <Stack.Screen name="AddminWorkoutCategory" component={AddminWorkoutCategory} options={{ headerShown: false }} />
      <Stack.Screen name="AddminWorkoutDetail" component={AddminWorkoutDetail} options={{ headerShown: false }} />
      <Stack.Screen name="AddminAddWork" component={AddminAddWork} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function Frist() {
  return (
    <Stack.Navigator initialRouteName="FristScreen">
      <Stack.Screen name="FristScreen" component={FristScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupComplete} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name="AddminHome" component={AddminHome} options={{ title: "", headerShown: false }} />
      <Stack.Screen name="Logout" component={LogOut} options={{ headerShown: false }} />
      <Stack.Screen name="Admin" component={Addmin} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function Question() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QuestionSexPage"
        component={QuestionSexPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionAgePage"
        component={QuestionAgePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionTallPage"
        component={QuestionTallPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionWeighPage"
        component={QuestionWeighPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionActivityPage"
        component={QuestionActivityPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function SignupComplete() {
  return (
    <Stack.Navigator initialRouteName="Question">
      <Stack.Screen name="Question" component={Question} options={{ headerShown: false }} />
      <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name="Calender_workout"
        component={Calender}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function CalNavigator() {
  return (
    <Stack.Navigator initialRouteName="Cal">
      <Stack.Screen name="Cal" component={Cal} options={{ title: "", headerShown: false }} />
      <Stack.Screen
        name="AddMenuNavigator"
        component={AddMenuNavigator}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="HistoryMenu"
        component={HistoryMenu}
        options={({ route }) => ({
          title: "เมนูวันที่ " + route.params.fDate,
          headerTitleStyle: { fontFamily: "FCMuffinRegular", fontSize: 28 },
        })}
      />
    </Stack.Navigator>
  )
}

function AddMenuNavigator() {
  return (
    <Stack.Navigator initialRouteName="AddMenu">
      <Stack.Screen
        name="AddMenu"
        component={AddMenu}
        options={({ route }) => ({
          title: "เมนูวันที่ " + route.params.getdate,
          headerTitleStyle: { fontFamily: "FCMuffinRegular", fontSize: 28 },
        })}
      />
      <Stack.Screen
        name="AllMenu"
        component={AllMenu}
        options={{
          title: "เมนูทั้งหมด",
          headerTitleStyle: { fontFamily: "FCMuffinRegular", fontSize: 28 },
        }}
      />
      <Stack.Screen
        name="AddMyMenuNavigator"
        component={AddMyMenuNavigator}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  )
}

function AddMyMenuNavigator() {
  return (
    <Stack.Navigator initialRouteName="MyMenu">
      <Stack.Screen
        name="MyMenu"
        component={MyMenu}
        options={{
          title: "เมนูของฉัน",
          headerTitleStyle: { fontFamily: "FCMuffinRegular", fontSize: 28 },
        }}
      />
      <Stack.Screen name="CreateMenu" component={CreateMenu} options={{ title: "" }} />
      <Stack.Screen name="UpdateMyMenu" component={UpdateMyMenu} options={{ title: "" }} />
    </Stack.Navigator>
  )
}

function Myinfo_type() {
  return (
    <info_type.Navigator initialRouteName="Catagories">
      <info_type.Screen
        name="Catagories"
        component={tab3}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <info_type.Screen
        name="Cardio"
        component={cardio}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <info_type.Screen
        name="HIIT"
        component={hiit}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <info_type.Screen
        name="Weight_Training"
        component={weight_training}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <info_type.Screen
        name="Pilates"
        component={pilates}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <info_type.Screen
        name="Yoga"
        component={yoga}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <info_type.Screen
        name="Aerobic"
        component={aerobic}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <info_type.Screen
        name="Video_posture"
        component={VideoScreen}
        options={{
          title: "",
          headerShown: false,
        }}
        // screenOptions={{          }}
      />
      <info_type.Screen
        name="Video_pose(Mix ver.)"
        component={Video_pos}
        options={{
          title: "",
          headerShown: false,
        }}
        // screenOptions={{          }}
      />
      <info_type.Screen
        name="Record_history"
        component={History}
        // screenOptions={{          }}
      />
    </info_type.Navigator>
  )
}
function Myblogdetail() {
  return (
    <Blogdetail.Navigator initialRouteName="Blog">
      <Blogdetail.Screen
        name="Blog"
        component={Blog}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <Blogdetail.Screen
        name="BlogDetail"
        component={BlogDetail}
        options={{
          headerShown: false,
          title: "",
          // headerTintColor: "white",
          // headerC
        }}
      />
    </Blogdetail.Navigator>
  )
}

function MainTab() {
  return (
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: "",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title="" iconName="settings-sharp" onPress={() => {}} />
            </HeaderButtons>
          ),
          tabBarIcon: () => {
            return <Ionicons name="home-outline" size={24} color="black" />
          },
          tabBarLabel: "Home",
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="คำนวณแคล"
        component={CalNavigator}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="calculator-outline" size={24} color="black" />
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ออกกำลังกาย"
        component={Myinfo_type}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="barbell-outline" size={24} color="black" />
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="บล็อก"
        component={Myblogdetail}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="newspaper-outline" size={24} color="black" />
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="FristScreen">
      <Stack.Screen
        name="BeforeLogin"
        component={Frist}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen name="Main" component={MainTab} options={{ title: "", headerShown: false }} />
    </Stack.Navigator>
  )
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  )
}
