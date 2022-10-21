import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";

import TypeIcon from "./TypeIcon";
const PostCard = (props) => {

    const [type_of_work, set_Type_of_work] = useState();
    const [statusChange, setStatusChange] = useState();
    const [token, setToken] = useState();
    const [cardColor, setCardColor] = useState();

    useEffect(() => {
        if (props.post.type_of_work == "fulltime") {
            set_Type_of_work("F");
        } else if (props.post.type_of_work == "parttime") {
            set_Type_of_work("P");
        }
    })

    return (
        <View>
            <TouchableOpacity
                style={{ width: '50%' }}
                onPress={() =>
                    props.navigation.navigate("DisplayPost", { post: props.post })
                }
            >
                <View style={styles.container}>
                    <View style={styles.cardContainer}>
                        <View style={styles.blockImage}>
                            <Image
                                style={styles.imageStyle}
                                source={{ uri: props.post.image ? props.post.image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
                            />
                        </View>
                        <View style={styles.infoStyle}>
                            <Text style={styles.titleStyle}>{props.post.title.length >= 22 ? props.post.title.substring(0, 22) + '...' : props.post.title}</Text>
                            <Text style={styles.descriptionStyle}>{props.post.description.length >= 120 ? props.post.description.substring(0, 120) + '...' : props.post.description}</Text>
                        </View>
                        <TypeIcon type_of_work={type_of_work} />
                    </View>
                </View>
            </TouchableOpacity>
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
        borderRadius: radius,
        borderWidth: 0.8
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