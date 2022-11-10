import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, FlatList, SafeAreaView, container, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { useFocusEffect } from '@react-navigation/native';

import AuthGlobal from '../../Context/store/AuthGlobal';


const SettingPersonaScreen = (props) => {

    const context = useContext(AuthGlobal);

    const [username, setUsername] = useState(context.stateUser.user.userdata.name)
    const [phone, setPhone] = useState(context.stateUser.user.userdata.phone)
    const [email, setEmail] = useState(context.stateUser.user.userdata.email)
    const [image, setImage] = useState(context.stateUser.user.userdata.image)
    const [address, setAddress] = useState(context.stateUser.user.userdata.address)
    const [city, setCity] = useState(context.stateUser.user.userdata.city)
    const [education_level, setEducation_level] = useState(context.stateUser.user.userdata.education_level)
    const [ability, setAbility] = useState(context.stateUser.user.userdata.ability)


    const [checkEmail, setCheckEmail] = useState(0)
    const [checkPhone, setCheckPhone] = useState(0)
    const [checkAddress, setCheckAddress] = useState(0)
    const [checkCity, setCheckCity] = useState(0)
    const [checkEducation, setCheckEducation] = useState(0)
    const [checkAbility, setCheckAbility] = useState(0)


    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        return () => {
            if (
                context.stateUser.isAuthenticated === false ||
                context.stateUser.isAuthenticated === null
            ) {
                setUsername();
                setPhone();
                setEmail();
                setAddress();
                setCity();
                setEducation_level();
                setAbility();
            }
        }

    }, [context.stateUser.isAuthenticated])

    const userInformation = () =>
        Alert.alert(
            username,
            "ที่อยู่ : " + address + "/" + city + "\n" + "ประเภทธุรกิจ : " + type + "\n" + "เจ้าของ : " + ower + "\n" + "วันก่อตั้ง : " + date + "\n" + "เว็บไซต์ : " + website,
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
                        
                        <Text style={styles.textSearchPage}>แก้ไขโปรไฟล์</Text>

                    </View>

                    <View style={styles.pageTopBox}>
                        <View style={styles.imageUserBox}>

                            <Image style={styles.imageUser} source={{ uri : image ? image :require('../Picture/admin.png')}} />
                            <TouchableOpacity >
                                <Text style={{ color: '#08A6FF', fontWeight: '400', fontSize: 16, marginTop: 10, textDecorationLine: 'underline' }}>แก้ไขรูปโปรไฟล์</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.pageButtomBox}>

                        <View style={styles.AboutUserBox}>
                        </View>


                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>ชื่อ</Text>
                            <TextInput
                                style={[styles.input, { width: 318 }]}
                                // placeholder={usernameSet}
                                // onChangeText={(text) => setUsername(text)}
                                onChangeText={setUsername}
                                value={username}
                            />
                            {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                        </View>

                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>อีเมล</Text>
                            <TextInput
                                style={[styles.input, { width: 300 }]}
                                // placeholder={emailSet}
                                // onChangeText={(text) => setEmail(text)}
                                onChangeText={setEmail}
                                value={email}
                            />
                            {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                        </View>

                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>เบอร์มือถือ</Text>
                            <TextInput
                                style={[styles.input, { width: 251 }]}
                                // placeholder={phoneSet}
                                // onChangeText={(text) => setPhone(text)}
                                onChangeText={setPhone}
                                value={phone}
                            />
                            {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                        </View>

                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>ที่อยู่</Text>
                            <TextInput
                                style={[styles.input, { width: 305 }]}
                                // placeholder={addressSet}
                                // onChangeText={(text) => setAddress(text)}
                                onChangeText={setAddress}
                                value={address}
                            />
                            {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                        </View>

                        <View style={{ flexDirection: "row", marginBottom: 18, alignItems: 'center' }}>
                            <Text style={{ flex: 2, marginLeft: 20 }}></Text>
                            <SelectList setSelected={setCity} data={province}
                                boxStyles={{ width: 285, backgroundColor: '#F2F2F2', borderRadius: 6, marginRight: 20, borderWidth: 0 }}
                                dropdownStyles={{ marginRight: 20 }}
                                defaultOption={{ key: "1", value: city }} />
                        </View>

                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>ความสามารถ</Text>
                            <TextInput
                                style={[styles.input, { width: 226 }]}
                                // placeholder={abilitySet}
                                // onChangeText={(text) => setAbility(text)}
                                onChangeText={setAbility}
                                value={ability}
                            />
                            {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                        </View>
                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>การศึกษา</Text>
                            <TextInput
                                style={[styles.input, { width: 258 }]}
                                // placeholder={education_levelSet}
                                // onChangeText={(text) => setEducation_level(text)}
                                onChangeText={setEducation_level}
                                value={education_level}
                            />
                            {/* <Image style={{height:20,width:20}} source={require('../Photo/pen.png') } /> */}
                        </View>
                    </View>

                    <View style={styles.ButtomBox}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#B4D4FF', marginLeft: 123, marginBottom: 40, marginTop: 20 }]}>
                            <Text style={{ color: '#4F6C93', fontWeight: 'bold', fontSize: 16 }}>ยืนยัน</Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </SafeAreaView>

        </View>
    )
};
const province = [
    { value: 'กรุงเทพมหานคร' }, { value: 'กระบี่' }, { value: 'กาญจนบุรี' }, { value: 'กาฬสินธุ์' }, { value: 'กำแพงเพชร' },
    { value: 'ขอนแก่น' }, { value: 'จันทบุรี' }, { value: 'ฉะเชิงเทรา' }, { value: 'ชลบุรี' }, { value: 'ชัยนาท' },
    { value: 'ชัยภูมิ' }, { value: 'ชุมพร' }, { value: 'เชียงราย' }, { value: 'เชียงใหม่' }, { value: 'ตรัง' },
    { value: 'ตราด' }, { value: 'ตาก' }, { value: 'นครนายก' }, { value: 'นครปฐม' }, { value: 'นครพนม' },
    { value: 'นครราชสีมา' }, { value: 'นครศรีธรรมราช' }, { value: 'นครสวรรค์' }, { value: 'นนทบุรี' }, { value: 'นราธิวาส' },
    { value: 'น่าน' }, { value: 'บึงกาฬ' }, { value: 'บุรีรัมย์' }, { value: 'ปทุมธานี' }, { value: 'ประจวบคีรีขันธ์' },
    { value: 'ปราจีนบุรี' }, { value: 'ปัตตานี' }, { value: 'พระนครศรีอยุธยา' }, { value: 'พังงา' }, { value: 'พัทลุง' },
    { value: 'พิจิตร' }, { value: 'พิษณุโลก' }, { value: 'เพชรบุรี' }, { value: 'เพชรบูรณ์' }, { value: 'แพร่' },
    { value: 'พะเยา' }, { value: 'ภูเก็ต' }, { value: 'มหาสารคาม' }, { value: 'มุกดาหาร' }, { value: 'แม่ฮ่องสอน' },
    { value: 'ยะลา' }, { value: 'ยโสธร' }, { value: 'ร้อยเอ็ด' }, { value: 'ระนอง' }, { value: 'ระยอง' },
    { value: 'ราชบุรี' }, { value: 'ลพบุรี' }, { value: 'ลำปาง' }, { value: 'ลำพูน' }, { value: 'เลย' },
    { value: 'ศรีสะเกษ' }, { value: 'สกลนคร' }, { value: 'สงขลา' }, { value: 'สตูล' }, { value: 'สมุทรปราการ' },
    { value: 'สมุทรสงคราม' }, { value: 'สมุทรสาคร' }, { value: 'สระแก้ว' }, { value: 'สระบุรี' }, { value: 'สิงห์บุรี' },
    { value: 'สุโขทัย' }, { value: 'สุพรรณบุรี' }, { value: 'สุราษฎร์ธานี' }, { value: 'สุรินทร์' }, { value: 'หนองคาย' },
    { value: 'หนองบัวลำภู' }, { value: 'อ่างทอง' }, { value: 'อุดรธานี' }, { value: 'อุทัยธานี' }, { value: 'อุตรดิตถ์' },
    { value: 'อุบลราชธานี' }, { value: 'อำนาจเจริญ' }
];
export default SettingPersonaScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    HeadSearchPage: {
        backgroundColor: "#DAE9FE",
        height: 70,
        flexDirection: "row"

    },
    textSearchPage: {
        color: '#38475B',
        marginTop: 35,
        paddingLeft: 30,
        fontSize: 20,
        fontWeight: '400',
    },
    textHeadPerson: {
        fontSize: 40,
        color: "#ffffff",
        marginLeft: 40,
        fontWeight: '700'
    },
    pageTopBox: {
        backgroundColor: "#ffffff",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20

    },
    imageUser: {
        height: 200,
        width: 200,
        borderWidth: 10,
        borderColor: "#D6E2F3"

    },
    imageUserBox: {
        backgroundColor: "#ffffff",
        alignItems: 'center',
        marginTop: 17,
        marginBottom: 17,

    },
    pageMediamBox: {
        backgroundColor: "#BECEE3",
        height: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    NameBox: {
        flexDirection: "row",
        marginBottom: 18,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    TextOne: {
        fontSize: 20,
        fontWeight: '600',
        color: "#433B3B",

    },
    TextTwo: {
        fontSize: 18,
        marginLeft: 20,
        flex: 1,
        marginTop: 2

    },
    pageButtomBox: {
    },
    ButtomBox: {
        flexDirection: "row",
        marginLeft: 20
    },
    button: {
        height: 40,
        width: 135,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#4F6C93"

    },
    AboutUserBox: {
        flexDirection: "row",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        backgroundColor: '#ffffff',
        marginBottom: 2,
        height: 35,
        borderRadius: 15,
        borderWidth: 1,
        paddingLeft: 10,
        height: 40,
    }



});