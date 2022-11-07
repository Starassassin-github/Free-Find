// import
import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, SafeAreaView, AppState, Dimensions } from 'react-native';
import axios from 'axios';
import config from "../../config";

// UI
import { Container, NativeBaseProvider } from 'native-base';

// component
import PostList from "./PostList";

// app state
import { AppStateService } from "../../AppStateService";




const PostHistoryScreen = (props) => {


    const [arrayPostsData, setArrayPostsData] = useState([])

    const [loading, setLoading] = useState(false)

    AppStateService.init();

    useEffect(() => {

        const url = `${config.REACT_APP_API_URL}/users/post_history/635bada594fd32514b9c60be`

        const fetchPostHistory = async () => {
            try {
                setLoading(true)
                const response = await axios.get(url)
                if (response.status === 200) {

                    for (let index = 0; index < response.data.length; index++) {
                        const element = response.data[index];
                        let resdata = await axios.get(`${config.REACT_APP_API_URL}/posts/${element}`)
                        setArrayPostsData( arrayPostsData  => [...arrayPostsData, resdata.data])
                    }

                    setLoading(false);
                    return;
                }

            } catch (error) {
                console.log(error);
            }
        }



        fetchPostHistory();


        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
            setArrayPostsData([]);
        }
    }, [])

    return (
        <>
            {loading == false ? (
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            {arrayPostsData.length > 0 ? (
                                <View>
                                    {arrayPostsData.map((item) => {
                                        return (
                                            <PostList
                                                navigation={props.navigation}
                                                key={item._id + "Post"}
                                                item={item}
                                            />
                                        )
                                    })}
                                </View>
                            ) : (
                                <View style={[styles.center, { height: deviceHeight / 2 }]}>
                                    <Text>No Post found</Text>
                                </View>
                            )}

                        </View>
                    </ScrollView>
                </SafeAreaView>
            ) : (
                // Loading
                <NativeBaseProvider>
                    <Container style={[styles.center, { backgroundColor: "#f2f2f2", height: deviceHeight / 2 }]}>
                        <ActivityIndicator size="large" color="red" />
                    </Container>
                </NativeBaseProvider>
            )}
        </>
    )
};

const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PostHistoryScreen;