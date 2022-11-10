import React,{useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import StackNavigation from './src/navigator/StackNavigation'
import SplashScreen from 'react-native-splash-screen'
import { GradientProvider } from './src/context/GradientContext';
import { GradientProfileProvider } from './src/context/GradientProfileContext'

export default function App() {
  useEffect(()=>{
      SplashScreen.hide()
  },[])

  return (
    <NavigationContainer>
      <GradientProvider>
        <GradientProfileProvider>
          <StackNavigation/>
        </GradientProfileProvider>
      </GradientProvider>
    </NavigationContainer>
  )
}