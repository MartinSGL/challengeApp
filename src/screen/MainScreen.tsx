import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, BackHandler, Dimensions, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { PhotoRes } from '../interfaces/photosInterface';
import photoAPI from '../api/photoApi';
import PhotoPoster from '../components/PhotoPoster';
import { getImageColors } from '../helper/getColores';
import { GradientContext } from '../context/GradientContext';
import GradientBackground from '../components/GradientBackground';

const{width:windowWidth} = Dimensions.get('window')

const MainScreen = () => {
  const [photos, setPhotos] = useState<PhotoRes[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const {setMainColors} = useContext(GradientContext)
  
  //colors
  const getPosterColors = async (index:number)=>{
    const photo = photos[index]
    const uri = photo.url

    const [primary='blue',secondary='cyan'] = await getImageColors(uri)
    setMainColors({primary,secondary})
  }

  useEffect(() => {
    //prevent to return back to the login page // Android
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })

    // getData from API
    const getData = async () =>{
      const res = await photoAPI.get('/photos')
      if(res.data){
        setPhotos(res.data)
      }
      setIsLoading(false)
    }
    getData()

    if( photos.length > 0 ) {
      getPosterColors(0)
  }

  }, [])

  if(isLoading) return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size={20} color={'red'}/>
    </View>
  )

  return (
    <GradientBackground>
      <View style={{ height:440}}>
        <Carousel
            data={photos}
            renderItem={({item})=>  <PhotoPoster photo={item}/> }
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
            onSnapToItem={(index)=>getPosterColors(index)}
        />
      </View>
    </GradientBackground>
  )
}

export default MainScreen