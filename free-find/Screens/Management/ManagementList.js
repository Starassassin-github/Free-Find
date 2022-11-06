// import
import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, AppState, TouchableOpacity } from "react-native";

// app state
import { AppStateService } from "../../AppStateService";

// component


const ManagementList = (props) => {

    const { _id, name, image } = props;

    console.log(_id, name, image);


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
                <TouchableOpacity style={{ marginRight: 15 }}>
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