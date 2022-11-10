import React, { useContext, useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { GradientContext } from '../context/GradientContext';
import { GradientProfileContext } from '../context/GradientProfileContext';
import useFade from '../hooks/useFade';


interface Props {
    children: JSX.Element | JSX.Element
}

const GradientProfileBackground = ({children}:Props) => {

  const { colors, prevColors, setPrevMainColors } = useContext( GradientProfileContext );

  const {opacity,fadeIn,fadeOut} = useFade()

  useEffect(() => {
    fadeIn( () => {
        setPrevMainColors( colors );
        fadeOut();
    })
  }, [ colors ])

  return (
    <View style={{flex:1,alignItems:'center',paddingHorizontal:20,
    paddingTop:50}}>
        <LinearGradient
            colors={['#FD297D',prevColors.primary,prevColors.secondary]}
            style={{...StyleSheet.absoluteFillObject}}
            start={{x:0,y:0}}
            end={{x:0.5,y:0.5}}
        />

        <Animated.View
          style={{...StyleSheet.absoluteFillObject, opacity}}
        >
          <LinearGradient
            colors={['#FD297D',colors.primary,colors.secondary]}
            style={{...StyleSheet.absoluteFillObject}}
            start={{x:0,y:0}}
            end={{x:0.5,y:0.5}}
          />

        </Animated.View>

        {children}
    </View>
  )
}

export default GradientProfileBackground