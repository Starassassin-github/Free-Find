import React, { useState, useEffect } from "react";
import {SafeAreaView, ScrollView,View, StyleSheet,Image,Text,TextInput,TouchableOpacity,Button,AppState,Alert } from 'react-native';
import { AppStateService } from "../../AppStateService";

const RegisterScreen = (props) => {
    const [item, setItem] = useState(props.route.params.item)
    
    const [direction, setDirection] = useState("Business");
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const createThreeButtonAlert = () =>
    Alert.alert(
      username,
      "โทรศัพท์ : " + phone + "\n" + "อีเมล : " + email,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );


    useEffect(() => {


        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        
        return () => {
            setItem()
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);


        }
    }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{alignItems: 'flex-start', flex:1}}>
                    <Text style={{fontSize:20,color:'#4F6C93'}} onPress={createThreeButtonAlert}>FreeFind</Text>
                </View>
                <View style={{alignItems: 'flex-end', flex:2}}>
                    <PreviewLayout
                    selectedValue={direction}
                    values={["Business", "Persona"]}
                    setSelectedValue={(values)=>{setDirection(values)}}></PreviewLayout>
                </View> 
            </View>
            <View style={styles.label}>
            <Text style={{color:'#305D9A',fontWeight:'bold',fontSize:24}}>สร้างบัญชีผู้ใช้</Text>
            </View>

            <View style={styles.icon}>     
                <View style={{flexDirection:"row", justifyContent:'center',height:100}}> 
                    
                    <View style={{alignItems: 'flex-start',justifyContent: 'center',flex:1}}>
                        <View style={{backgroundColor:'#EEF5FF',width:60,height:80,alignItems:'flex-end',justifyContent:'flex-end'}}>
                            <Image
                            style={{width:'100%', height:70}}
                            source={require('../Picture/left.png')}/>
                        </View>
                    </View>
                    
                    <View style={{backgroundColor:'#ACC9EF',alignItems: 'center',justifyContent: 'center',flex:2}}>
                        <Image
                        style={{width:75, height:75}}
                        source={require('../Picture/Logo.png')}/>
                    </View>
                    
                    <View style={{alignItems: 'flex-end',justifyContent: 'center',flex:1}}>
                        <View style={{backgroundColor:'#EEF5FF',width:60,height:80,alignItems:'flex-start',justifyContent:'flex-end'}}>
                            <Image
                            style={{width:'100%', height:70}}
                            source={require('../Picture/right.png')}/>
                        </View>
                    </View>  
                </View> 
            </View>

            <SafeAreaView style={styles.body}>
                <ScrollView>
            <View>
                <View style={{flexDirection:"row", marginTop:24,alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#4F6C93',flex:2,marginLeft:20,fontWeight:'bold'}}>ชื่อ</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setUsername(text)}></TextInput>
                </View>

                <View style={{flexDirection:"row", marginTop:24,alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#4F6C93',flex:2,marginLeft:20,fontWeight:'bold'}}>โทรศัพท์</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setPhone(text)}></TextInput>
                </View>

                <View style={{flexDirection:"row", marginTop:24,alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#4F6C93',flex:2,marginLeft:20,fontWeight:'bold'}}>อีเมล</Text>
                    <TextInput style={styles.input} onChangeText={(text) => setEmail(text)}></TextInput>
                </View>

                <View style={{flexDirection:"row", marginTop:24,alignItems:'center'}}>
                    <Text style={{fontSize:16,color:'#4F6C93',flex:2,marginLeft:20,fontWeight:'bold'}}>รหัสผ่าน</Text>
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={(text) => setPassword(text)}></TextInput>
                </View>

                <View style={{ marginTop:20}}>
                    <Text style={{fontSize:16,color:'#4F6C93',fontWeight:'bold',marginLeft:20}}>ยืนยันรหัสผ่าน</Text>
                    <View style={{flexDirection:"row", marginTop:8,alignItems:'center'}}>
                        <Text style={{flex:2,marginLeft:20}}></Text>
                        <TextInput style={styles.input} secureTextEntry={true} onChangeText={(text) => setConfirmPassword(text)}></TextInput>
                    </View>
                </View>
                
            </View>
            </ScrollView>
            </SafeAreaView>
            

            <View style={styles.tail}>
                <TouchableOpacity style={[styles.button,{backgroundColor:'#FFFFFF'}]}
                onPress={() => props.navigation.navigate("Login",{item : {}})}>
                    <Text style={{color:'#4F6C93',fontWeight:'bold',fontSize:20}}>ยกเลิก</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button,{backgroundColor:'#4F6C93'}]}
                onPress={() => {
                    if(password === confirmPassword)
                        {if(direction === "Business"){
                            props.navigation.navigate("ValidationBusiness",{item : {direction: direction, username: username, phone: phone, email: email, password: password}})
                        } else if(direction === "Persona"){
                            props.navigation.navigate("ValidationPersona",{item : {direction: direction, username: username, phone: phone, email: email, password: password}})
                        }
                    } else {alert("รหัสผ่านไม่ถูกต้อง")} 
                }}>
                    <Text style={{color:'#FFFFFF',fontWeight:'bold',fontSize:20}}>ถัดไป</Text>
                </TouchableOpacity>
            </View>    
        </View>
    )
};

const PreviewLayout = ({
    values,
    selectedValue,
    setSelectedValue,
  }) => (
      <View style={styles.row}>
        {values.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[
              styles.buttonChoice,
              selectedValue === value && styles.selected,
            ]}>
            <Text
              style={[
                styles.buttonLabel,
                selectedValue === value && styles.selectedLabel,
              ]}>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
  );

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#DAE9FE"
    },
    header: {
        flex: 1,
        marginTop:15,
        marginLeft:20,
        flexDirection:"row"
    },
    label: {
        flex: 1,
        alignItems:'center',
    },
    icon: {
        flex: 3,
        alignItems:'center',
    },
    body: {
        flex: 12,
        backgroundColor:"#FFFFFF",
    },
    tail: {
        flex: 2,
        backgroundColor:"#6A8BB8",
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
    },
    button: {
        height:40,
        width:120,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:6,
        margin:24 
    },
    input:{
        height:40,  
        backgroundColor:'#F2F2F2',
        borderRadius:6,
        padding: 10,
        flex: 8,
        marginRight:20      
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
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
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

export default RegisterScreen;