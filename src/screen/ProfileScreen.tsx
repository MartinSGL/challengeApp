import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import GradientProfileBackground from '../components/GradientProfileBackground'
import RowItem from '../components/RowItem'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { ProfileContext } from '../context/ProfileContext'

export type RootStackParamList = {
  ProfileEditScreen: undefined
}

const ProfileScreen = () => {
 
  const navigation = useNavigation<StackNavigationProp <RootStackParamList> >()
  const {data,photo,location} = useContext(ProfileContext)

  return (
    <GradientProfileBackground>
      <>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.titleName}>{data.name}</Text>
            <Text style={styles.titleEmail}>{data.email}</Text>
          </View>
          <View style={styles.containerImage}>
            <Image source={{uri:photo}} style={styles.image}/>
          </View>
        </View>
        <View style={styles.rowSection}>
          <RowItem title={'School'} info={data.school} icon={'school-outline'} color={'blue'}/>
          <RowItem title={'Nick Name'} info={data.nickname} icon={'person-circle-outline'} color={'yellow'} />
          <RowItem title={'Emergency Number'} info={data.emergency_number} icon={'call-outline'} color={'green'} />
          <RowItem title={'Location'} 
            info={ location.longitud!== NaN 
              ?`longitud:${location.longitud}\nlatitud:${location.latitud}`
              : 'Location not found'
            } 
          icon={'location-outline'} color={'blue'} />
          <RowItem title={'Emergency Contact'} info={data.emergency_contact} icon={'book-outline'} color={'pink'}/>
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={()=> navigation.navigate('ProfileEditScreen')}
        >
          <Text style={styles.textEditButton}>
            Edit
          </Text>
        </TouchableOpacity>
      </>
    </GradientProfileBackground>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    justifyContent:'space-between',

  },
  headerTextContainer:{
    right:20
  },
  containerImage:{
    justifyContent:'center',
    alignItems:'flex-end',
  },
  image:{
    width:100,
    height:100,
    borderRadius:100
  },
  titleName:{
    fontSize:20,
    color:'white',
    fontWeight:'600'
  },
  titleEmail:{
    fontSize:15,
    color:'white',
    fontWeight:'600'
  },
  rowSection:{
    marginTop:20
  },
  editButton:{
    paddingHorizontal:30,
    paddingVertical:10,
    borderRadius:5,
    backgroundColor:'#FD297D'
  },
  textEditButton:{
    color:'white',
    fontSize:18,
    fontWeight:'600'
  }
});