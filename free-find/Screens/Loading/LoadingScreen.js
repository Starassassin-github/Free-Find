import React ,{ useState} from "react";
import {View, StyleSheet,Image } from 'react-native';

const LoadingScreen = (props) => {
    const [item, setItem] = useState(props.route.params.item)

    console.log(item)
    return (
        <View style={styles.container}>
            <Image
                style={{width:100, height:100}}
                source={require('../Picture/Logo.png')}
            />        
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor:"#4F6C93",
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoadingScreen;