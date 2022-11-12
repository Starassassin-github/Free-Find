// import
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// component
import WorkHistoryScreen from "../Screens/WorkHistory/WorkHistoryScreen";
import DisplayPostScreen from "../Screens/DisplayPost/DisplayPostScreen";
import PostHistoryScreen from "../Screens/PostHistory/PostHistoryScreen";
import ManagementScreen from "../Screens/Management/ManagementScreen";
import WorkStatusScreen from "../Screens/WorkStatus/WorkStatusScreen";
import MainPage from "../Screens/Main/MainScreen";
import LoadingScreen from "../Screens/Loading/LoadingScreen";
import LoginScreen from "../Screens/Login/LoginScreen";
import RegisterScreen from "../Screens/Register/RegisterScreen";
import ValidationBusinessScreen from "../Screens/ValidationBusiness/ValidationBusinessScreen";
import ValidationPersonaScreen from "../Screens/ValidationPersona/ValidationPersonaScreen";
import SearchPage from "../Screens/Search/searchScreen";
import ContractScreen from "../Screens/Contract/ContractScreen";
import SettingPersonaScreen from "../Screens/SettingPersona/SettingPersonaScreen";
import SettingCompanyScreen from "../Screens/SettingCompany/SettingCompanyScreen";
import UserPersonaScreen from '../Screens/UserPersona/UserPersonaScreen';
import UserCompanyScreen from "../Screens/UserCompany/UserCompanyScreen";
import Postscreen from '../Screens/Post/PostScreen';

const Stack = createNativeStackNavigator();

function Main() {

    // let isLoggedIn = false

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* {isLoggedIn ? ( */}
                <Stack.Group>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} />
                    <Stack.Screen name="Search" component={SearchPage} 
                    options={{
                        title: 'ค้นหา',
                        headerStyle: {
                            backgroundColor: '#DAE9FE',
                        },
                        headerTintColor: '#305D9A',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}/>
                    <Stack.Screen name="SettingPersona" component={SettingPersonaScreen} 
                        options={{
                            title: 'ตั้งค่าโปรไฟล์',
                            headerStyle: {
                                backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen name="SettingCompany" component={SettingCompanyScreen} 
                        options={{
                            title: 'ตั้งค่าโปรไฟล์',
                            headerStyle: {
                                backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen name="UserPersona" component={UserPersonaScreen}
                        options={{
                            title: 'โปรไฟล์',
                            headerStyle: {
                                backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen name="UserCompany" component={UserCompanyScreen} 
                        options={{
                            title: 'โปรไฟล์',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                    <Stack.Screen name="PostHistory" component={PostHistoryScreen} 
                        options={{
                            title: 'ประวัติการโพสต์',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                    <Stack.Screen name="WorkHistory" component={WorkHistoryScreen} 
                        options={{
                            title: 'ประวัติการโพสต์',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                    <Stack.Screen name="Contract" component={ContractScreen} />
                    <Stack.Screen name="Post" component={Postscreen} 
                        options={{
                            title: 'โพสต์',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                    <Stack.Screen name="WorkStatus" component={WorkStatusScreen} 
                        options={{
                            title: 'สถานะงาน',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                    <Stack.Screen
                        name="Management"
                        component={ManagementScreen}
                        options={{
                            title: 'การจัดการ',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                    <Stack.Screen
                        name="DisplayPost"
                        component={DisplayPostScreen}
                        options={{
                            title: 'ข้อมูลโพสต์',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                    <Stack.Screen name="Loading" component={LoadingScreen} />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{
                            title: 'ลงทะเบียน',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                    <Stack.Screen
                        name="ValidationBusiness"
                        component={ValidationBusinessScreen}
                        options={{
                            title: 'กรอกข้อมูล',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                    <Stack.Screen
                        name="ValidationPersona"
                        component={ValidationPersonaScreen}
                        options={{
                            title: 'กรอกข้อมูลส่วนตัว',
                            headerStyle: {
                              backgroundColor: '#DAE9FE',
                            },
                            headerTintColor: '#305D9A',
                            headerTitleStyle: {
                              fontWeight: 'bold',
                            },
                          }}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;