// import
import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, AppState, TouchableOpacity } from "react-native";

// app state
import { AppStateService } from "../../AppStateService";

// component


const PendingList = (props) => {

    const { item } = props;
    // item {title, type_resolve}


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
                        source={{ uri: item.image ? item.image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
                    />
                    {
                        item.title.length > 20 ?
                            <Text style={styles.textInfo}>{item.title.substring(0, 20) + '...'}</Text>
                            :
                            <Text style={styles.textInfo}>{item.title}</Text>
                    }
                </View>
            </TouchableOpacity>
            <View style={styles.containerPending}>
                <Text style={styles.textButton}>รอดำเนินการ</Text>
            </View>
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
    containerPending: {
        backgroundColor: "#ACC9EF",
        height: 38,
        width: 90,
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

export default PendingList;