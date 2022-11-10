import React from "react"
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../Screens/Login/LoginScreen';
import RegisterScreen from '../Screens/Register/RegisterScreen';
import ValidationPersona from '../Screens/ValidationPersona/ValidationPersonaScreen';
import ValidationBusiness from '../Screens/ValidationBusiness/ValidationBusinessScreen';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="ValidationBusiness"
                    component={ValidationBusiness}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="ValidationPersona"
                    component={ValidationPersona}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}
