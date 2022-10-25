import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

const ManagementScreen = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    // apply name
    // get work name

    return (
        <View>
            <Text>Post History Screen</Text>
            <Text>id: ${item._id}</Text>
            <Text>id: apply ${item._id_apply}</Text>
            <Text>id: offer ${item._id_offer}</Text>
            <Text>id: reject ${item._id_reject}</Text>
        </View>
    )
};

export default ManagementScreen;