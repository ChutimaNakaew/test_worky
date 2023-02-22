import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView, StatusBar, TouchableOpacity, Animated, Modal } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font"

const ModalPoup = ({ visible, vis2, vis3, vis4, vis5, vis6, children }) => {
  const [showModal, setShowModal] = React.useState(visible, vis2, vis3, vis4, vis5, vis6);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible, vis2, vis3, vis4, vis5, vis6]);
  const toggleModal = () => {
    if (visible || vis2 || vis3 || vis4 || vis5 || vis6) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const Tab3 = (props) => {



  const [visible, setVisible] = React.useState(false);
  const [vis2, setVis2] = React.useState(false);
  const [vis3, setVis3] = React.useState(false);
  const [vis4, setVis4] = React.useState(false);
  const [vis5, setVis5] = React.useState(false);
  const [vis6, setVis6] = React.useState(false);
  let [fontsLoaded] = useFonts({
    FCMuffinRegular: require("../../assets/fonts/FCMuffinRegular.otf"),
  })

  if (!fontsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor='rgba(0,0,0,0.0)'
        />
        {/* ---------------------------------------------------Modal Cardio---------------------------- */}
        <ModalPoup visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/x.png?alt=media&token=1b800b3d-4d78-4490-ae49-dff409dfbb27' }}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 40, marginTop: -20 }} >-คำแนะนำ-
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/doctor2.png?alt=media&token=e62ab87b-4146-4ec8-ba9d-3360b1c68bd5' }}
                style={{ height: 100, width: 100 }}
              />
            </Text>
          </View>

          <Text style={styles.detail}>
            ผู้ป่วยโรคข้อต่ออักเสบ ความดันโลหิตสูง และโรคเบาหวาน ควรปรึกษาแพทย์ก่อนเริ่มการออกกำลังกายแบบ Cardio

          </Text>
        </ModalPoup>

        <View style={styles.div}>
          <Text style={styles.text}>Cardio
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text> <FontAwesome5 name="exclamation-circle" size={24} color="#e3a909" />
              </Text>
            </TouchableOpacity>
          </Text>
          {/* -------------------------------------------------------------------------------------------- */}

          <TouchableOpacity onPress={() => { props.navigation.navigate("Cardio") }}>

            <Image
              style={styles.image}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/image.png?alt=media&token=1ad0bab8-1854-495d-94ad-910a53961d55'
              }}
            />

          </TouchableOpacity >
        </View>
        {/* --------------------------------------------------------Modal HIIT----------------------- */}
        <ModalPoup visible={vis2}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVis2(false)}>
                <Image
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/x.png?alt=media&token=1b800b3d-4d78-4490-ae49-dff409dfbb27' }}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 40, marginTop: -20 }} >-คำแนะนำ-
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/doctor2.png?alt=media&token=e62ab87b-4146-4ec8-ba9d-3360b1c68bd5' }}
                style={{ height: 100, width: 100 }}
              />
            </Text>
          </View>

          <Text style={styles.detail}>
            {`ผู้ที่มีปัญหาสุขภาพต่างๆของระบบหัวใจ\nและหลอดเลือด ไม่ควรทำHIIT`}

          </Text>
        </ModalPoup>
        <View style={styles.div}>
          <TouchableOpacity onPress={() => { props.navigation.navigate("HIIT") }}>
            <Text style={styles.text}>HIIT
              <TouchableOpacity onPress={() => setVis2(true)}>
                <Text > <FontAwesome5 name="exclamation-circle" size={24} color="#e3a909" />
                </Text>
              </TouchableOpacity>
            </Text>
            {/* ----------------------------------------------------------------------------------------------------------------------- */}
            <Image
              style={styles.image}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/image%20(1).png?alt=media&token=150f79cc-93c7-4257-9526-012830545e49'
              }}
            />
          </TouchableOpacity>
        </View>
        {/* --------------------------------------------------------Modal Weight Training----------------------- */}
        <ModalPoup visible={vis3}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVis3(false)}>
                <Image
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/x.png?alt=media&token=1b800b3d-4d78-4490-ae49-dff409dfbb27' }}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 40, marginTop: -20 }} >-คำแนะนำ-
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/doctor2.png?alt=media&token=e62ab87b-4146-4ec8-ba9d-3360b1c68bd5' }}
                style={{ height: 100, width: 100 }}
              />
            </Text>
          </View>

          <Text style={styles.detail}>
            {`ควรวอร์มอัพร่างกายก่อนเริ่มเวทเทรนนิ่ง\nทุกครั้ง โดยเริ่มจากการวอร์มอัพแบบ\nแอโรบิก เช่น เดิน วิ่งเหยาะๆ`}

          </Text>
        </ModalPoup>
        <View style={styles.div}>
          <TouchableOpacity onPress={() => { props.navigation.navigate("Weight_Training") }}>
            <Text style={styles.text}>Weight Training
              <TouchableOpacity onPress={() => setVis3(true)}>
                <Text > <FontAwesome5 name="exclamation-circle" size={24} color="#e3a909" />
                </Text>
              </TouchableOpacity>
            </Text>
            {/* ----------------------------------------------------------------------------------------------------------- */}

            <Image
              style={styles.image}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/image%20(2).png?alt=media&token=8e11542c-5395-4742-9c1f-6738e548c357'
              }}
            />
          </TouchableOpacity>
        </View>
        {/* --------------------------------------------------------Modal Pilates----------------------- */}
        <ModalPoup visible={vis4}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVis4(false)}>
                <Image
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/x.png?alt=media&token=1b800b3d-4d78-4490-ae49-dff409dfbb27' }}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 40, marginTop: -20 }} >-คำแนะนำ-
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/doctor2.png?alt=media&token=e62ab87b-4146-4ec8-ba9d-3360b1c68bd5' }}
                style={{ height: 100, width: 100 }}
              />
            </Text>
          </View>

          <Text style={styles.detail}>
            {`ผู้ที่มีความดันโลหิตไม่คงที่ มีความเสี่ยงในการเกิดลิ่มเลือด และผู้ป่วยโรคหมอนรองกระดูกเคลื่อนทับเส้นประสาท \nไม่ควรออกกำลังกายชนิดนี้`}
          </Text>
        </ModalPoup>
        <View style={styles.div}>
          <TouchableOpacity onPress={() => { props.navigation.navigate("Pilates") }}>
            <Text style={styles.text}>Pilates
              <TouchableOpacity onPress={() => setVis4(true)}>
                <Text > <FontAwesome5 name="exclamation-circle" size={24} color="#e3a909" />
                </Text>
              </TouchableOpacity>
            </Text>
            {/* ----------------------------------------------------------------------------------------------------------- */}
            <Image
              style={styles.image}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/image%20(3).png?alt=media&token=3d4a72d4-21d8-4eb3-88b7-cd461f1930cc'
              }}
            />
          </TouchableOpacity>
        </View>

        {/* --------------------------------------------------------Modal Yoga----------------------- */}
        <ModalPoup visible={vis5}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVis5(false)}>
                <Image
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/x.png?alt=media&token=1b800b3d-4d78-4490-ae49-dff409dfbb27' }}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 40, marginTop: -20 }} >-คำแนะนำ-
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/doctor2.png?alt=media&token=e62ab87b-4146-4ec8-ba9d-3360b1c68bd5' }}
                style={{ height: 100, width: 100 }}
              />
            </Text>
          </View>

          <Text style={styles.detail}>
            {`ผู้ป่วยโรคหมอนรองกระดูกเคลื่อน \nโรคกระดูกพรุนอย่างรุนแรง \nโรคความดันโลหิตสูง โรคเบาหวาน \nรวมถึงผู้ที่มีความเสี่ยงในการเกิดลิ่มเลือด หรือมีปัญหาในการทรงตัวอย่างรุนแรง \nควรปรึกษาแพทย์ก่อนหากต้องการฝึกโยคะ`}
          </Text>
        </ModalPoup>
        <View style={styles.div}>
          <TouchableOpacity onPress={() => { props.navigation.navigate("Yoga") }}>
            <Text style={styles.text}>Yoga
              <TouchableOpacity onPress={() => setVis5(true)}>
                <Text > <FontAwesome5 name="exclamation-circle" size={24} color="#e3a909" />
                </Text>
              </TouchableOpacity>
            </Text>
            {/* --------------------------------------------------------------------------------------------------------------- */}
            <Image
              style={styles.image}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/yoga.jpg?alt=media&token=f2920031-32ff-4c66-9f9d-c900150511b3'
              }}
            />
          </TouchableOpacity>
        </View>

        {/* --------------------------------------------------------Modal Aerobic---------------------- */}
        <ModalPoup visible={vis6}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVis6(false)}>
                <Image
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/x.png?alt=media&token=1b800b3d-4d78-4490-ae49-dff409dfbb27' }}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: "FCMuffinRegular", fontSize: 40, marginTop: -20 }} >-คำแนะนำ-
              <Image
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/doctor2.png?alt=media&token=e62ab87b-4146-4ec8-ba9d-3360b1c68bd5' }}
                style={{ height: 100, width: 100 }}
              />
            </Text>
          </View>

          <Text style={styles.detail}>
            {`ก่อนการออกกำลังกายทุกครั้งจะต้อง\nอบอุ่นร่างกายให้เพียงพอ และไม่ควรออกติดต่อกันเป็นเวลานานเกินไป`}
          </Text>
        </ModalPoup>
        <View style={styles.div}>
          <TouchableOpacity onPress={() => { props.navigation.navigate("Aerobic") }}>
            <Text style={styles.text}>Aerobic Exercise
              <TouchableOpacity onPress={() => setVis6(true)}>
                <Text > <FontAwesome5 name="exclamation-circle" size={24} color="#e3a909" />
                </Text>
              </TouchableOpacity>
            </Text>
            <Image
              style={styles.image}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/workout-5afba.appspot.com/o/aerobic2.png?alt=media&token=b7d9581e-1e7f-4410-9a13-5b1b7962d1a8'
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    marginTop:50,
  },
  div: {
    padding: 15,
    marginBottom: 20,

  },
  shadow: {
    shadowColor: '#202020',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom:-60,
    // marginTop:10,
    fontSize: 40,
    flexDirection: 'row',
    fontFamily: "FCMuffinRegular",
  },
  image: {
    width: 360,
    height: 140,
    resizeMode: 'contain',
    borderRadius: 35,
    borderColor:"#000",
    borderWidth:1,
    marginBottom: -30,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  detail: {
    marginVertical: 30,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: "FCMuffinRegular",
  }
});
export default Tab3;