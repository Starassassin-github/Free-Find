import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { LogBox, AppState } from "react-native";
import { AppStateService } from './AppStateService';

import Main from './Navigators/Main';


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


