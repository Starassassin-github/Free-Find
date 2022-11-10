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
                    <Stack.Screen name="Main" component={MainPage} options={{headerShown: false}} />
                    <Stack.Screen name="Search" component={SearchPage} />
                    <Stack.Screen name="SettingPersona" component={SettingPersonaScreen} />
                    <Stack.Screen name="SettingCompany" component={SettingCompanyScreen} />
                    <Stack.Screen name="UserPersona" component={UserPersonaScreen} />
                    <Stack.Screen name="UserCompany" component={UserCompanyScreen} />
                    <Stack.Screen name="PostHistory" component={PostHistoryScreen} />
                    <Stack.Screen name="WorkHistory" component={WorkHistoryScreen} />
                    <Stack.Screen name="Contract" component={ContractScreen} />
                    <Stack.Screen name="WorkStatus" component={WorkStatusScreen} />
                    <Stack.Screen
                        name="Management"
                        component={ManagementScreen}
                    />
                    <Stack.Screen
                        name="DisplayPost"
                        component={DisplayPostScreen}
                        options={{ title: 'Post' }}
                    />
                    <Stack.Screen name="Loading" component={LoadingScreen} />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}

                    />
                    <Stack.Screen
                        name="ValidationBusiness"
                        component={ValidationBusinessScreen}

                    />
                    <Stack.Screen
                        name="ValidationPersona"
                        component={ValidationPersonaScreen}

                    />
                </Stack.Group>



                {/* ) : ( */}




                {/* )} */}

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;