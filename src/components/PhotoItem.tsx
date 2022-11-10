import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon  from 'react-native-vector-icons/Ionicons'

export const PhotoItem = ({item,drag,isActive,handleDelete}:any) => {
  
  const leftSwipe = (progress:any, dragX:any) => {
    const scale = dragX.interpolate({
      inputRange: [1, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }) // pendiente
    return (
        <TouchableOpacity onPress={handleDelete}>
          <View style={{...styles.deleteBox}}>
               <Icon name='trash-outline' size={40} color={'white'}/>
          </View>
        </TouchableOpacity>
    )
  }

  return (
    <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
            style={[
              styles.rowItem,
              { backgroundColor: isActive ? "blue" : '#FD297D' },
            ]}
          >
          <Swipeable renderLeftActions={leftSwipe}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Image source={{uri:item.url}} style={styles.image} />
              <View style={{width:'80%'}}>
                 <Text style={styles.text}>{item.title}</Text>
              </View>
            </View>
          </Swipeable>
        </TouchableOpacity>
    </ScaleDecorator>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 80,
    width: '90%',
    alignSelf:'center',
    alignItems: "center",
    flexDirection:'row',
    paddingHorizontal:20,
    marginBottom:10,
    borderRadius:5,
  },
  text: {
    color: "white",
    fontSize: 12,
    textAlign:'left'
  },
  image:{
    height:40,
    width:40,
  },
  deleteBox:{
    height:50,
    width:50,
  }
});