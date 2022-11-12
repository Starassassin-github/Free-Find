import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Button, Picker } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';

import axios from 'axios'
import { StackActions } from "@react-navigation/native";

import Toast from 'react-native-toast-message';
import config from "../../config";

const ValidationBusiness = (props) => {
    const [selected, setSelected] = React.useState("");
    const [item, setItem] = useState(props.route.params.item)

    const name = item.username
    const email = item.email
    const password = item.password
    const phone = item.phone
    const [company, setCompany] = useState("")

    const [name_comp, setName_comp] = useState("")
    const [address, setAddress] = useState("")
    const [city, setProvince] = useState("")
    const [business_type, setBusinessType] = useState("")
    const [owner, setOwner] = useState("")
    const [founding_date, setFoundingDate] = useState("")
    const [website, setWebsite] = useState("")
    const [phone_comp, setCompanyPhone] = useState("")
    const [email_comp, setCompanyEmail] = useState("")

    const [useDay, setDay] = useState("")
    const [useMonth, setMonth] = useState("")
    const [useYear, setYear] = useState("")

    function birthdaySet() {
        setFoundingDate(useDay + "/" + useMonth + "/" + useYear);
    }
    const addCompanyData = async () => {

        let responseToCompany = await axios.post(`${config.REACT_APP_API_URL}/companies`, {
            name_comp: name_comp,
            email_comp: email_comp,
            phone_comp: phone_comp,
            address: address,
            city: city,
            owner: owner, 
            website: website,
            bussiness_type: business_type,
            founding_date: founding_date
        })
        let responseToAccount = await axios.post(`${config.REACT_APP_API_URL}/userscompanies/register`, {
        name: name,
        email: email,
        password: password,
        phone: phone,
        company: responseToCompany.data._id
        })
        .then((res) => {
            if (res.status == 200 || res.status == 201) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "สร้างบัญชีสำเร็จ!!!",
                    text2: ""
                });
                setTimeout(() => {
                    props.navigation.dispatch(
                        StackActions.replace('Login')
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


    return (
        <View style={styles.container}>

            <View style={styles.icon}>
                <View style={{ flexDirection: "row", justifyContent: 'center', height: 100 }}>

                    <View style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
                        <View style={[styles.box, { backgroundColor: '#EEF5FF', width: 60, height: 80, alignItems: 'flex-end', justifyContent: 'flex-end' }]}>
                            <Image
                                style={{ width: '100%', height: 70 }}
                                source={require('../Picture/left.png')} />
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#ACC9EF', alignItems: 'center', justifyContent: 'center', flex: 2 }}>
                        <Image
                            style={{ width: 75, height: 75 }}
                            source={require('../Picture/Logo.png')} />
                    </View>

                    <View style={{ alignItems: 'flex-end', justifyContent: 'center', flex: 1 }}>
                        <View style={[styles.box, { backgroundColor: '#EEF5FF', width: 60, height: 80, alignItems: 'flex-start', justifyContent: 'flex-end' }]}>
                            <Image
                                style={{ width: '100%', height: 70 }}
                                source={require('../Picture/right.png')} />
                        </View>
                    </View>
                </View>
            </View>

            <SafeAreaView style={styles.body}>
                <ScrollView>
                    <View >
                        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#4F6C93', flex: 2, marginLeft: 20, fontWeight: 'bold' }}>ชื่อบริษัท</Text>
                            <TextInput style={[styles.input, { flex: 7 }]} onChangeText={(text) => setName_comp(text)}></TextInput>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#4F6C93', flex: 2, marginLeft: 20, fontWeight: 'bold' }}>ที่อยู่</Text>
                            <TextInput style={[styles.input, { flex: 8 }]} onChangeText={(text) => setAddress(text)}></TextInput>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 10, alignItems: 'center' }}>
                            <Text style={{ flex: 2, marginLeft: 20 }}></Text>
                            <SelectList setSelected={setProvince} data={province}
                                boxStyles={{ width: 285, backgroundColor: '#F2F2F2', borderRadius: 6, marginRight: 20, borderWidth: 0, alignItems: 'center' }}
                                dropdownStyles={{ marginRight: 20 }}
                                placeholder="กรุณาเลือกจังหวัด" />
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#4F6C93', flex: 2, marginLeft: 20, fontWeight: 'bold' }}>ประเภทธุรกิจ</Text>
                            <SelectList setSelected={setBusinessType} data={businessType}
                                boxStyles={{ width: 250, backgroundColor: '#F2F2F2', borderRadius: 6, marginRight: 20, borderWidth: 0 }}
                                dropdownStyles={{ width: 250, marginRight: 20 }}
                                placeholder="กรุณาเลือกประเภทธุรกิจ" />
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#4F6C93', flex: 2, marginLeft: 20, fontWeight: 'bold' }}>เจ้าของ</Text>
                            <TextInput style={[styles.input, { flex: 8 }]} onChangeText={(text) => setOwner(text)}></TextInput>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#4F6C93', flex: 2, marginLeft: 20, fontWeight: 'bold' }}>วันที่ก่อตั้ง</Text>
                            <SelectList setSelected={setDay} data={day} onSelect={birthdaySet}
                                boxStyles={{ width: 80, backgroundColor: '#F2F2F2', borderRadius: 6, marginRight: 10, borderWidth: 0 }}
                                dropdownStyles={{ marginRight: 10 }}
                                placeholder="วันที่" />
                            <SelectList setSelected={setMonth} data={month} onSelect={birthdaySet}
                                boxStyles={{ width: 80, backgroundColor: '#F2F2F2', borderRadius: 6, marginRight: 10, borderWidth: 0 }}
                                dropdownStyles={{ marginRight: 10 }}
                                placeholder="เดือน" />
                            <SelectList setSelected={setYear} data={year} onSelect={birthdaySet}
                                boxStyles={{ width: 80, backgroundColor: '#F2F2F2', borderRadius: 6, marginRight: 20, borderWidth: 0 }}
                                dropdownStyles={{ marginRight: 20 }}
                                placeholder="ปี" />
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#4F6C93', flex: 2, marginLeft: 20, fontWeight: 'bold' }}>เว็บไซต์</Text>
                            <TextInput style={[styles.input, { flex: 8 }]} onChangeText={(text) => setWebsite(text)}></TextInput>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#4F6C93', flex: 2, marginLeft: 20, fontWeight: 'bold' }}>โทรศัพท์</Text>
                            <TextInput style={[styles.input, { flex: 8 }]} onChangeText={(text) => setCompanyPhone(text)}></TextInput>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 20, alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 16, color: '#4F6C93', flex: 2, marginLeft: 20, fontWeight: 'bold' }}>อีเมล</Text>
                            <TextInput style={[styles.input, { flex: 8 }]} onChangeText={(text) => setCompanyEmail(text)}></TextInput>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>

            <View style={styles.tail}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#FFFFFF' }]}
                    onPress={() => props.navigation.navigate("Register", { item: {} })}>
                    <Text style={{ color: '#4F6C93', fontWeight: 'bold', fontSize: 20 }}>ยกเลิก</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#4F6C93' }]}
                    onPress={() => {
                        if (
                            name_comp.trim() == "" ||
                            address.trim() == "" ||
                            city.trim() == "" ||
                            business_type.trim() == "" ||
                            owner.trim() == "" ||
                            founding_date.trim() == "" ||
                            website.trim() == "" ||
                            phone_comp.trim() == "" ||
                            email_comp.trim() == "" ||
                            useDay.trim() == "" ||
                            useMonth.trim() == "" ||
                            useYear.trim() == ""
                        ) {
                            Toast.show({
                                topOffset: 80,
                                type: "error",
                                text1: "มีบางอย่างผิดพลาด!",
                                text2: "โปรดลองอีกครั้ง หรือ กรอกข้อมูลให้ถูกต้อง"
                            })
                        }
                        if ((name_comp !== "") && (address !== "") && (city !== "") && (business_type.trim() !== "") && (owner.trim() !== "") && (founding_date.trim() !== "")
                            && (website.trim() !== "") && (phone_comp.trim() !== "") && (useDay.trim() !== "") && (useMonth.trim() !== "")
                            && (useYear.trim() !== "") && (email_comp.trim() !== "")) {
                            addCompanyData()
                        }
                    }
                    }
                >
                    <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 20 }}>ถัดไป</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DAE9FE"
    },
    header: {
        flex: 1,
        marginTop: 40,
        marginLeft: 20,
        flexDirection: "row"
    },
    icon: {
        flex: 3,
        alignItems: 'center',
        marginTop: 20,
    },
    body: {
        flex: 13,
        backgroundColor: "#FFFFFF",
    },
    tail: {
        flex: 2,
        backgroundColor: "#6A8BB8",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 40,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        margin: 24
    },
    input: {
        height: 40,
        backgroundColor: '#F2F2F2',
        borderRadius: 6,
        padding: 10,
        marginRight: 20
    },
});

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

