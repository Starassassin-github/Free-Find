import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';

import PostCard from '../../Shared/PostCard';

var { width } = Dimensions.get("window");

const PostWorkList = (props) => {
    const { item } = props;
    return(
        <TouchableOpacity 
        onPress={() => 
            props.navigation.navigate("DisplayPost", { item: item})
        }
        >
            <PostCard {...item} />
        </TouchableOpacity>
    )
}

export default PostWorkList;