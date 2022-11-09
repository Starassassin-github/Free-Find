// import
import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, AppState } from "react-native";

// app state
import { AppStateService } from "../AppStateService";

// component
import TypeIcon from "./TypeIcon";


const PostCard = (props) => {


    const { image, type_of_work, title, description } = props;

    const [check_type_of_work, set_Chek_Type_of_work] = useState();

    
    AppStateService.init();

    useEffect(() => {

        if (type_of_work == "fulltime") {
            set_Chek_Type_of_work("F");
        } else if (type_of_work == "parttime") {
            set_Chek_Type_of_work("P");
        }
        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
            set_Chek_Type_of_work();

        }
    }, [])

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.blockImage}>
                        <Image
                            style={styles.imageStyle}
                            source={{ uri: image ? image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
                        />
                    </View>
                    <View style={styles.infoStyle}>
                        <Text style={styles.titleStyle}>{title.length >= 22 ? title.substring(0, 22) + '...' : title}</Text>
                        <Text style={styles.descriptionStyle}>{description.length >= 120 ? description.substring(0, 120) + '...' : description}</Text>
                    </View>
                    <TypeIcon type_of_work={check_type_of_work} />
                </View>
            </View>
        </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const containerInfo = 240

const containerImage = 100
const radius = 20;
const styles = StyleSheet.create({
    container: {
        width: deviceWidth - 20,
        alignItems: 'baseline',
        margin: 10,
        borderRadius: 10,
        paddingTop: 10,
    },
    cardContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,

    },
    blockImage: {
        borderColor: '#000',
    },
    descriptionStyle: {
        fontSize: 16,
        marginLeft: 5,
        color: '#4F6C93'
    },
    infoStyle: {
        height: 130,
        width: containerInfo,
        backgroundColor: '#ffffff',
        borderColor: '#000',
        borderWidth: 0.8,
        borderRadius: radius,
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 5,
        color: '#4F6C93'
    },
    imageStyle: {
        height: 130,
        width: containerImage,
        borderRadius: radius,
        opacity: 0.95,
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        marginRight: 5,
        borderColor: '#000',
        borderWidth: 0.8
    },
    badge: {
        width: 25,
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        top: -4,
        right: -15,
    },
    textBadge: {
        fontSize: 12,
        width: 100,
        fontWeight: "bold",
    }
});

export default PostCard;