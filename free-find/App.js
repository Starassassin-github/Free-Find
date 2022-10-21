import { StatusBar } from 'expo-status-bar';
import React from "react";
import { LogBox } from "react-native";

import Main from './Navigators/Main';


LogBox.ignoreAllLogs(true);



export default function App() {
  return (
    // <UserPersonaScreen />
    // <WorkHistoryScreen />
      <Main />

  );
}


