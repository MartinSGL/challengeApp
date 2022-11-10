import React,{useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import CheckBox from '@react-native-community/checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ReactNativeBiometrics from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons'

interface FormProps {
    username:string,
    password:string,
    remember:boolean
}

const initData = {
    username:'',
    password:'',
    remember:false
}

const LoginScreen = () => {

    const navigation = useNavigation<StackNavigationProp<any>>()

    const [form, setForm] = useState(initData)
    
    const onChange = <K extends Object>(value:K,field:keyof FormProps) => {
        setForm({
            ...form,[field]:value
        })
    }
    
    const fingerLog = async ()  =>{
        const rnBiometrics = new ReactNativeBiometrics()
        const resultObject = await rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
        if (resultObject) {
            if(form.remember===true){
                await AsyncStorage.setItem('@storage_Key', 'remember')
                await AsyncStorage.setItem('@storage_route', 'BottomNavigation')
            }
            setForm(initData)
            navigation.navigate('BottomNavigation')
        } else {
            console.log('user cancelled biometric prompt')
        }
    }

    const submitPass = async (form:FormProps) => {
        if(form.username.toLowerCase()==='chavin' && form.password==='recorcholis'){
            
            if(form.remember===true){
                await AsyncStorage.setItem('@storage_Key', 'remember')
                await AsyncStorage.setItem('@storage_route', 'BottomNavigation')
            }
            setForm(initData)
            navigation.navigate('BottomNavigation')
              
        }
        else if(form.username==='' || form.password===''){
            Alert.alert(
                "Validation Error",
                "Empty fields",
                [
                  {
                    text: "Ok",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                ],
            )
        }
        else{
            Alert.alert(
                "Error",
                "Incorrect Username or Password",
                [
                  {
                    text: "Ok",
                    onPress: () => console.log("Cancel Pressed"),
                    style: 'destructive'
                  },
                ],
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Tinder</Text>
            </View>
            <TextInput 
                style={styles.input} 
                placeholder="Username"  
                placeholderTextColor="#FFFFFF"
                value={form.username}
                onChangeText={(value)=>{onChange(value,'username')}}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#FFFFFF"
                value={form.password}
                onChangeText={(value)=>{onChange(value,'password')}}
            />
            <View style={styles.rememberContainer}>
                <CheckBox
                    disabled={false}
                    boxType={'square'}
                    style={styles.checkBox}
                    hideBox={true}
                    value={form.remember}
                    onValueChange={(value)=>{onChange(value,'remember')}}
                />
                <Text style={styles.rememberText}> Remember me ? </Text>
            </View>

            <TouchableOpacity 
                style={styles.logInButton}
                onPress={()=>{submitPass(form)}}
            >
                <Text style={styles.logInButtonText}>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{fingerLog()}}
            >
                <Icon 
                    name={'finger-print-outline'} 
                    size={50} 
                    color={'white'} 
                    style={{top:70,textAlign:'center'}}
                />
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:40,
        backgroundColor:'#FD297D'
    },
    header:{
        top:-40
    },
    textHeader:{
        fontSize:25,
        color:'white',
        fontWeight:'900',
        textAlign:'center'
    },
    input:{
        borderBottomWidth:2,
        borderColor:'white',
        height:50,
        marginBottom:25,
        borderRadius:5,
        padding:10,
        color:'white'
    },
    rememberContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    rememberText:{
        color:'white',
        fontSize:15,
        fontWeight:'600'
    },
    checkBox:{
        borderWidth:1,
        width:20,
        height:20,
        marginRight:10
    },
    logInButton:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:5,
        marginTop:30,
        backgroundColor:'white',
        alignItems:'center'
    },
    logInButtonText:{
        color:'black',
        fontWeight:'400',
        fontSize:15
    }
});