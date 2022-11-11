import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  AppState,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AppStateService } from "../../AppStateService";
import PostListMain from "./PostListMain";
import { Container, NativeBaseProvider } from "native-base";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// context
import AuthGlobal from '../../Context/store/AuthGlobal';

import axios from "axios";
import config from "../../config";

const MainPage = (props) => {

  const context = useContext(AuthGlobal);

  const isComp = context.stateUser.user.isComp



  const [worked, setWorked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postInMain, setPostInMain] = useState([]);


  const [arrayPostData, setArrayPostsData] = useState([]);

  const listPostShowMain = async (arrayPostData) => {
    const result = await arrayPostData.filter((e) => {
      if (e.type_of_work == "fulltime") {
        console.log(e.type_of_work);
      }
    });
    setPostInMain(result);
  };


  const handleAddPost = async (response) => {
    for (let index = 0; index < response.data.length; index++) {
      const element = response.data[index];
      setArrayPostsData((arrayPostData) => [...arrayPostData, element]);
    }
  }

  AppStateService.init();

  useEffect(() => {

    const url = `${config.REACT_APP_API_URL}/posts/getall?sortby=_id&order=desc&limit=20`;

    const fetchWorkStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {

          await handleAddPost(response).then(() => {
            listPostShowMain(arrayPostData);
          }).then(() => {
            setLoading(false);
            return;
          })
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkStatus();

    AppState.addEventListener(
      "change",
      AppStateService.getInstance().handleAppStateChange
    );
    return () => {
      AppState.removeEventListener(
        "change",
        AppStateService.getInstance().handleAppStateChange
      );
      setArrayPostsData([]);
      setPostInMain([]);
    };
  }, []);

  useEffect(() => {
    if (postInMain.length > 0) {
      setWorked(postInMain);
    } else {
      setWorked(arrayPostData);
    }
    return () => {
      setWorked([]);
    };
  }, [postInMain]);

  return (
    <>
      {loading == false ? (
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={true}
          />
          <ScrollView style={styles.scrollView}>
            <View style={styles.HeadMainPage}>
              <Text style={styles.textHeadMainPage}>freelance app</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Search", {})}
              >
                <Ionicons style={styles.stretchSearch} name="search-circle-sharp" size={50} color="#D7E7EB" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => isComp ? props.navigation.navigate("UserCompany", { item: context.stateUser.user.compId })
                  : props.navigation.navigate("UserPersona", { item: context.stateUser.user.userId })}
              >
                <FontAwesome style={{ marginTop: 20, marginLeft: 10 }} name="user" size={35} color="#D7E7EB" />
              </TouchableOpacity>

            </View>

            <View style={styles.newPostBox}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Post")}
              >
                <View style={styles.ButtonNewPost}>
                  <Text style={styles.ButtonNewPostText}>สร้างโพสต์</Text>
                </View>
              </TouchableOpacity>
            </View>


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
                        );
                      })}
                    </View>
                  ) : (
                    <View
                      style={[styles.center, { height: deviceHeight / 2 }]}
                    >
                      <Text>No Post found</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </SafeAreaView>

          </ScrollView>
        </SafeAreaView>
      ) : (
        // Loading
        <NativeBaseProvider>
          <Container
            style={[styles.center, { backgroundColor: "#f2f2f2", height: deviceHeight / 2 }]}
          >
            <ActivityIndicator size="large" color="red" />
          </Container>
        </NativeBaseProvider>
      )}
    </>
  );
};

export default MainPage;

const deviceHeight = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeadMainPage: {
    backgroundColor: "#133158",
    flexDirection: "row",
  },
  textHeadMainPage: {
    color: "#ffffff",
    paddingTop: 15,
    paddingLeft: 30,
    fontSize: 20,
    fontWeight: "400",
  },
  newPostBox: {
    backgroundColor: "#9CC6FF",
    height: 99,
  },
  ButtonNewPost: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#C8F8FF",
  },
  ButtonNewPostText: {
    fontSize: 25,
    fontWeight: "700",
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 100,
    color: "#5F9BEC",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  stretchSearch: {

    marginLeft: 115,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  stretchIcon: {
    width: 35,
    height: 35,
    marginLeft: 15,
    marginTop: 2,
    marginTop: 10,
    marginBottom: 10,
  },
});
