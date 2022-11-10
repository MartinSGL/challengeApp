import React, { useContext, useState } from 'react'
import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './ProfileScreen';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Data } from '../hooks/useProfile';
import { ProfileContext } from '../context/ProfileContext';
import { useNavigation } from '@react-navigation/native';

const ProfileEditScreen = () => {

  const navigation = useNavigation<StackNavigationProp <RootStackParamList> >()
  
  const {data,photo,setData,setPhoto} = useContext(ProfileContext)

  const [form,setForm] = useState(data)
  const [formPhoto,seFormPhoto] = useState(photo)

  const onChange = <T extends Object>(value:T ,field: keyof Data) =>{
    setForm({
      ...form,[field]:value
    })
  }

  const submitData = () =>{
    setData(form)
    setPhoto(formPhoto)
    navigation.pop()
  }

  const selectImage = async () =>{
    const {assets} = await launchImageLibrary({mediaType:'photo'})
    if(assets) seFormPhoto(assets[0].uri as string)
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri:formPhoto}} style={styles.image}/>
        <TouchableOpacity style={styles.imageButon} onPress={selectImage}>
          <Icon name='image-outline' size={20} color={'#FD297D'}/>
        </TouchableOpacity>
      </View>
      
      <TextInput style={styles.input} placeholder='School' value={form.school} 
        onChangeText={(value)=>onChange(value,'school')}/>
      <TextInput style={styles.input} placeholder='Email' value={form.email}
         onChangeText={(value)=>onChange(value,'email')}
      />
      <TextInput style={styles.input} placeholder='Name' value={form.name}
         onChangeText={(value)=>onChange(value,'name')}
      />
      <TextInput style={styles.input} placeholder='Nick Name' value={form.nickname}
         onChangeText={(value)=>onChange(value,'nickname')}
      />
      <TextInput style={styles.input} placeholder='Emergency Contact'
        value={form.emergency_contact} 
       onChangeText={(value)=>onChange(value,'emergency_contact')}/>
       <TextInput style={styles.input} placeholder='Emergency Number'
        value={form.emergency_number} 
       onChangeText={(value)=>onChange(value,'emergency_number')}/>

       <TouchableOpacity 
          style={styles.button}
          onPress={submitData}
        >
          <Text style={styles.textButton}>
            Update
          </Text>
       </TouchableOpacity>
    </View>
  )
}

export default ProfileEditScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingVertical:20,
    paddingHorizontal:20
  },
  imageContainer:{
    alignSelf:'center',
    marginVertical:50
  },
  image:{
    width:100,
    height:100,
    borderRadius:100,
  },
  imageButon:{
    top:-20,
    left:90,
  },
  input:{
    borderBottomWidth:1,
    padding:10,
    borderColor:'#cecece',
    borderRadius:10,
    marginBottom:20
  },
  button:{
    paddingHorizontal:30,
    paddingVertical:10,
    alignSelf:'center',
    borderRadius:10,
    backgroundColor:'#FD297D',
    marginTop:20
  },
  textButton:{
    color:'white',
    fontSize:20,
    fontWeight:'600'
  }
});