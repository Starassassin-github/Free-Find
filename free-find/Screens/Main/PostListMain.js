// import
import React from 'react';
import { TouchableOpacity, View, Dimensions, Text, StyleSheet } from 'react-native';

// share
import PostCard from '../../Shared/PostCard';




const PostListMain = (props) => {

    const { item } = props;

    return (
        <View>
            <TouchableOpacity
                style={{ flexDirection: "column" }}
                onPress={() =>
                    props.navigation.navigate("DisplayPost", { item: item })
                }
            >
                <PostCard {...item} />
            </TouchableOpacity>

        </View>

    )
}


export default PostListMain;