import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon  from 'react-native-vector-icons/Ionicons'

interface Props {
    title:string,
    info:string,
    icon:string,
    color:string
}

const RowItem = ({title,info,icon,color}:Props) => {
  return (
    <View style={styles.rowContainer}>
        <View style={styles.iconContainer}>
            <Icon name={icon} size={30} color={color} />
        </View>
        <View style={styles.textContainerRow}>
        <Text style={styles.textTitleRow}>{title}</Text>
        <Text style={styles.textRow}>{info}</Text>
        </View>
    </View>
  )
}

export default RowItem

const styles = StyleSheet.create({
    rowContainer:{
      flexDirection:'row',
      alignItems:'center',
      marginBottom:30
    },
    iconContainer:{
      padding:8,
      borderWidth:1,
      borderColor:'#cecece',
      borderRadius:100,
    },
    textContainerRow:{
      marginLeft:20
    },
    textTitleRow:{
      color:'gray'
    },
    textRow:{
      fontSize:18,
      fontWeight:'600'
    }
});