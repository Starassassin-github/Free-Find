// import
import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, AppState, TouchableOpacity } from "react-native";

// app state
import { AppStateService } from "../../AppStateService";

// component


const ResolveList = (props) => {

    const { item } = props;


    AppStateService.init();

    useEffect(() => {


        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);


        }
    }, [])

    return (
        <View style={{ flexDirection: "row" }}>

            <TouchableOpacity>
                <View style={styles.containerName}>
                    <Image
                        style={styles.imageStyle}
                        source={{ uri: item.data.image ? item.data.image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
                    />
                    {
                        item.data.title.length > 20 ?
                            <Text style={styles.textInfo}>{item.data.title.substring(0, 20) + '...'}</Text>
                            :
                            <Text style={styles.textInfo}>{item.data.title}</Text>
                    }
                </View>
            </TouchableOpacity>
            {
                item.type_resolve == "o" ?
                    <View style={styles.containerOffer}>
                        <Text style={styles.textButton}>อนุมัติ</Text>
                    </View>
                    :
                    <View style={styles.containerReject}>
                        <Text style={styles.textButton}>ปฏิเสธ</Text>
                    </View>
            }
            
        </View>
    )
}


const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    containerName: {
        width: deviceWidth - 140,
        height: 56,
        marginHorizontal: 20,
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
        marginLeft: 10,
        textAlign: 'center',
    },
    textButton: {
        color: "#fff",
        width: '100%',
        textAlign: "center",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 10,
    },
    containerOffer: {
        backgroundColor: "#7BE885",
        height: 38,
        width: 73,
        borderRadius: 30,
        marginTop: 23,
        marginBottom: 5,
    },
    containerReject: {
        backgroundColor: "#EC8484",
        height: 38,
        width: 73,
        borderRadius: 30,
        marginTop: 23,
        marginBottom: 5,
    },
    containerManage: {
        flexDirection: "row",
        marginLeft: 30,
        marginBottom: 5
    },
    imageStyle: {
        marginLeft: 10,
        height: 45,
        width: 45,
        backgroundColor: "red",
        borderRadius: 30,
    },
    textButton: {
        color: "#fff",
        textAlign: "center",
        alignItems: "center",
        marginTop: 8,
    },
});

export default ResolveList;