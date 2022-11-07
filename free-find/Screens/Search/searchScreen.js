import { StyleSheet, Text, View ,  SafeAreaView, ScrollView, ActivityIndicator,Dimensions, TextInput, TouchableOpacity,Image ,AppState} from 'react-native'
import React, { useState , useEffect} from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AppStateService } from "../../AppStateService";
import PostListMain from '../Main/PostListMain';
import { Container, NativeBaseProvider } from 'native-base';

const post1 = [{
  _id: "5f15d5cdcb4a6642bddc0fe9",
  type_of_work: "fulltime",
  title: "worker 17777777777777777777777777",
  description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  _id_apply: ["315d8899dfd42bdd99300joe", "er5d88gfgfd42bdd9930uud", "dfjdkfijbj33899df"],
  _id_offer: ["3434gfjgjkkejrkedf332353", "lfdkdj499299jgjrorogogo"],
  _id_reject: ["34hhkfgj434k59ggjfgk3gg", "kdlfiilgirilgjfij4ipgp0"]
},
{
  _id: "5f15d5b7cb4a6642bddc0fe8",
  type_of_work: "parttime",
  title: "worker 2 is so long title========================================",
  description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  _id_apply: ["315d8899dfd42bdd99300joe", "er5d88gfgfd42bdd9930uud", "dfjdkfijbj33899df"],
  _id_offer: ["3434gfjgjkkejrkedf332353", "lfdkdj499299jgjrorogogo"],
  _id_reject: ["34hhkfgj434k59ggjfgk3gg", "kdlfiilgirilgjfij4ipgp0"]
}]

const SearchPage = (props) => {
  const { item } = props;
  const [searchText, setSearchText] = useState('')
  const [postSearch, setPostSearch] = useState([])
  const [worked, setWorked] = useState([]);
  const [loading, setLoading] = useState(true);
  const deviceHeight = Math.round(Dimensions.get('window').height);
  const [result,setResult] = useState([])

  const searchresult = () => {
    console.log("11111111111111111111111111111111")
     setResult( post1.filter(e=>{
      return e.title.indexOf(searchText) > -1
   }))
   
  }

  AppStateService.init();

  useEffect(() => {

    setLoading(false);
    AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
    return () => {
        AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
        setWorked([]);
    }
}, [])

useEffect(() => {
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
}, [worked])

useEffect(()=>{
  if(postSearch.length>0){
    setWorked(postSearch)
    console.log(postSearch)
   }
}, [postSearch])

useEffect(()=>{
  setPostSearch(result)
}, [result])

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <View style={styles.HeadSearchPage}>
          <Text style={styles.textSearchPage}>freelance app</Text>
          <View  >
          <View style={styles.containerSearchBar}> 
          {/* // searchbox  */}
          <View style={styles.searchBox}>
            <TextInput
              multiline
              style={styles.input}
              placeholder="Search"
              // value={}
              onChangeText={(val) => setSearchText(val)}/>
          <TouchableOpacity onPress={()=>{searchresult();}} >
              <Image style={styles.searchButton} source={require('../Picture/Search.png') } />
          </TouchableOpacity>
      
    </View>
    </View>
            
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
                                    <Text>&nbsp;</Text>
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

export default SearchPage

const styles = StyleSheet.create({
    container: {
        flex: 1,   
    },
    HeadSearchPage:{
        backgroundColor: "#9CC6FF",
        
      
    },
    textSearchPage:{
        color:'#5383DD',
        paddingTop:10,
        paddingLeft:30,
        fontSize:20,
        fontWeight:'400',
    },
    // searchInput: {
    //     height: 40,
        
    //     // borderWidth: 1,
    //     // borderColor:'#ffffff',
    //     // padding: 10,
    //     backgroundColor:'#ffffff',
    //     borderRadius:30,
    //   },
      searchBox:{
        flexDirection: "row"
      },
      containerSearchBar: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",    
    
      },
      input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
        backgroundColor:'#ffffff',
        marginTop:2,
        marginBottom:2
      },
      searchBox : {
        backgroundColor:'#ffffff',
        width: "80%",
        height:40,
        borderRadius:30,
        flexDirection: "row",
        marginLeft:10,
        marginBottom:10

        
      },
      searchButton : {
        borderRadius:20,
        marginLeft:25,
        width:40,
        height:40,
      }
});