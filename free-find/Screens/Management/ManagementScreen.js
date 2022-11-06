// import
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, SafeAreaView, AppState, ActivityIndicator } from 'react-native';
import { Divider, NativeBaseProvider, Container,  } from 'native-base';
import axios from 'axios';

// component
import ManagementList from './ManagementList';
import OfferList from './OfferList';

// app state
import { AppStateService } from "../../AppStateService";

const ManagementScreen = (props) => {

    const [arrayUserApplyData, setArrayUserApplyData] = useState([])

    const [itemList] = useState(props.route.params.item);

    const [loading, setLoading] = useState(false)

    AppStateService.init();



    useEffect(() => {

        const fetchDataUser = async () => {
            try {
                setLoading(true)

                for (let index = 0; index < itemList._id_apply.length; index++) {
                    const element = itemList._id_apply[index];
                    let resdata = await axios.get(`http://172.20.10.4:3333/api/v1/users/${element}`)
                    setArrayUserApplyData( arrayUserApplyData => [...arrayUserApplyData, resdata.data])
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
                    <Text>{arrayUserApplyData.length}</Text>
                    {arrayUserApplyData.length > 0 ?
                        (
                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList
                                    data={arrayUserApplyData}
                                    renderItem={({ item }) => (
                                        // <Text>{item._id}</Text>
                                        <ManagementList 
                                        navigation={props.navigation} 
                                        _id={item._id}  
                                        name={item.name}
                                        image={item.image}
                                        />
                                    )}
                                    
                                    keyExtractor={(item) => item._id}
                                    alwaysBounceVertical={false}
                                    horizontal={false}
                                />
                            </SafeAreaView>) : (
                            <View style={[styles.center, { height: deviceHeight / 2 }]}>
                                <Text>No Post found</Text>
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
                    {/* {itemList._id_offer.length > 0 ?
                        (
                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList
                                    data={itemList._id_offer}
                                    renderItem={({ item }) => (
                                        <OfferList navigation={props.navigation} item={item} />
                                    )}
                                    keyExtractor={(item) => item}
                                    alwaysBounceVertical={false}
                                    horizontal={false}
                                />
                            </SafeAreaView>
                        ) : (
                            <View style={[styles.center, { height: deviceHeight / 2 }]}>
                                <Text>No Offer found</Text>
                            </View>
                        )
                    } */}
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