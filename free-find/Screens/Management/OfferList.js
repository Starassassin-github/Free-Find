// import
import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, AppState, TouchableOpacity, SafeAreaView } from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// app state
import { AppStateService } from "../../AppStateService";


// component



const OfferList = (props) => {


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
        <View style={{ marginTop: 16, marginBottom: 5 }}>
            <TouchableOpacity>
                <View style={styles.containerName}>
                    <Image
                        style={styles.img}
                        source={{ uri: item.user_data.image ? item.user_data.image  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
                    />
                    {
                        item.user_data.name.length > 23 ?
                            <Text style={styles.textInfo}>{item.user_data.name.substring(0, 23) + '...'}</Text>
                            :
                            <Text style={styles.textInfo}>{item.user_data.name}</Text>
                    }
                    <FontAwesome style={styles.icon} name='check-circle' size={45} color='#7BE885' />
                </View>
                <View style={styles.containerManage}>
                    <Text style={styles.textContract}>
                        กดเพื่อดูใบสัญญา...
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    containerName: {
        width: deviceWidth - 60,
        height: 56,
        marginHorizontal: 30,
        marginBottom: 3,
        borderRadius: 30,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: "#c1c1c1",
        borderWidth: 0.8
    },
    textInfo: {
        fontSize: 16
    },
    containerManage: {
        marginLeft: 30
    },
    textContract: {
        color: '#8C8C8C',
        fontSize: 12,
        marginLeft: 10,
    },
    img: {
        marginLeft: 10,
        height: 45,
        width: 45,
        backgroundColor: "red",
        borderRadius: 30
    },
    icon: {
        marginRight: 10,
    }
});

export default OfferList;