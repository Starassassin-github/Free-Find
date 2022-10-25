// import
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';


const ManagementPost = (props) => {
    
    const { item } = props;

    return (
        <View style={styles.button}>
            <TouchableOpacity
                style={{ flexDirection: "column" }}
                onPress={() =>
                    props.navigation.navigate("Management", { item: item })
                }>

                <Text style={styles.text}>การจัดการ</Text>

            </TouchableOpacity>
        </View>

    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: "#305D9A",
        width: "80%",
        marginLeft: "10%",
        borderRadius: 30,
        height: 33
    },
    text: {
        color: "#fff",
        fontSize: 19,
        marginVertical: 2,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ManagementPost;