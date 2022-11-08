import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, SafeAreaView, AppState, Dimensions } from 'react-native';
import { Container, NativeBaseProvider } from 'native-base';
import PostWorkList from './PostWorkList';
import { AppStateService } from "../../AppStateService";
import axios from 'axios';
import config from '../../config';

const WorkHistoryScreen = (props) => {


    const [arrayPostData, setArrayPostData] = useState([])


    const [loading, setLoading] = useState(false)

    AppStateService.init();


    useEffect(() => {

        const url = `${config.REACT_APP_API_URL}/users/work_history/635bada594fd32514b9c60be`
        const fetchDataUser = async () => {
            try {
                setLoading(true)
                const response = await axios.get(url);
                for (let index = 0; index < response.data.length; index++) {
                    if (response.data[index].type_resolve == "o") {
                        const element = response.data[index].postid;
                        console.log(element);
                        let resdata = await axios.get(`${config.REACT_APP_API_URL}/posts/${element}`)
                        setArrayPostData(arrayPostData => [...arrayPostData, resdata.data])
                    }

                }

                setLoading(false);
                return;

            } catch (error) {
                console.log(error);
            }
        }



        fetchDataUser();


        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
            setArrayPostData([]);
        }
    }, [])

    return (
        <>
            {loading == false ? (
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            {arrayPostData.length > 0 ? (
                                <View>
                                    {arrayPostData.map((item) => {
                                        return (
                                            <PostWorkList
                                                navigation={props.navigation}
                                                key={item._id}
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
        alignItems: 'center'
    }
});

export default WorkHistoryScreen;