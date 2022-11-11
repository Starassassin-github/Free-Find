import { StyleSheet, Text, View ,  SafeAreaView, ScrollView, ActivityIndicator,Dimensions, TextInput, TouchableOpacity,Image ,AppState} from 'react-native'
import React, { useState , useEffect} from 'react'
import { AppStateService } from "../../AppStateService";
import PostListMain from '../Main/PostListMain';
import { Container, NativeBaseProvider } from 'native-base';
import config from "../../config";
import axios from "axios";
import Ionicons from '@expo/vector-icons/Ionicons';



const SearchPage = (props) => {
  const { item } = props;
  const [searchText, setSearchText] = useState('')
  const [postSearch, setPostSearch] = useState([])
  const [worked, setWorked] = useState([]);
  const deviceHeight = Math.round(Dimensions.get('window').height);
  const [result,setResult] = useState([])
  const [arrayPostSearchData, setArrayPostSearchData] = useState([]);

  const searchresult = () => {
     setResult( arrayPostSearchData.filter(e=>{
      const check = e.title.toLowerCase();
      if(check.indexOf(searchText.toLowerCase()) > -1){
        return check.indexOf(searchText.toLowerCase()) > -1
      }else{
        setResult([]);
      }
   }))
   
  }

  const handleAddPost = async (response) => {
    for (let index = 0; index < response.data.length; index++) {
      const element = response.data[index];
      setArrayPostSearchData((arrayPostSearchData) => [...arrayPostSearchData, element]);
    }
  }

  AppStateService.init();

  useEffect(() => {
    const url = `${config.REACT_APP_API_URL}/posts`;

    const fetchWorkStatus = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {

          await handleAddPost(response).then(() => {
            searchresult();
          })
        }
        return;
      } catch (error) {
        console.log(error);
      }
    };

    fetchWorkStatus();

    AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
    return () => {
        AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
        setArrayPostSearchData([]);
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
  if(postSearch.length>=0){
    setWorked(postSearch)
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
          
      
    </View>
        <TouchableOpacity style={styles.searchBoxT} onPress={()=>{searchresult();}} >
              <Ionicons style={styles.searchButton} name="search-circle-sharp" size={55} color="#364CA5" />
              {/* <Image style={styles.searchButton} source={require('../Picture/Search.png') } /> */}
          </TouchableOpacity>
    </View>
            
           </View> 
        </View>

        <View>
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
            </View>

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
        marginBottom:2,
        borderRadius:35,
        textAlignVertical: 'center'
      },
      searchBox : {
        flexDirection: "row",
        backgroundColor:'#ffffff',
        width: "80%",
        height:48,
        borderRadius:35,
        marginLeft:10,
        marginBottom:10,
        
        

        
      },
      searchButton : {
      },
      searchBoxT:{
        marginLeft:10,
        marginBottom:10
      }
});