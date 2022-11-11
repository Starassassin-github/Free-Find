import React, { useState, useEffect, useContext } from 'react';
import { StackActions } from "@react-navigation/native";
import {
    Image,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import Icon from '@expo/vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-toast-message';
import Error from "../../Shared/Error";
import mime from "mime";

// context
import AuthGlobal from '../../Context/store/AuthGlobal';

import axios from "axios";
import config from "../../config";

const Postscreen = (props) => {


    const context = useContext(AuthGlobal);

    const isComp = context.stateUser.user.isComp

    //Pick Image form Gallery
    const [images, setImages] = useState([]);
    const [imagePost, setImagePost] = useState('');

    const pickImages = async () => {
        // No permissions request is necessary for launching the image library

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            selectionLimit: 10,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImages(result.selected);
            setImagePost(result.selected[0].uri)
        }
    };

    const [specs, setSpecs] = useState('');

    //Counter
    const [count, setCount] = useState(0);

    //CheckBox1
    const [isChecked1, setChecked1] = useState(false);

    //CheckBox2
    const [isChecked2, setChecked2] = useState(false);

    //
    const [detail, setdetail] = useState('');

    //FullTime
    const [isFullTime, setFullTime] = useState(true);

    const [error, setError] = useState()



    const addPost = () => {

        if (
            specs.trim() == "" ||
            detail.trim() == "" ||
            isFullTime == null ||
            count == 0 ||
            imagePost == ''
        ) {
            Toast.show({
                topOffset: 80,
                type: "error",
                text1: "มีบางอย่างผิดพลาด!",
                text2: "โปรดลองอีกครั้ง หรือ กรอกข้อมูลให้ถูกต้อง"
            })
        } else {

            let formData = new FormData();

            const newImagesUri = "file:///" + imagePost.split("file:/").join("");

            const configHeaders = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }

            formData.append("title", specs.trim())
            formData.append("type_of_work", isFullTime ? "fulltime" : "parttime")
            formData.append("description", detail.trim())
            formData.append("image", {
                uri: newImagesUri,
                type: mime.getType(newImagesUri),
                name: newImagesUri.split("/").pop()
            });
            formData.append("count_recruit", count)

            if (isComp) {
                formData.append("company", context.stateUser.user.compId)
                //
                formData.append("name_who_post", context.stateUser.user.compdata.name)
                formData.append("image_who_post", context.stateUser.user.compdata.image)
            } else {
                formData.append("user", context.stateUser.user.userId)
                //
                formData.append("name_who_post", context.stateUser.user.userdata.name)
                formData.append("image_who_post", context.stateUser.user.userdata.image)
            }

            axios
                .post(`${config.REACT_APP_API_URL}/posts`, formData, configHeaders)
                .then((res) => {
                    if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "สำเร็จ โพสต์ถูกเพิ่มแล้ว!!!",
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

    }

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

    useEffect(() => {
        if (count < 0) {
            setCount(0)
        }
        if (count > 999) {
            setCount(999)
        }
    }, [count])

    useEffect(() => {
        if (isChecked1) {
            setCount(999)
        } else {
            setCount(0)
        }
    }, [isChecked1])


    return (
        <View style={styles.container}>
            <View style={{ margin: 10 }}>

                <FlatList
                    horizontal={true}
                    data={images}

                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item.uri }}
                            style={styles.image}
                        />
                    )}

                    keyExtractor={(item) => item.uri}
                    contentContainerStyle={{ margin: 10 }}
                    ListFooterComponent={
                        <TouchableOpacity style={styles.image} onPress={pickImages}>
                            <Icon name='add' size={60} color="#4F6C93" style={{ margin: 30 }} />
                        </TouchableOpacity>
                    }
                />

            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4F6C93', marginLeft: 20 }}>รับสมัคร</Text>
            </View>

            <View style={{ marginTop: -30, marginLeft: 100, flexDirection: "row", alignItems: 'center' }}>
                <TextInput style={styles.input} onChangeText={(text) => setSpecs(text)}></TextInput>
            </View>

            <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4F6C93' }}>จำนวน</Text>
            </View>

            <View style={{ marginTop: -25, marginLeft: 100, flexDirection: "row" }}>
                <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 6, backgroundColor: '#D9D9D9' }} onPress={() => setCount(count - 1)} >
                    <Icon name='remove' size={10} color='#4F6C93' style={{ marginTop: 10, marginLeft: 10 }} />
                </TouchableOpacity>

            </View>

            <View style={{ marginTop: -35, marginLeft: 140, flexDirection: "row", alignItems: 'center' }}>
                <View style={{ height: 40, width: 80, borderRadius: 6, backgroundColor: '#F2F2F2' }}></View>
                <Text style={{ fontSize: 20, marginLeft: -50 }}>{count}</Text>

            </View>

            <View style={{ marginTop: -35, marginLeft: 230, flexDirection: "row", alignItems: 'center' }}>
                <TouchableOpacity style={{ height: 30, width: 30, borderRadius: 6, backgroundColor: '#D9D9D9' }} onPress={() => setCount(count + 1)} >
                    <Icon name='add' size={10} color='#4F6C93' style={{ marginTop: 10, marginLeft: 10 }} />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: -25, marginLeft: 280 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4F6C93' }}>ไม่จำกัด</Text>
            </View>

            <View style={{ marginTop: -27, marginLeft: 335, flexDirection: "row", alignItems: 'center' }}>
                <Checkbox
                    style={styles.checkbox}
                    value={isChecked1}
                    onValueChange={(setChecked1)}
                    color={isChecked1 ? '#4F6C93' : '#D9D9D9'}
                />
            </View>

            <View style={{ marginTop: 30, marginLeft: 20, flexDirection: 'row' }}>
                <TextInput multiline={true} style={{ width: 350, height: 200, borderRadius: 6, backgroundColor: '#D9D9D9', textAlignVertical: 'top' }}
                    onChangeText={(text) => setdetail(text)}></TextInput>
            </View>

            <View >

                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                    <View >
                        <TouchableOpacity style={{ height: 60, width: 160, alignItems: 'center', borderRadius: 6, backgroundColor: isFullTime ? '#80E1D0' : '#f5fffa' }} onPress={() => setFullTime(!isFullTime)}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4F6C93', marginTop: 15 }}>Full time</Text>
                        </TouchableOpacity>

                    </View>

                    <View >
                        <TouchableOpacity style={{ height: 60, width: 160, alignItems: 'center', borderRadius: 6, backgroundColor: isFullTime ? '#f5fffa' : '#E89F9F' }} onPress={() => setFullTime(!isFullTime)}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#4F6C93', marginTop: 15 }}>Part time</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={{ margin: 10, flexDirection: "row", alignItems: 'center' }}>

                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#75A9EE', height: 60, width: 160, alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}
                        onPress={() => addPost()}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#EFF6FF' }}>โพสต์</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    );
}

export default Postscreen
const styles = StyleSheet.create({
    container: {
        flex: 2
    },
    input: {
        height: 40,
        width: 280,
        borderRadius: 6,
        backgroundColor: '#D9D9D9',
    },
    image: {
        width: 110,
        height: 130,
        margin: 5,
        borderRadius: 6,
        backgroundColor: '#cccccc'

    },
    checkbox: {
        margin: 8,
        borderRadius: 6
    },
    paragraph: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4F6C93'
    },


});