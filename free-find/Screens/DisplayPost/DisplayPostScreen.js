import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import EmployerContact from '../../Shared/employerContact';

import axios from 'axios'
import { StackActions } from "@react-navigation/native";

import Toast from 'react-native-toast-message';
import config from "../../config";

// context
import AuthGlobal from '../../Context/store/AuthGlobal';

const DisplayPostScreen = (props) => {

  const context = useContext(AuthGlobal);

  const isComp = context.stateUser.user.isComp

  const [item, setItem] = useState(props.route.params.item);

  const [nameCheck, setNameCheck] = useState("")
  

  const postHandlerUser = async () => {

    let work_pending = await axios.patch(`${config.REACT_APP_API_URL}/users/work_pending/${context.stateUser.user.userId}/${item._id}`)
    let apply_user = await axios.put(`${config.REACT_APP_API_URL}/posts/apply/${item._id}/${context.stateUser.user.userId}`)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "สำเร็จ ทำการสมัครเรียบร้อย!!!",
            text2: "กรุณาตรวจสอบภายหลังในสถานะงาน"
          });
          setTimeout(() => {
            props.navigation.dispatch(
              StackActions.replace('Main')
            );
          }, 500)
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "มีบางอย่างผิดพลาด!",
          text2: "โปรดลองอีกครั้ง"
        })
      })

  }

  useEffect(() => {
    if (isComp) {
      setNameCheck(context.stateUser.user.compdata.name)
    } else {
      setNameCheck(context.stateUser.user.userdata.name)
    }
    return () => {
      setNameCheck("")
    }
  }, [])


  return (
    <View>
      <SafeAreaView style={{ backgroundColor: "#C5CFE3", }}>
        <ScrollView >
        
          <View style={item.type_of_work == "parttime" ? styles.typeOfWork : styles.typeOfWorkFull}><Text style={styles.typeOfWorkText}>{item.type_of_work == "parttime" ? "Part-Time" : "Full-Time"}</Text></View>

          <View style={styles.EmployerContact}>
            <EmployerContact image={item.image_who_post} name={item.name_who_post} />
          </View>

          <View style={styles.jobTitleBox}>
            <Text style={styles.jobTitleBoxtext}>รับสมัคร :  {item.title}
            </Text>
          </View>

          <View>
            <Image
              style={styles.imageStyle}
              source={{ uri: item.image ? item.image : "https://reactnative.dev/img/tiny_logo.png" }}
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
            <View style={{ backgroundColor: "#305D9A", borderRadius: 30, width: 140}}>
              <Text style={{ fontSize: 18, color: "#fff" }}>
                <Text>  </Text>จำนวน  {item.count_recruit}
              </Text>
            </View>

            <View style={{backgroundColor: "#75A9EE", borderRadius: 30, width: 140}}>
              <Text style={{ fontSize: 18,color: "#fff" }}>
                   <Text>  </Text>สมัครแล้ว  {item._id_apply.length}
              </Text>
            </View>
          </View>

          <View style={styles.contextDisplayPostBox}>
            <Text style={styles.contextDisplaytext}>{"    " + item.description}</Text>
          </View>

          <View style={styles.footSpace}>
            <Text>&nbsp; </Text>
          </View>

          <View style={{ marginLeft: 30, marginBottom: 15, flexDirection: "row",   }}>
            <Text style={{ fontSize: 18,backgroundColor: "#305D9A", borderRadius: 30, width: 80, color: "#fff"  }}>
              <Text>  </Text>ผู้ว่าจ้าง  
              
            </Text>
            <View style={{marginLeft: 30}}>
                <Text style={{fontSize: 18, backgroundColor: "#fff", borderRadius: 7, color: "#525354"}}>{item.name_who_post}</Text>

              </View>
          </View>

          {
            ((item.name_who_post == nameCheck) || (isComp))
              ?
              <View style={{ marginBottom: 30 }}>

              </View>
              :
              <View style={{ alignItems: "center", marginBottom: 30, marginTop: 20 }}>
                <TouchableOpacity style={styles.ApplyButtonContainer}
                  onPress={() => postHandlerUser()}
                >
                  <View>
                    <Text style={styles.textButton}>สมัคร</Text>
                  </View>
                </TouchableOpacity>
              </View>
          }


        </ScrollView>
      </SafeAreaView>
    </View>
  )
};

export default DisplayPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeadDisplayPost: {
    backgroundColor: "#DAE9FE",
    height: 99
  },
  textHeadDisplayPost: {
    paddingTop: 50,
    paddingLeft: 70,
    fontSize: 20,
    fontWeight: '400'
  },
  EmployerContact: {
    paddingRight: 100,
    paddingTop: 10
  },
  jobTitleBox: {
    marginTop: 15,
    flexDirection: "row",
    backgroundColor: '#9FAAFF',
    marginLeft: 30,
    marginRight: 40,
    borderRadius: 30
  },
  jobTitleBoxtext: {
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#262D62'
  },
  contextDisplayPostBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#525354",
    marginTop: 25,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: "row"
  },
  contextDisplaytext: {
    fontSize: 20,
    fontWeight: '400',
    color: "#43494c"
  },
  contactOwnerPostBox: {
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: "row"
  },
  contactOwnerPosttext: {
    fontSize: 15,
    fontWeight: '400'
  },
  employerPostBox: {
    marginTop: 2,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: "row"
  },
  employerPosttext: {
    fontSize: 15,
    fontWeight: '400'
  },
  typeOfWork: {
    backgroundColor: '#EC8484',
    marginLeft: 250,
    marginRight: 30,
    borderRadius: 40,
    marginTop: 15
  },
  typeOfWorkFull: {
    backgroundColor: '#80E1D0',
    marginLeft: 250,
    marginRight: 30,
    borderRadius: 40,
    marginTop: 15
  },
  typeOfWorkText: {
    fontSize: 15,
    fontWeight: '700',
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 23,
    color: '#ffffff',
  },
  imageStyle: {
    opacity: 0.95,
    height: 350,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20
  },
  textButton: {
    color: "#525354",
    width: '100%',
    textAlign: "center",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    fontWeight: "500"
  },
  ApplyButtonContainer: {
    backgroundColor: "#fff",
    width: 110,
    height: 40,
    borderRadius: 8
  },
});