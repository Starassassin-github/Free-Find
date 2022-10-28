// import
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, AppState, Button, TouchableOpacity } from 'react-native';
import { Divider, NativeBaseProvider, Container, Badge, } from 'native-base';

// component
import PendingList from './PendingList';
import ResolveList from './ResolveList';

// app state
import { AppStateService } from "../../AppStateService";

const post1 = [{
    _id: "5f15d5cdcb4a6642bddc0fe9",
    type_of_work: "fulltime",
    title: "worker 1",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    _id_apply: ["315d8899dfd42bdd9942bdd99300300joe", "er5d88gfgfd42bdd9930uud", "dfjdkfijbj33899df", "lfdkdj4oobfpfrorogogo", "dferoeriweoreoruwpr33899df", "dffldskfjgrei303rfjkd"],
    _id_offer: ["3434gfjgjkkejrkedf332353", "lfdkdj499299jgjfdfsfsdfrorogogo", "lfdksdfsdfdtyrty5o", "fksdhfo230fidjka920"],
    _id_reject: ["34hhkfgj434k59ggjfgk3gg", "kdlfiilgirilgjfij4ipgp0"],
    work_pending: [{ title: "กินหมูทะเป็นเฟื่อน" }, { title: "รับงาน N (trance)" }],
    work_resolve: [{ title: "ไปช้อปปิ้ง", type_resolve: "o" }, { title: "รับงาน N (trance)", type_resolve: "o" },
    { title: "คนปัดน้ำฝนไม่มีคนปัดน้ำตา", type_resolve: "o" }, { title: "หาเพื่อนไปอ่านหนังสือ", type_resolve: "r" },
    { title: "คนหมดใจกับไฟที่หมดเธอ", type_resolve: "r" }, { title: "ทำการบ้าน", type_resolve: "o" },
    ]
},
{
    _id: "5f15d5b7cb4a6642bddc0fe8",
    type_of_work: "parttime",
    title: "worker 2 is so long title",
    description: "This is description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    _id_apply: ["315d8899dfd42bdd99300joe", "er5d88gfgfd42bdd9930uud", "dfjdkfijbj33899df"],
    _id_offer: ["34353", "lfdkdj ogogo"],
    _id_reject: ["34hhkfgj434k59ggjfgk3gg", "kdlfiilgirilgjfij4ipgp0"],
    work_pending: [{ title: "กินหมูทะเป็นเฟื่อน" }, { title: "รับงาน N (trance)" }],
    work_resolve: [{ title: "ไปช้อปปิ้ง", type_resolve: "o" }, { title: "รับงาน N (trance)", type_resolve: "o" },
    { title: "คนปัดน้ำฝนไม่มีคนปัดน้ำตา", type_resolve: "o" }, { title: "หาเพื่อนไปอ่านหนังสือ", type_resolve: "r" }]
}]


const WorkStatusScreen = (props) => {

    const [itemList, setItemList] = useState([]);

    const [loading, setLoading] = useState(true)

    AppStateService.init();

    useEffect(() => {

        setItemList(post1[0]);
        setLoading(false)
        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
            setItemList([]);
        }
    }, [])

    return (
        <>
            {loading == false ? (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.titleStyle}>กำลังรอการดำเนินการ</Text>
                        <Text style={styles.titleStyle}>{itemList.work_pending.length} รายการ</Text>
                    </View>
                    {itemList.work_pending.length > 0 ?
                        (
                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList
                                    data={itemList.work_pending}
                                    renderItem={({ item }) => (
                                        <PendingList navigation={props.navigation} item={item} />
                                    )}
                                    keyExtractor={(item) => item.title}
                                    alwaysBounceVertical={false}
                                    horizontal={false}
                                />
                            </SafeAreaView>
                        ) : (
                            <View style={[styles.center, { height: deviceHeight / 2 }]}>
                                <Text>No Work found</Text>
                            </View>
                        )
                    }

                    <View>
                        <NativeBaseProvider>
                            <Divider />
                        </NativeBaseProvider>
                    </View>
                    <TouchableOpacity
                    
                    >
                        <View style={styles.clearButton}>
                            <Text style={styles.textClearButton}>ล้าง</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.headerContainer}>
                        <Text style={styles.titleStyle}>ที่ได้รับการดำเนินการ</Text>
                        <Text style={styles.titleStyle}>{itemList.work_resolve.length} รายการ</Text>
                    </View>
                    {itemList.work_resolve.length > 0 ?
                        (
                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList
                                    data={itemList.work_resolve}
                                    renderItem={({ item }) => (
                                        <ResolveList navigation={props.navigation} item={item} />
                                    )}
                                    keyExtractor={(item) => item.title}
                                    alwaysBounceVertical={false}
                                    horizontal={false}
                                />
                            </SafeAreaView>
                        ) : (
                            <View style={[styles.center, { height: deviceHeight / 2 }]}>
                                <Text>No Resolve found</Text>
                            </View>
                        )
                    }

                </SafeAreaView>

            ) : (
                // Loading
                <NativeBaseProvider>
                    <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
                        <ActivityIndicator size="large" color="red" />
                    </Container>
                </NativeBaseProvider>
            )
            }
        </>
    )
};

const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 30,
        marginTop: 15
    },
    titleStyle: {
        color: '#9BB4D7',
    },
    center: {
        marginTop: deviceHeight / 2 - 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
    },
    clearButton: {
        marginTop: 10,
        marginRight: 10,
        height: 40,
        width: 60,
        alignSelf: "flex-end",
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 5,
        backgroundColor: "#CE4343"
    },
    textClearButton: {
        color: "#fff",
        width: '100%',
        textAlign: "center",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 10,
    }
});

export default WorkStatusScreen;