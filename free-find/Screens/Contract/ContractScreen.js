import { StyleSheet, Text, View, SafeAreaView, ScrollView, } from 'react-native'
import EmployerContact from '../../Shared/employerContact'

const ContractScreen = (props) => {

    const  { item, postData } = props.route.params;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>

                    <View style={styles.contractTextBox}>
                        <Text style={styles.contractText}>ใบสัญญา</Text>
                    </View>

                    <View style={styles.contractnumberBox}>
                        <Text style={styles.contractnumber}>หมายเลขใบสัญญา </Text>
                        <Text style={styles.idTextStyle}>{"    " + item._id}</Text>
                    </View>

                    <View style={styles.employerBox}>
                        <Text style={styles.employertext}>ผู้ว่าจ้าง</Text>
                        <View >
                            <EmployerContact name={item.offer_name} image={(item.image_offer == "") || (item.image_offer == undefined) ? "https://reactnative.dev/img/tiny_logo.png" : image_offer }/>
                        </View>
                    </View>

                    <View style={styles.PostnumberBox}>
                        <Text style={styles.PostNumbertext}>หมายเลขโพสต์  </Text>
                        <Text style={styles.idTextStyle}>{ "    " + postData._id}</Text>
                    </View>

                    <View style={styles.jobTitleBox}>
                        <Text style={styles.jobTitleBoxtext}>รับสมัคร  </Text>
                        <Text style={styles.jobTitleBoxtextStyle}>{postData.title}</Text>
                    </View>

                    <View style={styles.jobTitleBoxC}>
                        <Text style={styles.jobTitleBoxtext}>รายละเอียด  </Text>
                        <Text style={styles.jobTitleBoxContent}>{ "    " +postData.description}</Text>
                    </View>

                    <View style={styles.employeeBox}>
                        <Text style={styles.employeetext}>ผู้ถูกจ้าง  </Text>
                        <EmployerContact name={item.apply_name} image={(item.image_apply == "") || (item.image_apply == undefined) ? "https://reactnative.dev/img/tiny_logo.png" : image_apply } />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default ContractScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: 10,
        backgroundColor:'#C5CFE3',
        margin: 10,
    },
    HeadContract: {
        height: 40
    },
    textHeadContract: {
        color: "#305D9A",
        fontSize: 40,
        paddingTop: 30,
        paddingLeft: 70,
        fontWeight: '700'
    },
    contractTextBox: {
        backgroundColor: "#305D9A",
        marginLeft: 10,
        marginRight: 10,
        height: 59,
        borderRadius: 30,
        marginBottom: 20
    },
    contractText: {
        paddingTop: 10,
        fontSize: 32,
        paddingLeft: 100,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    contractnumberBox: {
        marginTop: 5,
        marginLeft: 10,
    },
    contractnumber: {
        fontSize: 20,
        fontWeight: '400'
    },
    employerBox: {
        marginTop: 18,
        marginLeft: 10,
        flexDirection: "row"
    },
    employertext: {
        fontSize: 20,
        fontWeight: '400',
        marginTop: 8,
    },
    PostnumberBox: {
        marginTop: 25,
        marginLeft: 10,
    },
    PostNumbertext: {
        fontSize: 20,
        fontWeight: '400'
    },
    jobTitleBox: {
        marginTop: 25,
        marginLeft: 10,
        flexDirection: "row",

    },
    jobTitleBoxtext: {
        fontSize: 20,
        fontWeight: '400',
    },
    jobTitleBoxContent: {
        paddingTop: 10,
        fontSize: 20,
        fontWeight: '400',
        marginRight: 10,
        color: "#525354",
    },
    jobTitleBoxtextStyle: {
        color: "#525354",
        fontSize: 20,
        fontWeight: '400',
    },
    employeeBox: {
        marginTop: 25,
        marginLeft: 10,
        flexDirection: "row"
    },
    employeetext: {
        fontSize: 20,
        fontWeight: '200',
        marginTop: 8,
    },
    textSearchPage: {
        color: '#5383DD',
        paddingTop: 10,
        paddingLeft: 30,
        fontSize: 20,
        fontWeight: '400',
    },
    jobTitleBoxC: {
        marginTop: 25,
        marginLeft: 10,
        marginBottom: 20
    },
    idTextStyle: {
        fontSize: 14,
        color: "#525354",
    }

});