import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screen/ProfileScreen'
import ProfileEditScreen from '../screen/ProfileEditScreen'
import { ProfileProvider } from '../context/ProfileContext'

const Stack = createStackNavigator()

const ProfileNavigator = () => {

  return (
    <ProfileProvider>
       <Stack.Navigator
        screenOptions={{
          headerShown:false,
          cardStyle:{
            backgroundColor: 'white'
          }
          
        }}
      >
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ProfileEditScreen"  component={ProfileEditScreen} />
      </Stack.Navigator>
    </ProfileProvider>
   
  )
}

export default ProfileNavigator