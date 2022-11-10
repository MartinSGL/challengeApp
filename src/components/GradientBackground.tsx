import React, { useContext, useEffect } from 'react'
import { View, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { GradientContext } from '../context/GradientContext';
import useFade from '../hooks/useFade';


interface Props {
    children: JSX.Element | JSX.Element
}

const GradientBackground = ({children}:Props) => {

  const { colors, prevColors, setPrevMainColors } = useContext( GradientContext );

  const {opacity,fadeIn,fadeOut} = useFade()

  useEffect(() => {
    fadeIn( () => {
        setPrevMainColors( colors );
        fadeOut();
    })
  }, [ colors ])

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <LinearGradient
            colors={[prevColors.primary,prevColors.secondary,'#FD297D']}
            style={{...StyleSheet.absoluteFillObject}}
            start={{x:0.1,y:0.1}}
            end={{x:1,y:1}}
        />

        <Animated.View
          style={{...StyleSheet.absoluteFillObject, opacity}}
        >

          <LinearGradient
            colors={[colors.primary,colors.secondary,'#FD297D']}
            style={{...StyleSheet.absoluteFillObject}}
            start={{x:0.1,y:0.1}}
            end={{x:1,y:1}}
          />

        </Animated.View>

        {children}
    </View>
  )
}

export default GradientBackground