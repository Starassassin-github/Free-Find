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
        </TouchableOpacity>
    )
}


export default PostList;