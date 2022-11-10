// import
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { LogBox, AppState } from "react-native";

// app state
import { AppStateService } from './AppStateService';

// Context API
import Auth from './Context/store/Auth';


// navigator
import Main from './Navigators/Main';

// ignore logbox don't do this in production
LogBox.ignoreAllLogs(true);
// deprecated use is happening in a dependency
LogBox.ignoreLogs(["EventEmitter.removeListener"]);


export default function App() {


  return (
    // <UserPersonaScreen />
    // <WorkHistoryScreen />
    <Auth>
      <Main />
    </Auth>

  );
}


