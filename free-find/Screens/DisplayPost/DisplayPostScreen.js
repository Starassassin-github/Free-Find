import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

const DisplayPostScreen = (props) => {

    const [item, setItem] = useState(props.route.params.item);

    return (
        <View>
            <Text>Display Post Screen</Text>
            <Text>id: ${item._id}</Text>
            <Text>id: ${item.title}</Text>
            <Text>id: ${item.type_of_work}</Text>
            <Text>id: ${item.description}</Text>
        </View>
    )
};

export default DisplayPostScreen;