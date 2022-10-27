import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Divider, NativeBaseProvider } from 'native-base';

import ManagementList from './ManagementList';
import OfferList from './OfferList';

const ManagementScreen = (props) => {

    const [itemList, setItemList] = useState(props.route.params.item);

    // apply name
    // get work name

    return (
        <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerContainer}>
                    <Text style={styles.titleStyle}>หัวข้อโพสต์</Text>
                    <Text style={styles.titleStyle}>{itemList._id_apply.length} คน</Text>
                </View>
                {itemList._id_apply.length > 0 ?
                    (
                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                                data={itemList._id_apply}
                                renderItem={({ item }) => (
                                    <ManagementList navigation={props.navigation} item={item} />
                                )}
                                keyExtractor={(item) => item}
                                alwaysBounceVertical={false}

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
                {itemList._id_offer.length > 0 ?
                    (
                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList
                                data={itemList._id_offer}
                                renderItem={({ item }) => (
                                    <OfferList navigation={props.navigation} item={item} />
                                )}
                                keyExtractor={(item) => item}
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