const businessType = [
    { value: 'กิจการเจ้าของคนเดียว' },
    { value: 'ห้างหุ้นส่วนสามัญ' },
    { value: 'ห้างหุ้นส่วนสามัญที่จดทะเบียนและห้างหุ้นส่วนจำกัด' },
    { value: 'บริษัทจำกัด' },
    { value: 'บริษัทมหาชนจำกัด' },
    { value: 'องค์กรธุรกิจจัดตั้งหรือจดทะเบียนภายใต้กฎหมายเฉพาะ' },
];

const day = [
    { key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }, { key: '4', value: '4' }, { key: '5', value: '5' },
    { key: '6', value: '6' }, { key: '7', value: '7' }, { key: '8', value: '8' }, { key: '9', value: '9' }, { key: '10', value: '10' },
    { key: '11', value: '11' }, { key: '12', value: '12' }, { key: '13', value: '13' }, { key: '14', value: '14' }, { key: '15', value: '15' },
    { key: '16', value: '16' }, { key: '17', value: '17' }, { key: '18', value: '18' }, { key: '19', value: '19' }, { key: '20', value: '20' },
    { key: '21', value: '21' }, { key: '22', value: '22' }, { key: '23', value: '23' }, { key: '24', value: '24' }, { key: '25', value: '25' },
    { key: '26', value: '26' }, { key: '27', value: '27' }, { key: '28', value: '28' }, { key: '29', value: '29' }, { key: '30', value: '30' },
    { key: '31', value: '31' },
];

