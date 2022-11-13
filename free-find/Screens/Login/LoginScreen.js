import React, { useState, useEffect, useContext } from "react";
import { StackActions } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Platform,
  ScrollView,
  SafeAreaView
} from "react-native";


// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser, loginUserCompany } from "../../Context/actions/Auth.actions";


const LoginScreen = (props) => {

  const context = useContext(AuthGlobal)

  const [direction, setDirection] = useState("Persona");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")



  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.dispatch(
        StackActions.replace('Main')
      );
    }
  }, [context.stateUser.isAuthenticated])


  const handleSubmit = async () => {
    const user = {
      email,
      password
    }


    if (email === "" || password === "") {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน")
    } else {
      if (direction === "Persona") {
        loginUser(user, context.dispatch)
      } else {
        loginUserCompany(user, context.dispatch)
      }
    }
  }

  const PreviewLayout = ({ values, selectedValue, setSelectedValue }) => (
    <View style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => {
            setSelectedValue(value);
          }}
          style={[
            styles.buttonChoice,
            selectedValue === value && styles.selected,
          ]}
        >
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20, color: '#4F6C93' }}>FreeFind</Text>
        </View>

        <View style={styles.icon}>
          <Text
            style={{
              color: "#305D9A",
              fontWeight: "bold",
              fontSize: 40,
              height: 80,
            }}
          >
            ลงชื่อเข้าใช้
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              height: 160,
            }}
          >
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  backgroundColor: "#D6E2F3",
                  width: 60,
                  height: 120,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  style={{ width: "100%", height: 70 }}
                  source={require("../Picture/left.png")}
                />
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#ACC9EF",
                alignItems: "center",
                justifyContent: "flex-end",
                flex: 2,
              }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../Picture/Logo.png")}
              />
              <Image
                style={{ width: "100%", height: "20%" }}
                source={require("../Picture/center.png")}
              />
            </View>

            <View
              style={{
                alignItems: "flex-end",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  backgroundColor: "#D6E2F3",
                  width: 60,
                  height: 120,
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  style={{ width: "100%", height: 70 }}
                  source={require("../Picture/right.png")}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Text
            style={{
              color: "#305D9A",
              fontWeight: "bold",
              fontSize: 30,
              height: 50,
            }}
          >
            อีเมล
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>

          <Text
            style={{
              color: "#305D9A",
              fontWeight: "bold",
              fontSize: 30,
              height: 50,
              marginTop: 10,
            }}
          >
            รหัสผ่าน
          </Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>

          <View style={{ marginTop: 20 }}>
            <PreviewLayout
              selectedValue={direction}
              values={["Business", "Persona"]}
              setSelectedValue={(values) => {
                setDirection(values);
              }}
            ></PreviewLayout>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#4F6C93",
              height: 50,
              width: 250,
              marginTop: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
            }}
            onPress={() =>
              handleSubmit()
            }
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 30 }}>
              เข้าสู่ระบบ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 30,
              width: 150,
              marginTop: 20,
              alignItems: "center",
              borderRadius: 6,
            }}
            onPress={() => props.navigation.navigate("Register", { item: {} })}
          >
            <Text
              style={{ color: "#819CC0", fontWeight: "normal", fontSize: 16 }}
            >
              สร้างบัญชีผู้ใช้
            </Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 40,
    marginLeft: 20,
  },
  icon: {
    flex: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  body: {
    flex: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#EDF5FF",
  },
  input: {
    height: 40,
    width: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonChoice: {
    borderRadius: 10,
    backgroundColor: "white",
    width: 80,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selected: {
    backgroundColor: "#4980CB",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#4980CB",
  },
  selectedLabel: {
    color: "white",
  },
});

export default LoginScreen;
