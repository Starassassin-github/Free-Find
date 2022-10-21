import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import PostCard from '../../Shared/PostCard';

const post1 = {
    _id: "5f15d5cdcb4a6642bddc0fe9",
    type_of_work: "fulltime",
    title: "worker 1",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}

const post2 = {
    _id: "5f15d5b7cb4a6642bddc0fe8",
    type_of_work: "parttime",
    title: "worker 2 is so long title",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}

const WorkHistoryScreen = (props) => {

    const [worked, setWorked] = useState([]);

    useEffect(() => {
        setWorked();

        return () => {
            setWorked([]);
        }
    })

    return (
        <SafeAreaView>
                <View style={{ backgroundColor: 'green', height: 120 }}>

                </View>
                <PostCard navigation={props.navigation} post={post1} />
                <PostCard navigation={props.navigation} post={post2} />
                <PostCard navigation={props.navigation} post={post1} />
                <PostCard navigation={props.navigation} post={post2} />
        </SafeAreaView>
    )
};

export default WorkHistoryScreen;