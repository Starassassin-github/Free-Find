import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text, NativeBaseProvider } from "native-base";


const TypeIcon = (props) => {
    const type_of_work = props.type_of_work
    return (
        <>
            <NativeBaseProvider>
                <Badge style={[styles.badge, type_of_work == 'F' ? { backgroundColor: '#80E1D0' } : { backgroundColor: '#EC8484' }]}>
                    <Text style={styles.text}>{type_of_work}</Text>
                </Badge>
            </NativeBaseProvider>
        </>
    );
};


const styles = StyleSheet.create({
    badge: {
        height: 35,
        width: 35,
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        top: -8,
        right: -4,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default TypeIcon;