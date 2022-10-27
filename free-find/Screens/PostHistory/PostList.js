// import
import React from 'react';
import { TouchableOpacity, View, Dimensions, Text, StyleSheet } from 'react-native';

// share
import PostCard from '../../Shared/PostCard';
import ManagementPost from './ManagementPost';



const PostList = (props) => {

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

            <View style={{ paddingBottom: 30}}>
                <ManagementPost
                    navigation={props.navigation}
                    key={item._id + "Post"}
                    item={item}
                />
            </View>
        </View>

    )
}


export default PostList;