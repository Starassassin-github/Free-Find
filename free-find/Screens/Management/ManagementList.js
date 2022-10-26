// import
import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, AppState, TouchableOpacity } from "react-native";

// app state
import { AppStateService } from "../../AppStateService";


// component



const ManagementList = (props) => {


    const { item } = props;
    console.log(item);


    AppStateService.init();

    useEffect(() => {


        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);


        }
    }, [])

    return (
        <View>
            <View style={styles.containerName}>
                <Text>img</Text>
                <Text style={styles.textInfo}>{item}</Text>
            </View>
            <View style={styles.containerManage}>
                <TouchableOpacity style={{ marginRight: 15}}>
                    <View style={styles.containerOffer}>
                        <Text style={styles.textButton}>ยืนยัน</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
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
    // 60px
    //EC8484
    containerName: {
        width: deviceWidth - 60,
        height: 56,
        marginHorizontal: 30,
        marginTop: 20,
        marginBottom: 7,
        borderRadius: 30,
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#c1c1c1",
        borderWidth: 0.8
    },
    containerButton: {
        flexDirection: "row"
    },
    textInfo: {
        width: '100%',
        textAlign: 'center',
    },
    textButton: {
        color: "#fff",
        width: '100%',
        textAlign: "center",
        justifyContent: "center",
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
        marginLeft: 30
    },
    img: {

    }
});

export default ManagementList;