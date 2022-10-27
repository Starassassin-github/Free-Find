import { StyleSheet, Text, View , Button, Alert} from 'react-native'
import React from 'react'


const EmployerContact = () => {
  return (
    <View style={styles.container}>
        <View style={styles.employerContactBox}>
        <Text style={styles.employerContactText}>Name</Text>
        </View>
      </View>
  )
}

export default EmployerContact

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",       
        marginLeft:20,
        backgroundColor:'#C5CFE3',
        borderRadius:30,

    },
    employerContactBox: {
        width:230,
        height:30,
    },
    employerContactText :{
       paddingLeft:10 
    }
    
});