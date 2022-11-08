// import
import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, AppState, TouchableOpacity } from "react-native";
import axios from "axios";
import config from "../../config";

// app state
import { AppStateService } from "../../AppStateService";

// component


const ManagementList = (props) => {

    const { _id_user, name, image, _id_post } = props;



    const handleOffer = async () => {

        let createContract =  await axios.post(`${config.REACT_APP_API_URL}/contracts`, {
            apply_name: _id_user,
            image_apply: image,
            // offer name is for test
            offer_name: "6361511a20ee94c958f9ce27",
            image_offer: "someurl for need to fetch from redux",
            post: _id_post
        });
        let postOffer = await axios.put(`${config.REACT_APP_API_URL}/posts/offer/${_id_post}/${_id_user}?contract_id=${createContract.data._id}`)
        let workResolve = await axios.patch(`${config.REACT_APP_API_URL}/users/work_resolve/${_id_user}/${_id_post}?type_resolve=o`)
    }

    const handleReject = async () => {
        let postReject = await axios.put(`${config.REACT_APP_API_URL}/posts/reject/${_id_post}/${_id_user}`)
        let workResolve = await axios.patch(`${config.REACT_APP_API_URL}/users/work_resolve/${_id_user}/${_id_post}?type_resolve=r`)
    }   


    AppStateService.init();

    useEffect(() => {


        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);


        }
    }, [])

    return (
        <View>
            <TouchableOpacity>
                <View style={styles.containerName}>
                    <Image
                        style={styles.img}
                        source={{ uri: image ? image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
                    />
                    {
                        name.length > 25 ?
                            <Text style={styles.textInfo}>{name.substring(0, 25) + '...'}</Text>
                            :
                            <Text style={styles.textInfo}>{name}</Text>
                    }
                </View>
            </TouchableOpacity>

            <View style={styles.containerManage}>
                <TouchableOpacity
                    onPress={() => handleOffer()}
                    style={{ marginRight: 15 }}
                >
                    <View style={styles.containerOffer}>
                        <Text style={styles.textButton}>ยืนยัน</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleReject()}
                >
                    <View style={styles.containerReject}>
                        <Text style={styles.textButton}>ปฏิเสธ</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    containerName: {
        width: deviceWidth - 60,
        height: 56,
        marginHorizontal: 30,
        marginTop: 15,
        marginBottom: 5,
        borderRadius: 30,
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#c1c1c1",
        borderWidth: 0.8
    },
    textInfo: {
        fontSize: 16,
        marginLeft: 30,
        textAlign: 'center',
    },
    textButton: {
        color: "#fff",
        width: '100%',
        textAlign: "center",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 4,
    },
    containerOffer: {
        backgroundColor: "#7BE885",
        height: 32,
        width: 73,
        borderRadius: 30,
    },
    containerReject: {
        backgroundColor: "#EC8484",
        height: 32,
        width: 73,
        borderRadius: 30,
    },
    containerManage: {
        flexDirection: "row",
        marginLeft: 30,
        marginBottom: 5
    },
    img: {
        marginLeft: 10,
        height: 45,
        width: 45,
        backgroundColor: "red",
        borderRadius: 30
    },
});

export default ManagementList;