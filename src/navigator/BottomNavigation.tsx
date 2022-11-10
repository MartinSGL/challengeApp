import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainScreen from '../screen/MainScreen'
import MyPhotosScreen from '../screen/MyPhotosScreen'
import ProfileScreen from '../screen/ProfileScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import ProfileNavigator from './ProfileNavigator'

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
    sceneContainerStyle={{
      backgroundColor: 'white',
    }}
    screenOptions={({route})=>({
      tabBarActiveTintColor: '#FD297D',
      tabBarStyle: {
        borderTopColor: '#FD297D',
        borderTopWidth: 2
      },
      tabBarLabelStyle: {

      },
      headerShow:false,
      tabBarLabelPosition:'beside-icon',
      // tabBarShowLabel:false,
      tabBarIcon:({color})=>{
        let icoName:string=''
        switch(route.name){
          case 'MainScreen':
            icoName = 'home-outline'
            break
          case 'MyPhotosScreen':
            icoName = 'images-outline'
            break
          case 'ProfileNavigator':
            icoName = 'person-circle-outline'
            break
        }
        return <Icon name={icoName} size={20} color={color} />
    }})}
    >
      <Tab.Screen name="MainScreen" options={{title:'Main',tabBarBadge:3}}  component={MainScreen} />
      <Tab.Screen name="MyPhotosScreen" options={{title:'MyPhotos'}} component={MyPhotosScreen} />
      <Tab.Screen name="ProfileNavigator" options={{title:'Profile'}} component={ProfileNavigator} />
    </Tab.Navigator>
  )
}

export default BottomNavigation