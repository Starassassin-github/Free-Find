// import
import React from 'react';
import { TouchableOpacity, View, Dimensions, Text, StyleSheet } from 'react-native';

// share
import PostCard from '../../Shared/PostCard';


var { width } = Dimensions.get("window");

const PostList = (props) => {
    const { item } = props;
    return (
        <TouchableOpacity 
        style={{ flexDirection: "column" }}
        onPress={() => 
            props.navigation.navigate("DisplayPost", { item: item})
        }
        >
            <PostCard {...item} />
            <View style={styles.button}>
                <Text style={styles.text}>การจัดการ</Text>
            </View>
        </TouchableOpacity>
    )
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

export default PostList;