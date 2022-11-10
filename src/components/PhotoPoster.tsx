import React from 'react'
import { Image, StyleSheet, View } from 'react-native';
import { PhotoRes } from '../interfaces/photosInterface';

interface Props {
    photo:PhotoRes
    height?:number
    width?:number
}

const PhotoPoster = ({photo,height=420,width=300}:Props) => {
  return (
    <View style={styles.imageContainer}>
        <Image source={{uri:photo.url}} style={styles.image} />
    </View>
  )
}

export default PhotoPoster

const styles = StyleSheet.create({
    imageContainer:{
        flex:1,
        paddingVertical:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
    },
    image:{
        flex:1,
        borderRadius:18
    },
});