import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {BingoProvider} from './src/context/BingoContext';
import {DrawerNavigator} from './src/navigation/DrawerNavigator';

const App = () => {
  return (
    <BingoProvider>
      <StatusBar barStyle="dark-content" />
      <DrawerNavigator />
    </BingoProvider>
  );
};

export default App;
