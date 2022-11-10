import React,{useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screen/LoginScreen'
import BottomNavigation from './BottomNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()

const StackNavigation = () => {
  const [routeState,setRouteState] = useState('')
  useEffect(()=>{
    
    const checkSession = async () =>{
      // await AsyncStorage.multiRemove(['@storage_Key','@storage_route'])
      const session = await AsyncStorage.getItem('@storage_Key')
      const route = await AsyncStorage.getItem('@storage_route')
      if(session && route) setRouteState(route)
    }
    checkSession()
  },[])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        cardStyle:{
          backgroundColor: 'white'
        }
        
      }}
    >
      {
        routeState === "" && <Stack.Screen name="LoginScreen" component={LoginScreen} />
      }
      {/* gestureEnable prevent swipe back to the login */}
      <Stack.Screen name="BottomNavigation" options={{gestureEnabled: false}} component={BottomNavigation} />
    </Stack.Navigator>
  )
}

export default StackNavigation