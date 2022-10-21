import { StatusBar } from 'expo-status-bar';
import React from "react";
import UserPersonaScreen from './Screens/UserPersona/UserPersonaScreen';
import WorkHistoryScreen from './Screens/WorkHistory/WorkHistoryScreen';
import { NavigationContainer } from "@react-navigation/native";
import Main from './Navigators/Main';

// import Screens

export default function App() {
  return (
    // <UserPersonaScreen />
    // <WorkHistoryScreen />
      <Main />

  );
}


