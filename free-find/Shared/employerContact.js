import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'


const EmployerContact = (props) => {

  
  console.log(props);

  const name = "ABCDE   EFGHI"
  return (
    <View style={styles.container}>
      {/* <Image style={styles.stretch}
        source={{ uri: item.user_data.image ? item.user_data.image : require('../Screens/Picture/userIcon.png') }} /> */}
      <View style={styles.employerContactBox}>
        <Text style={styles.employerContactText}>{name}</Text>
      </View>
    </View>
  )
}

export default EmployerContact

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 20,
    // backgroundColor:'#C5CFE3',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#B3B5CB'

  },
  employerContactBox: {
    width: 200,
    height: 40,

  },
  employerContactText: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 5,
    color: '#4F5475'
  },
  stretch: {
    width: 35,
    height: 35,
    marginLeft: 5,
    marginTop: 2
  }

});