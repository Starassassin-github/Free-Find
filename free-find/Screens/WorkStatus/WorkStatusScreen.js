// import
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, AppState, TouchableOpacity } from 'react-native';
import { Divider, NativeBaseProvider, Container, } from 'native-base';
import axios from 'axios';
import config from '../../config';

// component
import PendingList from './PendingList';
import ResolveList from './ResolveList';

// app state
import { AppStateService } from "../../AppStateService";

// context
import AuthGlobal from '../../Context/store/AuthGlobal';

const WorkStatusScreen = (props) => {

    const context = useContext(AuthGlobal);

    const isComp = context.stateUser.user.isComp

    const [arrayPendingData, setArrayPendingData] = useState([])
    const [arrayResolveData, setArrayResolveData] = useState([])

    const [loading, setLoading] = useState(false)

    AppStateService.init();

    useEffect(() => {

        if (!isComp) {
            const url = `${config.REACT_APP_API_URL}/users/work_status/${context.stateUser.user.userId}`
            const fetchWorkStatus = async () => {
                try {
                    setLoading(true)
                    const response = await axios.get(url)
                    if (response.status === 200) {
                        for (let index = 0; index < response.data.work_pending.length; index++) {
                            const element = response.data.work_pending[index];
                            let resdata = await axios.get(`${config.REACT_APP_API_URL}/posts/${element}`)
                            setArrayPendingData(arrayPendingData => [...arrayPendingData, resdata.data])
                        }
                        for (let index = 0; index < response.data.work_resolve.length; index++) {
                            const element = response.data.work_resolve[index].postid;
                            let resdata = await axios.get(`${config.REACT_APP_API_URL}/posts/${element}`)
                            setArrayResolveData(arrayResolveData => [...arrayResolveData, { data: resdata.data, type_resolve: response.data.work_resolve[index].type_resolve }])

                        }

                        setLoading(false);
                        return;
                    }

                } catch (error) {
                    console.log(error);
                }
            }



            fetchWorkStatus();
        }



        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
            setArrayPendingData([]);
            setArrayResolveData([]);
        }
    }, [])

    return (
        <>
            {loading == false ? (
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.titleStyle}>กำลังรอการดำเนินการ</Text>
                        <Text style={styles.titleStyle}>{arrayPendingData.length} รายการ</Text>
                    </View>
                    {arrayPendingData.length > 0 ?
                        (
                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList
                                    data={arrayPendingData}
                                    renderItem={({ item }) => (
                                        <PendingList navigation={props.navigation} item={item} />
                                    )}
                                    keyExtractor={(item) => item._id}
                                    alwaysBounceVertical={false}
                                    horizontal={false}
                                />
                            </SafeAreaView>
                        ) : (
                            <View style={[styles.center]}>
                                <Text>ไม่มีคำขอการดำเนินการ</Text>
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
                        <Text style={styles.titleStyle}>{arrayResolveData.length} รายการ</Text>
                    </View>
                    {arrayResolveData.length > 0 ?
                        (
                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList
                                    data={arrayResolveData}
                                    renderItem={({ item }) => (
                                        <ResolveList navigation={props.navigation} item={item} />
                                    )}
                                    keyExtractor={(item) => item.data._id}
                                    alwaysBounceVertical={false}
                                    horizontal={false}
                                />
                            </SafeAreaView>
                        ) : (
                            <View style={[styles.center,]}>
                                <Text>ไม่มีคำขอที่ได้รับการดำเนินการ</Text>
                            </View>
                        )
                    }

                </SafeAreaView>

            ) : (
                // Loading
                <NativeBaseProvider>
                    <Container style={[styles.centerResolve, { backgroundColor: "#f2f2f2" }]}>
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
        marginVertical: (deviceHeight / 5),
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
    },
    centerResolve: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center"
    }
});

export default WorkStatusScreen;