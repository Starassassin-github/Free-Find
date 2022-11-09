import React,{ useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet ,SafeAreaView ,container,Image, TouchableOpacity,Alert} from 'react-native';

const UserCompanyScreen = (props) => {
   // const [item, setItem] = useState(props.route.params.item)


    const username = "โอมมีเดีย จำกัด"
    const phone = "081-180-0081"
    const email = "ABCD@gmail.com"
    const address = "203 ถ. สวนสยาม แขวง คันนายาว เขตคันนายาว กรุงเทพมหานคร 10230"
    const city = ""
    const type = ""
    const date = ""
    const ower = ""
    const website = "sdsdsds"

    const userInformation = () =>
    Alert.alert(
      username,
      "ที่อยู่ : " + address + "/" + city + "\n" + "ประเภทธุรกิจ : " + type + "\n" + "เจ้าของ : " + ower + "\n" + "วันก่อตั้ง : " + date + "\n" + "เว็บไซต์ : " + website ,
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
                    <View style={styles.imageUserBox}>
                    <Image style={{height:90,width:90,borderRadius:50,marginBottom:10}} source={require('../Photo/Logocom.jpg') } />
                    <Image style={styles.imageUser} source={require('../Photo/Companypic.png') } />
                    </View>
                </View>


                <View style={styles.pageButtomBox}>

                <View style={styles.AboutUserBox}>
                    <TouchableOpacity onPress={userInformation}>
                        <Text style={{color:'#08A6FF',fontWeight:'400',fontSize:16,marginLeft:260,marginTop:10,textDecorationLine:'underline'}}>ข้อมูลเพิ่มเติม</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.textHeadPerson}>ข้อมูลบริษัท</Text>

                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>ชื่อบริษัท</Text>
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
                    <Text style={styles.TextOne}>ที่อยู่</Text>
                    <Text style={styles.TextTwo}>{address}</Text>
                </View>
               
                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>city</Text>
                    <Text style={styles.TextTwo}>{city}</Text>
                </View>
                </View>

                <View style={styles.ButtomBox}>
                <TouchableOpacity style={[styles.button,{backgroundColor:'#B4D4FF',marginBottom:40,marginTop:20}]}>
                    <Text style={{color:'#4F6C93',fontWeight:'bold',fontSize:16}}>ประวัติการโพสต์</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,{backgroundColor:'#B4D4FF',marginLeft:20,marginBottom:40,marginTop:20}]}
                onPress={() => props.navigation.navigate("SettingCompany", { item: {} })}>
                    <Text style={{color:'#4F6C93',fontWeight:'bold',fontSize:16}}>แก้ไขข้อมูล</Text>
                </TouchableOpacity>
                </View>
                

                </ScrollView>
            </SafeAreaView>
            
        </View>
    )
};

export default UserCompanyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    HeadSearchPage:{
        backgroundColor: "#ffffff",
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
        
        marginLeft:40,
        fontWeight:'700',
        marginBottom:15,
        color:"#4F6C93"
    },
    pageTopBox:{
        backgroundColor: "#ffffff",
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    },
    imageUser:{
        height:230,
        width:250,
        borderWidth:10,
        borderColor:"#D6E2F3"

    },
    imageUserBox:{
        backgroundColor: "#ffffff",
        alignItems:'center',
        marginTop:17,
        marginBottom:17,
     
    },
    pageMediamBox:{
        backgroundColor: "#BECEE3",
        height:20,
        borderTopLeftRadius:1000
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
        backgroundColor:"#DDEBFF",
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    ButtomBox:{
        flexDirection:"row",
        backgroundColor:"#DDEBFF",
        justifyContent: "center",
    },
    button:{
        height:40,
        width:135,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:6,
        borderWidth:1,
        borderColor:"#4F6C93",
       
    },
    AboutUserBox:{
        flexDirection: "row",
    }

    
});