const month = [
    { key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }, { key: '4', value: '4' }, { key: '5', value: '5' },
    { key: '6', value: '6' }, { key: '7', value: '7' }, { key: '8', value: '8' }, { key: '9', value: '9' }, { key: '10', value: '10' },
    { key: '11', value: '11' }, { key: '12', value: '12' },
];

const year = [
    { value: '2004' }, { value: '2003' }, { value: '2002' }, { value: '2001' }, { value: '2000' },
    { value: '1999' }, { value: '1998' }, { value: '1997' }, { value: '1996' }, { value: '1995' },
    { value: '1994' }, { value: '1993' }, { value: '1992' }, { value: '1991' }, { value: '1990' },
    { value: '1989' }, { value: '1988' }, { value: '1987' }, { value: '1986' }, { value: '1985' },
    { value: '1984' }, { value: '1983' }, { value: '1982' }, { value: '1981' }, { value: '1980' },
    { value: '1979' }, { value: '1978' }, { value: '1977' }, { value: '1976' }, { value: '1975' },
    { value: '1974' }, { value: '1973' }, { value: '1972' }, { value: '1971' }, { value: '1970' },
    { value: '1969' }, { value: '1968' }, { value: '1967' }, { value: '1966' }, { value: '1965' },
    { value: '1964' }, { value: '1963' }, { value: '1962' }
];

export default ValidationBusiness;