// import
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, SafeAreaView, AppState, ActivityIndicator } from 'react-native';
import { Divider, NativeBaseProvider, Container, } from 'native-base';
import axios from 'axios';
import config from '../../config';

// component
import ManagementList from './ManagementList';
import OfferList from './OfferList';

// app state
import { AppStateService } from "../../AppStateService";

const ManagementScreen = (props) => {

    const [itemList] = useState(props.route.params.item);

    const [arrayUserApplyData, setArrayUserApplyData] = useState([])
    const [arrayOfferData, setArrayOfferData] = useState([])


    const [loading, setLoading] = useState(false)

    AppStateService.init();


    useEffect(() => {

        const fetchDataUser = async () => {
            try {
                setLoading(true)

                for (let index = 0; index < itemList._id_apply.length; index++) {
                    const element = itemList._id_apply[index];
                    let resdata = await axios.get(`${config.REACT_APP_API_URL}/users/${element}`)
                    setArrayUserApplyData(arrayUserApplyData => [...arrayUserApplyData, resdata.data])
                }

                for (let index = 0; index < itemList._id_offer.length; index++) {
                    const elementUser = itemList._id_offer[index]._id_offer;
                    const elementContract = itemList._id_offer[index].contract_id;
                    let res_user_data = await axios.get(`${config.REACT_APP_API_URL}/users/${elementUser}`)
                    let res_contract_data = await axios.get(`${config.REACT_APP_API_URL}/contracts/${elementContract}`)
                    setArrayOfferData(arrayOfferData => [...arrayOfferData, { user_data: res_user_data.data, contract_data: res_contract_data.data }])
                }

                setLoading(false);
                return;

            } catch (error) {
                console.log(error);
            }
        }



        fetchDataUser();


        AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
            setArrayUserApplyData([]);
        }
    }, [])


    return (
        <>
            {loading == false ? (

                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.titleStyle}>หัวข้อโพสต์</Text>
                        <Text style={styles.titleStyle}>{arrayUserApplyData.length} คน</Text>
                    </View>
                    {arrayUserApplyData.length > 0 ?
                        (
                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList
                                    data={arrayUserApplyData}
                                    renderItem={({ item }) => (
                                        // <Text>{item._id}</Text>
                                        <ManagementList
                                            navigation={props.navigation}
                                            _id_user={item._id}
                                            name={item.name}
                                            image={item.image}
                                            _id_post={itemList._id}
                                        />
                                    )}

                                    keyExtractor={(item) => item._id}
                                    alwaysBounceVertical={false}
                                    horizontal={false}
                                />
                            </SafeAreaView>) : (
                            <View style={[styles.center, { height: deviceHeight / 2 }]}>
                                <Text>No Applicant</Text>
                            </View>
                        )
                    }

                    <View>
                        <NativeBaseProvider>
                            <Divider />
                        </NativeBaseProvider>
                    </View>
                    <View style={{ height: 15 }} />
                    <View style={styles.headerContainer}>
                        <Text style={styles.titleStyle}>ที่ได้รับการอนุมัติ</Text>
                        <Text style={styles.titleStyle}>{itemList._id_offer.length} คน</Text>
                    </View>
                    {arrayOfferData.length > 0 ?
                        (
                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList
                                    data={arrayOfferData}
                                    renderItem={({ item }) => (
                                        <OfferList navigation={props.navigation} item={item} />
                                    )}
                                    keyExtractor={(item) => item.user_data._id}
                                    alwaysBounceVertical={false}
                                    horizontal={false}
                                />
                            </SafeAreaView>
                        ) : (
                            <View style={[styles.center, { height: deviceHeight / 2 }]}>
                                <Text>No Offer found</Text>
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
        marginTop: 20
    },
    titleStyle: {
        color: '#9BB4D7',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ManagementScreen;