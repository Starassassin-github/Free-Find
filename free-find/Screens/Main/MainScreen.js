import { StyleSheet, Text, View ,  SafeAreaView, ScrollView,  TouchableOpacity,AppState, Dimensions, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import PostCard from '../../Shared/PostCard';
import { AppStateService } from "../../AppStateService";
import PostListMain from './PostListMain';
import { Container, NativeBaseProvider } from 'native-base';

const post1 = [{
    _id: "5f15d5cdcb4a6642bddc0fe9",
    type_of_work: "fulltime",
    title: "worker 1",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    _id_apply: ["315d8899dfd42bdd99300joe", "er5d88gfgfd42bdd9930uud", "dfjdkfijbj33899df"],
    _id_offer: ["3434gfjgjkkejrkedf332353", "lfdkdj499299jgjrorogogo"],
    _id_reject: ["34hhkfgj434k59ggjfgk3gg", "kdlfiilgirilgjfij4ipgp0"]
},
{
    _id: "5f15d5b7cb4a6642bddc0fe8",
    type_of_work: "parttime",
    title: "worker 2 is so long title",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    _id_apply: ["315d8899dfd42bdd99300joe", "er5d88gfgfd42bdd9930uud", "dfjdkfijbj33899df"],
    _id_offer: ["3434gfjgjkkejrkedf332353", "lfdkdj499299jgjrorogogo"],
    _id_reject: ["34hhkfgj434k59ggjfgk3gg", "kdlfiilgirilgjfij4ipgp0"]
}]

const MainPage = (props) => {
    const { item } = props;
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
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

      <View style={styles.HeadMainPage}>
          <Text style={styles.textHeadMainPage}>freelance app</Text>
        </View>

        <View style={styles.newPostBox}>
            <View style={styles.ButtonNewPost}>
                <Text style={styles.ButtonNewPostText}>สร้างโพสต์</Text>
                </View>
        </View>

        <View>{loading == false ? (
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            {worked.length > 0 ? (
                                <View>
                                    {worked.map((item) => {
                                        return (
                                                <PostListMain
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
            )}</View>

        </ScrollView>
        </SafeAreaView>
      </View>
  )
}

export default MainPage

const styles = StyleSheet.create({
    container: {
        flex: 1,   
    },
    HeadMainPage:{
        backgroundColor: "#133158",
        height:99
      
    },
    textHeadMainPage:{
        Colors:'#ffffff',
        paddingTop:50,
        paddingLeft:70,
        fontSize:20,
        fontWeight:'400',
    },
    newPostBox:{
        backgroundColor: "#9CC6FF",
        height:99
    },
    ButtonNewPost:{
        marginTop:20,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#ffffff',
        borderWidth:1,
        borderRadius:20,
        borderColor:'#C8F8FF'
    },
    ButtonNewPostText:{
        fontSize:25,
        fontWeight:'700',
        paddingTop:15,
        paddingBottom:15,
        marginLeft:100,
        color:'#5F9BEC'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});