import React from 'react'
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import LoadingScreen from './src/screen/LoadingScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import PostScreen from './src/screen/PostScreen';
import WorkerScreen from './src/screen/WorkerScreen';
import SearchScreen from './src/screen/SearchScreen';
import UpdateInfoScreen from './src/screen/UpdateInfoScreen';
import JobPostingForm from './src/screen/JobPostingForm';
import EditingForm from './src/screen/JobEditingForm';
import DetailJobsScreen from './src/screen/DetailJobsScreen';

import Test from './src/screen/Test';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import 'expo-dev-client';

const Tab = createBottomTabNavigator();

const TabApp = ({navigation,route}) => {
  // console.log(route.params)
  return(
  <Tab.Navigator screenOptions={({headerShown,route,swipeEnable})=>({
    headerShown: false,
    tabBarIcon: ({ focused,color, size }) => {
      let nameicon;
      if (route.name === 'Home') {
        nameicon = focused ? 'home' : 'home-outline'
        return ( 
         <Icon name={nameicon} color={color} size={size}></Icon>
        );
      } 
      if(route.name === 'Post'){
        nameicon= focused ? 'note-edit' : 'note-edit-outline' ;
        return (
          <Icon name = {nameicon} color={color} size={size}></Icon>
        );
      }
      if(route.name === 'Worker'){
        nameicon = focused ? 'folder-account' : 'folder-account-outline'
        return (
          <Icon name ={nameicon} color={color} size={size}></Icon>
        );
      }
      if(route.name === 'Profile'){
        nameicon = focused ? 'account' : 'account-outline'
        return (
          <Icon name ={nameicon} color={color} size={size}></Icon>
        );
      }
    },
    tabBarInactiveTintColor:'gray',
    tabBarActiveTintColor: '#FF6F00',
    // tabBarAc
  })} >
    <Tab.Screen name='Home' component={HomeScreen} initialParams={route.params} options={{tabBarLabel:'Trang ch???'}} />
    <Tab.Screen name='Post' component={PostScreen} initialParams={route.params} options={{tabBarLabel:'????ng tin'}} />
    <Tab.Screen name='Worker' component={WorkerScreen} options={{tabBarLabel:'Qu???n l?? UV'}}/>
    <Tab.Screen name='Profile' component={ProfileScreen} options={{tabBarLabel:'C?? Nh??n'}}/>
  </Tab.Navigator>
  )
  
}
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name='Test' component={Test}/> */}
          <Stack.Screen name='Loading' component={LoadingScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Search' component={SearchScreen}/>
          <Stack.Screen name='JobPostingForm' component={JobPostingForm} options={{headerShown: true, title:'????ng tin tuy???n d???ng'}}/>
          <Stack.Screen name='JobEditingForm' component={EditingForm} options={{headerShown: true, title:'C???p nh???t tin tuy???n d???ng'}}/>
          <Stack.Screen name='Detail' component={DetailJobsScreen} options={{headerShown: true, title:'Th??ng tin chi ti???t'}}/>
          <Stack.Screen name='Update_Info' component={UpdateInfoScreen} options={{headerShown: true, title:'C???p nh???t th??ng tin'}}/>
          <Stack.Screen name='Tab' component={TabApp}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
