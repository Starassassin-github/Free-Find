import { StyleSheet, Text, View ,  SafeAreaView, ScrollView,} from 'react-native'
import React,{ useState , useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import EmployerContact from '../../Shared/employerContact'

const ContractPage = () => {
  const contractNumber = '1234567'
  const PostNumber = '123456789'
  const jobTitleC = 'บัญชี'
  const employerName = 'sabu nokkeaw'
  const employeeName = 'mama muuzub'
  const Content = '====================================================================================='
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.HeadContract}>
          <Text style={styles.textSearchPage}>freelance app</Text>
        </View>

        <View style={styles.contractTextBox}>
          <Text style={styles.contractText}>ใบสัญญา</Text>
        </View>

        <View style={styles.contractnumberBox}>
          <Text style={styles.contractnumber}>หมายเลขใบสัญญา </Text>
          <Text style={styles.contractnumber}>{contractNumber}</Text>
        </View>

        <View style={styles.employerBox}>
          <Text style={styles.employertext}>ผู้ว่าจ้าง</Text>
          <View >
            <EmployerContact/>
          </View>
        </View>

        <View style={styles.PostnumberBox}>
          <Text style={styles.PostNumbertext}>หมายเลขโพสต์  </Text>
          <Text style={styles.PostNumbertext}>{PostNumber}</Text>
        </View>

        <View style={styles.jobTitleBox}>
          <Text style={styles.jobTitleBoxtext}>รับสมัคร  </Text>
          <Text style={styles.jobTitleBoxtext}>{jobTitleC}</Text>
        </View>

        <View style={styles.jobTitleBoxC}>
          <Text style={styles.jobTitleBoxtext}>รายละเอียด  </Text>
          <Text style={styles.jobTitleBoxContent}>{Content}</Text>
        </View>

        <View style={styles.employeeBox}>
          <Text style={styles.employeetext}>ผู้ถูกจ้าง  </Text>
          <EmployerContact/>
        </View>
        </ScrollView>
        </SafeAreaView>
      </View>
  )
}

export default ContractPage

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginRight:10  
    },
    HeadContract:{
        height:40
    },
    textHeadContract:{
      color: "#305D9A",
      fontSize: 40,
      paddingTop:30,
      paddingLeft:70,
      fontWeight: '700'
    },
    contractTextBox:{
      backgroundColor: "#305D9A",
      marginTop:40,
      marginLeft:30,
      marginRight:30,
      height:59,
      borderRadius:30,
      marginBottom:20
    },
    contractText:{
      paddingTop:10,
      fontSize:32,
      paddingLeft:100,
      fontWeight: '700',
      color:'#FFFFFF',
    },
    contractnumberBox:{
      marginTop:20,
      marginLeft:30,
      flexDirection: "row"
    },
    contractnumber:{
      fontSize:20,
      fontWeight:'400'
    },
    employerBox:{
      marginTop:18,
      marginLeft:30,
      flexDirection: "row"
    },
    employertext:{
      fontSize:20,
      fontWeight:'400'
    },
    PostnumberBox :{
      marginTop:25,
      marginLeft:30,
      flexDirection: "row"
    },
    PostNumbertext:{
      fontSize:20,
      fontWeight:'400'
    },
    jobTitleBox:{
      marginTop:25,
      marginLeft:30,
      flexDirection: "row",
     
    },
    jobTitleBoxtext:{
      fontSize:20,
      fontWeight:'400',
    },
    jobTitleBoxContent:{
      paddingTop:10,
      fontSize:20,
      fontWeight:'400',
      marginRight:30,
    },
    employeeBox:{
      marginTop:25,
      marginLeft:30,
      flexDirection: "row"
    },
    employeetext:{
      fontSize:20,
      fontWeight:'400'
    },
    textSearchPage:{
        color:'#5383DD',
        paddingTop:10,
        paddingLeft:30,
        fontSize:20,
        fontWeight:'400',
    },
    jobTitleBoxC:{
      marginTop:25,
      marginLeft:30,
      marginBottom:20

     
    }
  
});