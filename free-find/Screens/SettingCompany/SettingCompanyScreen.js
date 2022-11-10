import React,{ useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, FlatList , SafeAreaView ,container,Image, TouchableOpacity,Alert,TextInput} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';

import AuthGlobal from '../../Context/store/AuthGlobal';

const SettingCompanyScreen = (props) => {

    const context = useContext(AuthGlobal);
    const [ userProfile, setUserProfile] = useState();

    const { _id } = context.stateUser.user.compdata

    console.log(context.stateUser.user);
    console.log(_id);

    const companynameSet = "โอมมีเดีย จำกัด"
    const phoneSet = "081-180-0081"
    const emailSet = "ABCD@gmail.com"
    const citySet = "กรุงเทพมหานคร"
    const addressSet = "203 ถ. สวนสยาม แขวง คันนายาว เขตคันนายาว"

    const [companyname ,setCompanyname] = useState(companynameSet);
    const [phone ,setPhone] = useState(phoneSet)
    const [email ,setEmail] = useState(emailSet)
    const [address,setAddress] = useState(addressSet)
    const [city, setCity] = useState(citySet)

    const [checkEmail,setCheckEmail] = useState(0)
    const [checkPhone,setCheckPhone] = useState(0)
    const [checkAddress,setCheckAddress] = useState(0)
    const [checkCity, setCheckCity] = useState(0)

    return (
        <View style={styles.container}>
             <SafeAreaView style={styles.container}>
               <ScrollView style={styles.scrollView}>
            
                <View style={styles.HeadSearchPage}>
                <Text style={styles.textSearchPage}>แก้ไขข้อมูลบริษัท</Text>

                </View>

                <View style={styles.pageTopBox}>
                    <View style={styles.imageUserBox}>
                    <Image style={{height:90,width:90,borderRadius:50,marginBottom:10}} source={require('../Picture/Logocom.jpg') } />
                    <TouchableOpacity >
                        <Text style={{color:'#95FCFF',fontWeight:'400',fontSize:16,marginBottom:9,textDecorationLine:'underline'}}>แก้ไขLogo</Text>
                    </TouchableOpacity>
                    <Image style={styles.imageUser} source={require('../Picture/Companypic.png') } />
                    <TouchableOpacity >
                        <Text style={{color:'#95FCFF',fontWeight:'400',fontSize:16,marginTop:10,textDecorationLine:'underline'}}>แก้ไขรูปโปรไฟล์</Text>
                    </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.pageButtomBox}>

                <View style={styles.AboutUserBox}>
                </View>

                
                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>ชื่อบริษัท</Text>
                    <TextInput
                        style={[styles.input,{width:263}]}
                        //placeholder={usernameSet}
                        //onChangeText={(text) => {setUsername(text)}}
                        onChangeText={setCompanyname}
                        value={companyname}
              />
                    {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                </View>

                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>อีเมล</Text>
                    <TextInput
                        style={[styles.input,{width:298}]}
                        // placeholder={emailSet}
                        onChangeText={setEmail}
                        value={email}
              />
                    {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                </View>

                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>เบอร์มือถือ</Text>
                    <TextInput
                        style={[styles.input,{width:251}]}
                        // placeholder={phoneSet}
                        onChangeText={setPhone}
                        value={phone}
              />
                    {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                </View>

                <View style={styles.NameBox}>
                    <Text style={styles.TextOne}>ที่อยู่</Text>
                    <TextInput
                        style={[styles.input,{width:305}]}
                        // placeholder={addressSet}
                        onChangeText={setAddress}
                        value={address}
              />
                    {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                </View></View>
                
                
                <View style={{flexDirection:"row", marginTop:10,alignItems:'center'}}>
                            <Text style={{flex:2,marginLeft:20}}></Text>
                            <SelectList setSelected={setCity} data={province}
                            boxStyles={{width:285,backgroundColor:'#F2F2F2',borderRadius:6, marginRight:20, borderWidth:0 }}
                            dropdownStyles={{marginRight:20 }}
                            defaultOption={{ key:"1", value:city }}
                            />
                        </View>

                <View style={styles.ButtomBox}>
                <TouchableOpacity 
                 style={[styles.button,{backgroundColor:'#B4D4FF',marginLeft:123,marginBottom:40,marginTop:20}]}>
                    <Text style={{color:'#4F6C93',fontWeight:'bold',fontSize:16}}>ยืนยัน</Text>
                </TouchableOpacity>
                </View>
                

                </ScrollView>
            </SafeAreaView>
            
        </View>
    )
};

const province = [
    {value:'กรุงเทพมหานคร'}, {value:'กระบี่'}, {value:'กาญจนบุรี'}, {value:'กาฬสินธุ์'}, {value:'กำแพงเพชร'},
    {value:'ขอนแก่น'}, {value:'จันทบุรี'}, {value:'ฉะเชิงเทรา'}, {value:'ชลบุรี'}, {value:'ชัยนาท'},
    {value:'ชัยภูมิ'}, {value:'ชุมพร'}, {value:'เชียงราย'}, {value:'เชียงใหม่'}, {value:'ตรัง'},
    {value:'ตราด'}, {value:'ตาก'}, {value:'นครนายก'}, {value:'นครปฐม'}, {value:'นครพนม'},
    {value:'นครราชสีมา'}, {value:'นครศรีธรรมราช'}, {value:'นครสวรรค์'}, {value:'นนทบุรี'}, {value:'นราธิวาส'},
    {value:'น่าน'}, {value:'บึงกาฬ'}, {value:'บุรีรัมย์'}, {value:'ปทุมธานี'}, {value:'ประจวบคีรีขันธ์'},
    {value:'ปราจีนบุรี'}, {value:'ปัตตานี'}, {value:'พระนครศรีอยุธยา'}, {value:'พังงา'}, {value:'พัทลุง'},
    {value:'พิจิตร'}, {value:'พิษณุโลก'}, {value:'เพชรบุรี'}, {value:'เพชรบูรณ์'}, {value:'แพร่'},
    {value:'พะเยา'}, {value:'ภูเก็ต'}, {value:'มหาสารคาม'}, {value:'มุกดาหาร'}, {value:'แม่ฮ่องสอน'},
    {value:'ยะลา'}, {value:'ยโสธร'}, {value:'ร้อยเอ็ด'}, {value:'ระนอง'}, {value:'ระยอง'},
    {value:'ราชบุรี'}, {value:'ลพบุรี'}, {value:'ลำปาง'}, {value:'ลำพูน'}, {value:'เลย'},
    {value:'ศรีสะเกษ'}, {value:'สกลนคร'}, {value:'สงขลา'}, {value:'สตูล'}, {value:'สมุทรปราการ'},
    {value:'สมุทรสงคราม'}, {value:'สมุทรสาคร'}, {value:'สระแก้ว'}, {value:'สระบุรี'}, {value:'สิงห์บุรี'},
    {value:'สุโขทัย'}, {value:'สุพรรณบุรี'}, {value:'สุราษฎร์ธานี'}, {value:'สุรินทร์'}, {value:'หนองคาย'},
    {value:'หนองบัวลำภู'}, {value:'อ่างทอง'}, {value:'อุดรธานี'}, {value:'อุทัยธานี'}, {value:'อุตรดิตถ์'},
    {value:'อุบลราชธานี'}, {value:'อำนาจเจริญ'} 
];

export default SettingCompanyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    HeadSearchPage:{
        backgroundColor: "#DAE9FE",
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
        backgroundColor:"#ffffff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    ButtomBox:{
        flexDirection:"row",
        backgroundColor:"#ffffff",
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
    },
    input: {
      fontSize: 20,
      marginLeft: 10,
      width: "70%",
      backgroundColor:'#ffffff',
      marginBottom:2,
      height:35,
      borderRadius:20,
      borderRadius:15,
        borderWidth: 1,
        paddingLeft: 10,
        height:40,
    }

    
});