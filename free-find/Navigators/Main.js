import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkHistoryScreen from "../Screens/WorkHistory/WorkHistoryScreen";
import DisplayPostScreen from "../Screens/DisplayPost/DisplayPostScreen";


const Stack = createNativeStackNavigator();

function Main() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="WorkHistory" component={WorkHistoryScreen} />
                <Stack.Screen 
                    name="DisplayPost" 
                    component={DisplayPostScreen} 
                    options={{ title: 'Post' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;