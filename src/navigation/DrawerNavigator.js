import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen';
import {CreateCardScreen} from '../screens/CreateCardScreen';
import {EditCardScreen} from '../screens/EditCardScreen';
import {CardDetailScreen} from '../screens/CardDetailScreen';
import {CardsScreen} from '../screens/CardsScreen';
import {ReboleteoScreen} from '../screens/ReboleteoScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const StackScreens = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Inicio'}} />
    <Stack.Screen name="CardDetail" component={CardDetailScreen} options={{title: 'Cartón'}} />
    <Stack.Screen name="EditCard" component={EditCardScreen} options={{title: 'Editar Cartón'}} />
  </Stack.Navigator>
);

export const DrawerNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={StackScreens} />
      <Drawer.Screen name="Ver Cartones" component={CardsScreen} />
      <Drawer.Screen name="Crear Cartón" component={CreateCardScreen} />
      <Drawer.Screen name="Editar Cartón" component={EditCardScreen} />
      <Drawer.Screen name="Reboleteo" component={ReboleteoScreen} />
      <Drawer.Screen name="Modo Calendario" component={CardsScreen} />
      <Drawer.Screen name="Configuración" component={HomeScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);
