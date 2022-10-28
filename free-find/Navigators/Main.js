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

const Stack = createNativeStackNavigator();

function Main() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group>
                    <Stack.Screen name="WorkStatus" component={WorkStatusScreen} />
                    <Stack.Screen name="PostHistory" component={PostHistoryScreen} />
                    <Stack.Screen
                        name="Management"
                        component={ManagementScreen}
                    />
                    <Stack.Screen name="WorkHistory" component={WorkHistoryScreen} />
                    <Stack.Screen
                        name="DisplayPost"
                        component={DisplayPostScreen}
                        options={{ title: 'Post' }}
                    />
                    <Stack.Screen name = "HomePage" component={MainPage}/>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="ValidationBusiness" component={ValidationBusinessScreen} />
                    <Stack.Screen name="ValidationPersona" component={ValidationPersonaScreen} />
                    <Stack.Screen name="Loading" component={LoadingScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;