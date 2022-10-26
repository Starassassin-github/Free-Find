import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Divider, NativeBaseProvider } from 'native-base';

import ManagementList from './ManagementList';

const ManagementScreen = (props) => {

    const [item, setItem] = useState(props.route.params.item);


    // apply name
    // get work name

    return (
        <SafeAreaView>
            <Text>Post History Screen</Text>
            <Text>id: ${item._id}</Text>
            <Text>id: ${item._id_apply}</Text>
            <View style={styles.headerContainer}>
                <Text style={styles.titleStyle}>หัวข้อโพสต์</Text>
                <Text style={styles.titleStyle}>{item._id_apply.length} คน</Text>
            </View>
            {item._id_apply.length > 0 ? (
                <View>
                    <FlatList
                        data={item._id_apply}
                        renderItem={({ item }) => (
                            <ManagementList navigation={props.navigation} item={item} />
                        )}
                        keyExtractor={(item) => item._id_apply}
                    />
                </View>) : (
                <View style={[styles.center, { height: deviceHeight / 2 }]}>
                    <Text>No Post found</Text>
                </View>
            )
            }
            <View style={{ height: 25 }} />
            <View>
                <NativeBaseProvider>
                    <Divider />
                </NativeBaseProvider>
            </View>
            <View style={{ height: 15 }} />
            <View style={styles.headerContainer}>
                <Text style={styles.titleStyle}>ที่ได้รับการอนุมัติ</Text>
                <Text style={styles.titleStyle}>{item._id_offer.length} คน</Text>
            </View>
        </SafeAreaView>
    )
};

const deviceHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginHorizontal: 30
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