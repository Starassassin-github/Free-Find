// import 
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, AppState, StyleSheet, SafeAreaView, container, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

// context
import AuthGlobal from '../../Context/store/AuthGlobal';

// app state
import { AppStateService } from "../../AppStateService";

// config
import config from '../../config';

const UserCompanyScreen = (props) => {

    const context = useContext(AuthGlobal);
    const idAuth = context.stateUser.user.compId

    const [item, setItem] = useState(props.route.params.item)

    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [image, setImage] = useState("")
    const [type, setType] = useState("")
    const [date, setDate] = useState("")
    const [owner, setOwner] = useState("")
    const [website, setWebsite] = useState("")


    const userInformation = () =>
        Alert.alert(
            username,
            "ที่อยู่ : " + address + "/" + city + "\n" + "ประเภทธุรกิจ : " + type + "\n" + "เจ้าของ : " + owner + "\n" + "วันก่อตั้ง : " + date + "\n" + "เว็บไซต์ : " + website,
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

    AppStateService.init();


    useEffect(() => {

        const url = `${config.REACT_APP_API_URL}/companies/${item}`
        const fetchDataUserCompany = async () => {
            try {
                setLoading(true)
                const response = await axios.get(url);
                setUsername(response.data.name)
                setPhone(response.data.phone);
                setEmail(response.data.email);
                setAddress(response.data.address);
                setCity(response.data.city);
                setDate(response.data.founding_date);
                setImage(response.data.image);
                setOwner(response.data.owner);
                setType(response.data.bussiness_type);
                setWebsite(response.data.website)
                setLoading(false);
                return;

            } catch (error) {
                console.log(error);
            }
        }



        fetchDataUserCompany();


        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
        }
    }, [])

    return (

        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>

                    <View style={styles.HeadSearchPage}>
                        <Text style={styles.textSearchPage}>freelance app</Text>
                    </View>

                    <View style={styles.pageTopBox}>
                        <View style={styles.imageUserBox}>
                            <Image style={styles.imageUser} source={{ uri: image ? image : "some_url" }} />
                        </View>
                    </View>


                    <View style={styles.pageButtomBox}>

                        <View style={styles.AboutUserBox}>
                            <TouchableOpacity onPress={userInformation}>
                                <Text style={{ color: '#08A6FF', fontWeight: '400', fontSize: 16, marginLeft: 260, marginTop: 10, textDecorationLine: 'underline' }}>ข้อมูลเพิ่มเติม</Text>
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

                        <TouchableOpacity style={[styles.button, { backgroundColor: '#B4D4FF', marginBottom: 40, marginTop: 20 }]}>
                            <Text style={{ color: '#4F6C93', fontWeight: 'bold', fontSize: 16 }}>ประวัติการโพสต์</Text>
                        </TouchableOpacity>

                        {item == idAuth ?
                                <TouchableOpacity style={[styles.button, { backgroundColor: '#B4D4FF', marginLeft: 20, marginBottom: 40, marginTop: 20 }]}
                                    onPress={() => props.navigation.navigate("SettingCompany", { item: {} })}>
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

export default UserCompanyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    HeadSearchPage: {
        backgroundColor: "#ffffff",
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

        marginLeft: 40,
        fontWeight: '700',
        marginBottom: 15,
        color: "#4F6C93"
    },
    pageTopBox: {
        backgroundColor: "#ffffff",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    imageUser: {
        height: 230,
        width: 250,
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
        borderTopLeftRadius: 1000
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
        backgroundColor: "#DDEBFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    ButtomBox: {
        flexDirection: "row",
        backgroundColor: "#DDEBFF",
        justifyContent: "center",
    },
    button: {
        height: 40,
        width: 135,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#4F6C93",

    },
    AboutUserBox: {
        flexDirection: "row",
    }


});