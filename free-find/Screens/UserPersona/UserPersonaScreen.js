// import
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, AppState, StyleSheet, FlatList, SafeAreaView, container, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

// context
import AuthGlobal from '../../Context/store/AuthGlobal';

// app state
import { AppStateService } from "../../AppStateService";

// config
import config from '../../config';

const UserPersonaScreen = (props) => {

    const context = useContext(AuthGlobal);
    const idAuth = context.stateUser.user.userId

    const [item, setItem] = useState(props.route.params.item)

    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [education_level, setEducation_level] = useState("")
    const [ability, setAbility] = useState("")
    const [sex, setSex] = useState("")
    const [id_card, setIdCard] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [nationality, setNationality] = useState("")

    AppStateService.init();


    useEffect(() => {

        const url = `${config.REACT_APP_API_URL}/users/${item}`
        const fetchDataUserPersona = async () => {
            try {
                setLoading(true)
                const response = await axios.get(url);
                setUsername(response.data.name)
                setPhone(response.data.phone)
                setEmail(response.data.email)
                setImage(response.data.image)
                setAddress(response.data.address)
                setCity(response.data.city)
                setEducation_level(response.data.education_level)
                setAbility(response.data.ability)
                setSex(response.data.sex)
                setIdCard(response.data.id_card)
                setBirthdate(response.data.birthdate)
                setNationality(response.data.nationality)

                setLoading(false);
                return;

            } catch (error) {
                console.log(error);
            }
        }



        fetchDataUserPersona();


        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);

        }
    }, [])


    const userInformation = () =>
        Alert.alert(
            username,
            "ที่อยู่ : " + address + "/" + city + "\n" + "เพศ : " + sex + "\n" + "วันเกิด : " + birthdate + "\n" + "สัญชาติ : " + nationality + "\n" + "การศึกษา : " + education_level + "\n" + "ความสามารถ : " + ability,
            [
                { text: "OK" }
            ]
        );

    const userContract = () =>
        Alert.alert(
            username,
            "โทรศัพท์ : " + phone + "\n" + "อีเมล : " + email,
            [
                { text: "OK" }
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
                            <Image style={styles.imageUser} source={{ uri: image ? image : "some_url" }} />
                        </View>
                    </View>

                    <View style={styles.AboutUserBox}>
                        <TouchableOpacity onPress={userInformation}>
                            <Text style={{ color: '#08A6FF', fontWeight: '400', fontSize: 16, marginLeft: 38, marginTop: 15, marginBottom: 30, textDecorationLine: 'underline' }}>เกี่ยวกับฉัน</Text>
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
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#B4D4FF', marginLeft: 15 }]}>
                            <Text style={{ color: '#4F6C93', fontWeight: 'bold', fontSize: 16 }}>ประวัติการโพสต์</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, { backgroundColor: '#B4D4FF', marginLeft: 15 }]}>
                            <Text style={{ color: '#4F6C93', fontWeight: 'bold', fontSize: 16 }}>ประวัติการทำงาน</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.ButtomBox}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#B4D4FF', marginLeft: 15, marginTop: 16 }]}>
                            <Text style={{ color: '#4F6C93', fontWeight: 'bold', fontSize: 16 }}>สถาณะงาน</Text>
                        </TouchableOpacity>

                        { item == idAuth ?
                                <TouchableOpacity style={[styles.button, { backgroundColor: '#B4D4FF', marginLeft: 15, marginTop: 16 }]}
                                    onPress={() => props.navigation.navigate("SettingPersona", { item: {} })}>
                                    <Text style={{ color: '#4F6C93', fontWeight: 'bold', fontSize: 16 }}>แก้ไขข้อมูล</Text>
                                </TouchableOpacity>
                            : 
                                null
                        }

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
    HeadSearchPage: {
        backgroundColor: "#95B0D3",
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
        backgroundColor: "#95B0D3",
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
        backgroundColor: "#95B0D3",
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
        marginLeft: 20,
        marginBottom: 5
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
    }


});