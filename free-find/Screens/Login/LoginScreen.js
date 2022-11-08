import React, { useState, useEffect } from "react";
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
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const LoginScreen = (props) => {
//   const [emailInput, setEmailInput] = useState("");
//   const [passwordInput, setPasswordInput] = useState("");

  const [direction, setDirection] = useState("Persona");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);

  const baseUrl = "https://reqres.in";

  const [databaseURL, setDatabaseURL] = useState(
    "http://192.168.1.139:3333/api/v1/users/login"
  );

  const concurrentRequests = [axios.get(`${baseUrl}/api/users/1`)];

//   useEffect(() => {
//     const source = axios.CancelToken.source();
//     const url = `${baseUrl}/api/users/${userID}`;
//     // const url = 'http://192.168.1.139:3333/api/v1/users/login';
//     console.log(databaseURL);
//     const fetchUsers = async () => {
//       try {
//         setIsLoading(true);
//         // const response = await axios.get(url, {cancelToken:source.token})
//         const response = await axios.get(databaseURL, {
//           cancelToken: source.token,
//         });
//         console.log(response);
//         if (response.status === 200) {
//           setEmail(response.data.email);
//           setPassword(response.data.password);
//           // setEmail(response);
//           setIsLoading(false);
//           return;
//         } else {
//           throw new Error("Failed");
//         }
//       } catch (error) {
//         if (axios.isCancel(error)) {
//           console.log("cancel");
//         } else {
//           setErrorFlag(true);
//           setIsLoading(false);
//         }
//       }
//     };
//     fetchUsers();
//     return () => source.cancel("Data cancel");
//   }, [databaseURL]);

const checkEmail = async() => {
    console.log("use check email")
    const response = await axios.post(`http://192.168.177.176:3333/api/v1/users/login`, { email: email, password: password});
    //fconsole.log(response.data)
    if (response.status === 200 || response === 201) {
        console.log(response.data)
    } else if (response.status === 400){
        console.log("fail login")
    }
  }

  useEffect(() => {
    if (direction === "Persona") {
      setDatabaseURL("http://192.168.1.139:3333/api/v1/users/login");
      console.log("persona");
    } else {
      setDatabaseURL("http://192.168.1.139:3333/api/v1/userscompanies/login");
      console.log("business");
    }
  }, [direction]);

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
      {/* <View style={styles.header}>
                <Text style={{fontSize:20,color:'#4F6C93'}}>FreeFind</Text>
            </View> */}

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
          // onPress={changeUserID} disabled={isLoading}
          onPress={() => 
            // console.log(emailInput + "/" + passwordInput);
            checkEmail()

            // console.log(userID);
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
