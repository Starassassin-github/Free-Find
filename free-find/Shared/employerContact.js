import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'


const EmployerContact = (props) => {

  const { name, image } = props;

  return (
    <View style={styles.container}>
      <Image style={styles.img}
        source={{ uri: image ? image : "https://reactnative.dev/img/tiny_logo.png" }} />
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
    backgroundColor:'#fff',
    borderRadius: 30,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#B3B5CB',
    height: 45,
    marginBottom: 5,
  },
  employerContactBox: {
    width: 190,
    height: 40,
  },
  employerContactText: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 5,
    color: '#4F5475'
  },
  img: {
    marginTop: 2,
    marginLeft: 5,
    height: 40,
    width: 40,
    backgroundColor: "red",
    borderRadius: 30
},

});