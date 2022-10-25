// import
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// component
import WorkHistoryScreen from "../Screens/WorkHistory/WorkHistoryScreen";
import DisplayPostScreen from "../Screens/DisplayPost/DisplayPostScreen";
import PostHistoryScreen from "../Screens/PostHistory/PostHistoryScreen";
import ManagementScreen from "../Screens/Management/ManagementScreen";


const Stack = createNativeStackNavigator();

function Main() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="WorkHistory" component={WorkHistoryScreen} /> */}
                <Stack.Screen name="PostHistory" component={PostHistoryScreen} />
                <Stack.Screen 
                    name="DisplayPost" 
                    component={DisplayPostScreen} 
                    options={{ title: 'Post' }}
                />
                <Stack.Screen 
                    name="Management" 
                    component={ManagementScreen} 
                    options={{ title: 'Management' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;