import Geolocation from '@react-native-community/geolocation';
import React, { useContext, useEffect, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native';
import { GradientProfileContext } from '../context/GradientProfileContext';
import { getImageColorsProfile } from '../helper/getColores';

const initData = {
    name:'Goku Kakaroto Ramirez',
    nickname: 'Chavin',
    email:'chavin@gmail.com',
    school:'Tecnologico de Colima',
    emergency_contact:'Scarlett Johansson',
    emergency_number:'3131231234'
  }
  
  const initUrl = 'https://media.revistagq.com/photos/5f45010acb266484bb785c78/master/pass/dragon-ball-z.jpg'
  
  export type Data = {
    name:string,
    nickname: string,
    email:string,
    school:string,
    emergency_contact:string,
    emergency_number:string
  }
  
  const initLocation = {
    longitud:NaN,
    latitud:NaN
  }

const useProfile = () => {
  
    const {setMainColors} = useContext(GradientProfileContext)

    const [data, setData] = useState(initData)
    const [photo, setPhoto] = useState(initUrl)
    const [location,setLocation] = useState(initLocation)

    const getPosterColors = async (url:string)=>{
        const uri = url
        const [primary,secondary] = await getImageColorsProfile(uri)
        setMainColors({primary,secondary})
      }
    
      useEffect(() => {
        getPosterColors(photo)
        requestLocationPermission()
      }, [photo])
    
      const requestLocationPermission = async () =>{
        if(Platform.OS === 'ios'){
          Geolocation.getCurrentPosition(({coords}) => setLocation({longitud:coords.latitude,latitud:coords.latitude}))
        }else{
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "App Location Permission",
              message:
                "This App needs access to your location " +
                "so we can stalk your information.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(({coords}) => setLocation({longitud:coords.latitude,latitud:coords.latitude}))
            console.log("You can use my location");
          } else {
            console.log("location permission denied");
          }
        }
      }
  
    return {
        data,photo,location, setData, setPhoto
    }
}

export default useProfile