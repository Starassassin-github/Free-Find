// import
import React, { useContext, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, SafeAreaView, AppState, Dimensions } from 'react-native';
import axios from 'axios';
import config from "../../config";

// context
import AuthGlobal from '../../Context/store/AuthGlobal';

// UI
import { Container, NativeBaseProvider } from 'native-base';

// component
import PostList from "./PostList";

// app state
import { AppStateService } from "../../AppStateService";




const PostHistoryScreen = (props) => {

    const context = useContext(AuthGlobal);

    const isComp = context.stateUser.user.isComp

    const [arrayPostsData, setArrayPostsData] = useState([])

    const [loading, setLoading] = useState(false)

    AppStateService.init();

    useEffect(() => {

        if (!isComp) {

            const url = `${config.REACT_APP_API_URL}/users/post_history/${context.stateUser.user.userId}`

            const fetchPostHistory = async () => {
                try {
                    setLoading(true)
                    const response = await axios.get(url)
                    if (response.status === 200) {

                        for (let index = 0; index < response.data.length; index++) {
                            const element = response.data[index];
                            let resdata = await axios.get(`${config.REACT_APP_API_URL}/posts/${element}`)
                            setArrayPostsData(arrayPostsData => [...arrayPostsData, resdata.data])
                        }

                        setLoading(false);
                        return;
                    }

                } catch (error) {
                    console.log(error);
                }
            }



            fetchPostHistory();
        } else {
            const url = `${config.REACT_APP_API_URL}/companies/post_history/${context.stateUser.user.compId}`

            const fetchPostHistory = async () => {
                try {
                    setLoading(true)
                    const response = await axios.get(url)
                    if (response.status === 200) {

                        for (let index = 0; index < response.data.length; index++) {
                            const element = response.data[index];
                            let resdata = await axios.get(`${config.REACT_APP_API_URL}/posts/${element}`)
                            setArrayPostsData(arrayPostsData => [...arrayPostsData, resdata.data])
                        }

                        setLoading(false);
                        return;
                    }

                } catch (error) {
                    console.log(error);
                }
            }



            fetchPostHistory();
        }


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
                    <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
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
        alignItems: 'center',
        height: deviceHeight / 2
    }
});

export default PostHistoryScreen;