import React, { useState, useEffect, useContext } from 'react';
import { StackActions } from "@react-navigation/native";
import { View, Text, ScrollView, Button, StyleSheet, FlatList, SafeAreaView, container, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import mime from "mime";

import axios from "axios";
import config from "../../config";

// context
import AuthGlobal from '../../Context/store/AuthGlobal';

const SettingCompanyScreen = (props) => {

    const context = useContext(AuthGlobal);
    const idAuth = context.stateUser.user.compId;

    const [companyname, setCompanyname] = useState(context.stateUser.user.compdata.name);
    const [phone, setPhone] = useState(context.stateUser.user.compdata.phone)
    const [email, setEmail] = useState(context.stateUser.user.compdata.email)
    const [address, setAddress] = useState(context.stateUser.user.compdata.address)
    const [city, setCity] = useState(context.stateUser.user.compdata.city)
    const [mainImage, setMainImage] = useState(context.stateUser.user.compdata.image);
    const [image, setImage] = useState()

    const pickImages = async () => {
        // No permissions request is necessary for launching the image library

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.cancelled) {
            setMainImage(result.uri);
            setImage(result.uri)
        }
    };

    const editProfile = () => {
        if (
            companyname.trim() == "" ||
            phone.trim() == "" ||
            email.trim() == "" ||
            address.trim() == "" ||
            city.trim() == "" ||
            image == ""
        ) {
            Toast.show({
                topOffset: 80,
                type: "error",
                text1: "มีบางอย่างผิดพลาด!",
                text2: "โปรดลองอีกครั้ง หรือ กรอกข้อมูลให้ถูกต้อง"
            })
        } else {

            let formData = new FormData();


            const configHeaders = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }

            if (image) {
                const newImagesUri = "file:///" + image.split("file:/").join("");
                formData.append("image", {
                    uri: newImagesUri,
                    type: mime.getType(newImagesUri),
                    name: newImagesUri.split("/").pop()
                });
            }
            

            formData.append("name", companyname.trim())
            formData.append("email", email.trim())
            formData.append("address", address.trim())
            
            formData.append("city", city.trim())
            formData.append("phone", phone.trim())


            const editHandlerUser = async () => {

                await axios.put(`${config.REACT_APP_API_URL}/companies/${idAuth}`, formData, configHeaders)
                    .then((res) => {
                        if (res.status == 200 || res.status == 201) {
                            Toast.show({
                                topOffset: 60,
                                type: "info",
                                text1: "สำเร็จ แก้ไขโปรไฟล์เรียบร้อยแล้ว!!!",
                                text2: ""
                            });
                            setTimeout(() => {
                                props.navigation.dispatch(
                                    StackActions.replace('Main')
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

            editHandlerUser()
        }
    }

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
                setCompanyname();
                setPhone();
                setEmail();
                setAddress();
                setCity();
                setImage();
            }
        }

    }, [context.stateUser.isAuthenticated])
    
    useEffect(() => {

        // Image Picker
        (async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!")
                }
            }
        })();

    }, [])

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>

                    <View style={styles.HeadSearchPage}>
                        <Text style={styles.textSearchPage}>แก้ไขข้อมูลบริษัท</Text>

                    </View>

                    <View style={styles.pageTopBox}>
                        <View style={styles.imageUserBox}>
                            <Image style={styles.imageUser} source={{ uri: mainImage ? mainImage : "https://reactnative.dev/img/tiny_logo.png" }} />
                            <TouchableOpacity
                                onPress={pickImages}
                            >
                                <Text style={{ color: '#95FCFF', fontWeight: '400', fontSize: 16, marginTop: 10, textDecorationLine: 'underline' }}>แก้ไขรูปโปรไฟล์</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.pageButtomBox}>

                        <View style={styles.AboutUserBox}>
                        </View>


                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>ชื่อบริษัท</Text>
                            <TextInput
                                style={[styles.input, { width: 263 }]}
                                onChangeText={setCompanyname}
                                value={companyname}
                            />

                        </View>

                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>อีเมล</Text>
                            <TextInput
                                style={[styles.input, { width: 298 }]}
                                onChangeText={setEmail}
                                value={email}
                            />
                        </View>

                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>เบอร์มือถือ</Text>
                            <TextInput
                                style={[styles.input, { width: 251 }]}
                                onChangeText={setPhone}
                                value={phone}
                            />
                        </View>

                        <View style={styles.NameBox}>
                            <Text style={styles.TextOne}>ที่อยู่</Text>
                            <TextInput
                                style={[styles.input, { width: 305 }]}
                                onChangeText={setAddress}
                                value={address}
                            />

                        </View></View>


                    <View style={{ flexDirection: "row", marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ flex: 2, marginLeft: 20 }}></Text>
                        <SelectList setSelected={setCity} data={province}
                            boxStyles={{ width: 285, backgroundColor: '#F2F2F2', borderRadius: 6, marginRight: 20, borderWidth: 0 }}
                            dropdownStyles={{ marginRight: 20 }}
                            defaultOption={{ key: "1", value: city }} 
                        />
                    </View>

                    <View style={styles.ButtomBox}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#B4D4FF', marginLeft: 123, marginBottom: 40, marginTop: 20 }]}
                            onPress={() => editProfile()}
                        >
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

export default SettingCompanyScreen;

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
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    ButtomBox: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
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
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "70%",
        backgroundColor: '#ffffff',
        marginBottom: 2,
        height: 35,
        borderRadius: 20,
        borderRadius: 15,
        borderWidth: 1,
        paddingLeft: 10,
        height: 40,
    }


});