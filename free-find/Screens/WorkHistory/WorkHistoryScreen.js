import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, SafeAreaView, AppState } from 'react-native';
import { Container, NativeBaseProvider } from 'native-base';
import PostWorkList from './PostWorkList';

const post1 = [{
    _id: "5f15d5cdcb4a6642bddc0fe9",
    type_of_work: "fulltime",
    title: "worker 1",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},
{
    _id: "5f15d5b7cb4a6642bddc0fe8",
    type_of_work: "parttime",
    title: "worker 2 is so long title",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}]

const WorkHistoryScreen = (props) => {

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const [worked, setWorked] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setWorked(post1);
        setLoading(false)
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                console.log("App has come to the foreground!");
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log("AppState", appState.current);
        });
        return () => {
            subscription.remove();
            setWorked([]);
        }
    }, [])

    return (
        <>
            {loading == false ? (
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            {worked.length > 0 ? (
                                <View>
                                    {worked.map((item) => {
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
                                <View style={[styles.center, { height: height / 2 }]}>
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