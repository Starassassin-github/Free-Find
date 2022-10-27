// import
import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, SafeAreaView, AppState, Dimensions } from 'react-native';

// UI
import { Container, NativeBaseProvider } from 'native-base';

// component
import PostList from "./PostList";

// app state
import { AppStateService } from "../../AppStateService";


const post1 = [{
    _id: "5f15d5cdcb4a6642bddc0fe9",
    type_of_work: "fulltime",
    title: "worker 1",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    _id_apply: ["315d8899dfd42bdd9942bdd99300300joe", "er5d88gfgfd42bdd9930uud", "dfjdkfijbj33899df", "lfdkdj4oobfpfrorogogo", "dferoeriweoreoruwpr33899df", "dffldskfjgrei303rfjkd"],
    _id_offer: ["3434gfjgjkkejrkedf332353", "lfdkdj499299jgjfdfsfsdfrorogogo"],
    _id_reject: ["34hhkfgj434k59ggjfgk3gg", "kdlfiilgirilgjfij4ipgp0"]
},
{
    _id: "5f15d5b7cb4a6642bddc0fe8",
    type_of_work: "parttime",
    title: "worker 2 is so long title",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    _id_apply: ["315d8899dfd42bdd99300joe", "er5d88gfgfd42bdd9930uud", "dfjdkfijbj33899df"],
    _id_offer: ["34353", "lfdkdj ogogo"],
    _id_reject: ["34hhkfgj434k59ggjfgk3gg", "kdlfiilgirilgjfij4ipgp0"]
}]

const PostHistoryScreen = (props) => {


    const [worked, setWorked] = useState([]);
    const [loading, setLoading] = useState(true)

    AppStateService.init();

    useEffect(() => {

        setWorked(post1);
        setLoading(false)
        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
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
        alignItems: 'center'
    }
});

export default PostHistoryScreen;