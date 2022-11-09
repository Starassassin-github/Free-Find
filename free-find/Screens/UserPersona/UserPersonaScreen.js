import React,{ useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, FlatList , SafeAreaView ,container,Image, TouchableOpacity,Alert} from 'react-native';

const UserPersonaScreen = (props) => {
   // const [item, setItem] = useState(props.route.params.item)
    
    const username = "นางสาว สมหญิง ทองดี"
    const phone = "097-777-7777"
    const email = "somg@gmail.com"
    const address = "203 ถ. สวนสยาม แขวง คันนายาว เขตคันนายาว "
    const city = "กรุงเทพ"
    const sex = "หญิง"
    const id_card = "11111111111111"
    const birthdate = "1-1-2539"
    const nationality = "ไทย"
    const education_level = "ปริญาโท"
    const ability = "ร้องเพลง เต้น"

    const userInformation = () =>
    Alert.alert(
      username,
      "ที่อยู่ : " + address + "/" + city + "\n" + "เพศ : " + sex + "\n" + "วันเกิด : " + birthdate + "\n" + "สัญชาติ : " + nationality + "\n" +"การศึกษา : " + education_level+ "\n" +"ความสามารถ : "+  ability ,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    const userContract = () =>
    Alert.alert(
      username,
      "โทรศัพท์ : " + phone + "\n" + "อีเมล : " + email,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    return (
        <View style={styles.container}>
             <SafeAreaView style={styles.container}>
               <ScrollView style={styles.scrollView}>
            
                <View style={styles.HeadSearchPage}>
                <Text style={styles.textSearchPage}>freelance app</Text>
                </View>

                <View style={styles.pageTopBox}>
                    <Text style={styles.textHeadPerson}>ข้อมูลส่วนตัว</Text>
                    <View style={styles.imageUserBox}>
                    <Image style={styles.imageUser} source={require('../Photo/admin.png') } />
                    </View>
                </View>

                <View style={styles.AboutUserBox}>
                    <TouchableOpacity onPress={userInformation}>
                        <Text style={{color:'#08A6FF',fontWeight:'400',fontSize:16,marginLeft:38,marginTop:15,marginBottom:30,textDecorationLine:'underline'}}>เกี่ยวกับฉัน</Text>
                    </TouchableOpacity>

    
                </View>

                <View style={styles.pageButtomBox}>

                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>ชื่อ</Text>
                    <Text style={styles.TextTwo}>{username}</Text>
                </View>

                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>อีเมล</Text>
                    <Text style={styles.TextTwo}>{email}</Text>
                </View>

                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>เบอร์มือถือ</Text>
                    <Text style={styles.TextTwo}>{phone}</Text>
                </View>

                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>ความสามารถ</Text>
                    <Text style={styles.TextTwo}>{ability}</Text>
                </View></View>

                <View style={styles.ButtomBox}>
                <TouchableOpacity style={[styles.button,{backgroundColor:'#B4D4FF',marginLeft:15}]}>
                    <Text style={{color:'#4F6C93',fontWeight:'bold',fontSize:16}}>ประวัติการโพสต์</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button,{backgroundColor:'#B4D4FF',marginLeft:15}]}>
                    <Text style={{color:'#4F6C93',fontWeight:'bold',fontSize:16}}>ประวัติการทำงาน</Text>
                </TouchableOpacity>
        
                </View>
                <View style={styles.ButtomBox}>
                <TouchableOpacity style={[styles.button,{backgroundColor:'#B4D4FF',marginLeft:15, marginTop:16}]}>
                    <Text style={{color:'#4F6C93',fontWeight:'bold',fontSize:16}}>สถาณะงาน</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{backgroundColor:'#B4D4FF',marginLeft:15, marginTop:16}]}
                onPress={() => props.navigation.navigate("SettingPersona", { item: {} })}>
                    <Text style={{color:'#4F6C93',fontWeight:'bold',fontSize:16}}>แก้ไขข้อมูล</Text>
                </TouchableOpacity>
                </View>

                </ScrollView>
            </SafeAreaView>
            
        </View>
    )
};

export default UserPersonaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    HeadSearchPage:{
        backgroundColor: "#95B0D3",
        height:70,
        flexDirection:"row"

    },
    textSearchPage:{
        color:'#38475B',
        marginTop:35,
        paddingLeft:30,
        fontSize:20,
        fontWeight:'400',
    },
    textHeadPerson:{
        fontSize:40,
        color:"#ffffff",
        marginLeft:40,
        fontWeight:'700'
    },
    pageTopBox:{
        backgroundColor: "#95B0D3",
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20

    },
    imageUser:{
        height:200,
        width:200,
        borderWidth:10,
        borderColor:"#D6E2F3"

    },
    imageUserBox:{
        backgroundColor: "#95B0D3",
        alignItems:'center',
        marginTop:17,
        marginBottom:17,
     
    },
    pageMediamBox:{
        backgroundColor: "#BECEE3",
        height:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    },
    NameBox:{
        flexDirection: "row",
        marginBottom:18,
        marginLeft:20,
        marginRight:20,
    },
    TextOne:{
        fontSize:20,
        fontWeight:'600',
        color:"#433B3B",
        
    },
    TextTwo:{
        fontSize:18,
        marginLeft:20,
        flex:1,
        marginTop:2
        
    },
    pageButtomBox:{
    },
    ButtomBox:{
        flexDirection:"row",
        marginLeft:20
    },
    button:{
        height:40,
        width:135,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:6,
        borderWidth:1,
        borderColor:"#4F6C93"
       
    },
    AboutUserBox:{
        flexDirection: "row",
    }

    
});