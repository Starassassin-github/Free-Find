import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

const DisplayPostScreen = (props) => {
    return (
        <View>
            <Text>Display Post Screen</Text>
            <Text>id: ${props.route.params.post._id}</Text>
            <Text>id: ${props.route.params.post.title}</Text>
            <Text>id: ${props.route.params.post.description}</Text>
        </View>
    )
};

export default DisplayPostScreen;