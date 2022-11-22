// import
import React, { useEffect, useState, useContext } from 'react';
import { 
    View, 
    Text, 
    Dimensions, 
    FlatList, 
    StyleSheet, 
    SafeAreaView, 
    AppState, 
    ActivityIndicator, 
    TouchableOpacity,
    Image,
} from 'react-native';
import { Divider, NativeBaseProvider, Container, } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import config from '../../config';

// context
import AuthGlobal from '../../Context/store/AuthGlobal';


// app state
import { AppStateService } from "../../AppStateService";


const ManagementScreen = (props) => {

    const [itemList] = useState(props.route.params.item);

    const context = useContext(AuthGlobal);

    // next release should change to user data for use 2 multi management
    const offerdata = context.stateUser.user.compdata

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

    const ManagementList = (props) => {

        const { _id_user, name, image, _id_post } = props;


        const handleOffer = async (id) => {

            let createContract = await axios.post(`${config.REACT_APP_API_URL}/contracts`, {
                apply_id: _id_user,
                image_apply: image,
                // offer id, name, image is for test
                offer_id: offerdata._id,
                apply_name: name,
                offer_name: offerdata.name,
                image_offer: offerdata.image,
                post: _id_post
            });
            let postOffer = await axios.put(`${config.REACT_APP_API_URL}/posts/offer/${_id_post}/${_id_user}?contract_id=${createContract.data._id}`)
            let workResolve = await axios.patch(`${config.REACT_APP_API_URL}/users/work_resolve/${_id_user}/${_id_post}?type_resolve=o`)

            let filterArrayUser =  arrayUserApplyData.filter((value, index)=> {
                if (value._id !== id) {
                    return value
                }
            })

            let filterArrayOffer = arrayUserApplyData.filter((value, index) => {
                if (value._id == id) {
                    return value
                }
            })

            setArrayUserApplyData(filterArrayUser);
            setArrayOfferData(arrayOfferData => [...arrayOfferData, { user_data: filterArrayOffer[0], contract_data: createContract.data }])
        }

        const handleReject = async (id) => {
            let postReject = await axios.put(`${config.REACT_APP_API_URL}/posts/reject/${_id_post}/${_id_user}`)
            let workResolve = await axios.patch(`${config.REACT_APP_API_URL}/users/work_resolve/${_id_user}/${_id_post}?type_resolve=r`)

            let filterArrayUser =  arrayUserApplyData.filter((value, index)=> {
                if (value._id !== id) {
                    return value
                }
            })
            
            setArrayUserApplyData(filterArrayUser);
        }


        return (
            <View>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("UserPersona", { item: _id_user })}
                >
                    <View style={styles.containerName}>
                        <Image
                            style={styles.img}
                            source={{ uri: image ? image : "https://reactnative.dev/img/tiny_logo.png" }}
                        />
                        {
                            name.length > 25 ?
                                <Text style={styles.textInfo}>{name.substring(0, 25) + '...'}</Text>
                                :
                                <Text style={styles.textInfo}>{name}</Text>
                        }
                    </View>
                </TouchableOpacity>

                <View style={styles.containerManage}>
                    <TouchableOpacity
                        onPress={() => handleOffer(_id_user)}
                        style={{ marginRight: 15 }}
                    >
                        <View style={styles.containerOffer}>
                            <Text style={styles.textButton}>ยืนยัน</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleReject(_id_user)}
                    >
                        <View style={styles.containerReject}>
                            <Text style={styles.textButton}>ปฏิเสธ</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    const OfferList = (props) => {


        const { item, postData } = props;
    
        return (
            <View style={{ marginTop: 16, marginBottom: 5 }}>
                <TouchableOpacity
                    onPress={() =>
                        props.navigation.navigate("Contract", { item: item.contract_data, postData: postData })
                    }
                >
                    <View style={styles.containerName}>
                        <Image
                            style={styles.img}
                            source={{ uri: item.user_data.image ? item.user_data.image : "https://reactnative.dev/img/tiny_logo.png" }}
                        />
                        {
                            item.user_data.name.length > 23 ?
                                <Text style={styles.textInfo}>{item.user_data.name.substring(0, 23) + '...'}</Text>
                                :
                                <Text style={styles.textInfo}>{item.user_data.name}</Text>
                        }
                        <FontAwesome style={styles.icon} name='check-circle' size={45} color='#7BE885' />
                    </View>
                    <View style={styles.containerManage}>
                        <Text style={styles.textContract}>
                            กดเพื่อดูใบสัญญา...
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }




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
                        <Text style={styles.titleStyle}>{arrayOfferData.length} คน</Text>
                    </View>
                    {arrayOfferData.length > 0 ?
                        (
                            <SafeAreaView style={{ flex: 1 }}>
                                <FlatList
                                    data={arrayOfferData}
                                    renderItem={({ item }) => (
                                        <OfferList navigation={props.navigation} item={item} postData={itemList} />
                                    )}
                                    keyExtractor={(item) => Date.now() + item.user_data._id}
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
                    <Container style={[styles.center, { backgroundColor: "#f2f2f2", height: deviceHeight / 2 }]}>
                        <ActivityIndicator size="large" color="red" />
                    </Container>
                </NativeBaseProvider>
            )
            }
        </>
    )
};

const deviceHeight = Math.round(Dimensions.get('window').height);
const deviceWidth = Math.round(Dimensions.get('window').width);

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
        alignItems: 'center',
        height: deviceHeight / 2
    },
    containerName: {
        width: deviceWidth - 60,
        height: 56,
        marginHorizontal: 30,
        marginTop: 15,
        marginBottom: 5,
        borderRadius: 30,
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#c1c1c1",
        borderWidth: 0.8
    },
    textInfo: {
        fontSize: 16,
        marginLeft: 30,
        textAlign: 'center',
    },
    textButton: {
        color: "#fff",
        width: '100%',
        textAlign: "center",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 4,
    },
    containerOffer: {
        backgroundColor: "#7BE885",
        height: 32,
        width: 73,
        borderRadius: 30,
    },
    containerReject: {
        backgroundColor: "#EC8484",
        height: 32,
        width: 73,
        borderRadius: 30,
    },
    containerManage: {
        flexDirection: "row",
        marginLeft: 30,
        marginBottom: 5
    },
    img: {
        marginLeft: 10,
        height: 45,
        width: 45,
        backgroundColor: "red",
        borderRadius: 30
    },
    textContract: {
        color: '#8C8C8C',
        fontSize: 12,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
        marginLeft: 100
    }
});

export default ManagementScreen;