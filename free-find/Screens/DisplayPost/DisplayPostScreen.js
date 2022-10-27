import React, { useState } from 'react';
import { View, Text, ScrollView, Button, SafeAreaView, StyleSheet } from 'react-native';
import EmployerContact from '../../Shared/employerContact';

const DisplayPostScreen = (props) => {

    const [item, setItem] = useState(props.route.params.item);

    return (
        <View>
            <SafeAreaView >
                <ScrollView >
                    <View style={styles.HeadDisplayPost}>
                        <Text style={styles.textHeadDisplayPost}>freelance app</Text>
                    </View>

                    <View style={styles.typeOfWork}><Text style={styles.typeOfWorkText}>{item.type_of_work}</Text></View>

                    <View  style={styles.EmployerContact}>
                        <EmployerContact/>
                    </View>

                    <View style={styles.jobTitleBox}><Text style={styles.jobTitleBoxtext}>รับสมัคร :  {item.title}</Text></View>

                    
                    <View  style={styles.PostImage}>
                        <Text>Hello</Text>
                    </View>

                    {/* <Text>id: ${item._id}</Text> */}
                    <View style={styles.contextDisplayPostBox}>
                    <Text style={styles.contextDisplaytext}>{item.description}</Text>
                    </View>

                    <View style={styles.footSpace}>
                        <Text>&nbsp; </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
};

export default DisplayPostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,  }, 
    HeadDisplayPost:{
        backgroundColor: "#DAE9FE",
        height:99
    },
    textHeadDisplayPost:{
        paddingTop:50,
        paddingLeft:70,
        fontSize:20,
        fontWeight:'400'
    },
    EmployerContact:{
        paddingRight:100,
        paddingTop:10
    },
    PostImage:{
        backgroundColor:'#000000',
        height:350,
        marginLeft:30,
        marginRight:30,
        marginTop:20
    },
    jobTitleBox:{
      marginTop:15,
      marginLeft:30,
      marginRight:30,
      flexDirection: "row"
    },
    jobTitleBoxtext:{
      fontSize:25,
      fontWeight:'400'
    },
    contextDisplayPostBox:{
      marginTop:25,
      marginLeft:30,
      marginRight:30,
      flexDirection: "row"
    },
    contextDisplaytext:{
      fontSize:20,
      fontWeight:'400'
    },
    contactOwnerPostBox:{
      marginTop:15,
      marginLeft:30,
      marginRight:30,
      flexDirection: "row"
    },
    contactOwnerPosttext:{
      fontSize:15,
      fontWeight:'400'
    },
    employerPostBox:{
      marginTop:2,
      marginLeft:30,
      marginRight:30,
      flexDirection: "row"
    },
    employerPosttext:{
      fontSize:15,
      fontWeight:'400'
    },
    footSpace:{
      marginTop:40
    },
    typeOfWork:{
        backgroundColor:'#9DAFF1',
        marginLeft:250,
        marginRight:30,
        borderRadius:40,
        marginTop:15
    },
    typeOfWorkText : {
        fontSize:15,
        fontWeight:'700',
        paddingBottom:5,
        paddingTop:5,
        marginLeft:28,
        color:'#ffffff',
        
    }

});