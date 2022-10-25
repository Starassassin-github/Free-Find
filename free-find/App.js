// import
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { LogBox, AppState } from "react-native";

// app state
import { AppStateService } from './AppStateService';

// navigator
import Main from './Navigators/Main';

// ignore logbox don't do this in production
LogBox.ignoreAllLogs(true);



export default function App() {

   // Listen to app state
   AppStateService.init();
   useEffect(() => {
       AppState.addEventListener('change', AppStateService.getInstance().handleAppStateChange);
       return (() => {
           AppState.removeEventListener('change', AppStateService.getInstance().handleAppStateChange);
       })
   }, []);

  return (
    // <UserPersonaScreen />
    // <WorkHistoryScreen />
      <Main />

  );
}


