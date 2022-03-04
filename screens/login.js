import React,{useState,useEffect} from  'react'
import {Text,ImageBackground,View,Button,Dimensions} from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import welcome from '../images/welcome.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
const {height,width} = Dimensions.get('screen')
GoogleSignin.configure();

const storeid = async (value) => {
  try {
   const store = await AsyncStorage.setItem('id', value)
   console.log(store)
  } catch (e) {
    // saving error
  }
  console.log('stored id' + value)
}


const getid = async () => {
  try {
    const value = await AsyncStorage.getItem('id')
    if(value !== null) {
      console.log('go to home page please navigation set here' )
    }else {'new user login navigation page'}
  } catch(e) {
    // error reading value
  }
}



const removeid = async () => {
  try {
    await AsyncStorage.removeItem('id')
    console.log('removed storage id')
  } catch(e) {
    // remove error
  }

  
}




const Login = ({navigation})=>{
  const [user,setuser] = useState()
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setuser(null); // Remember to remove the user from your app's state as well
      removeid()
    } catch (error) {
      console.error(error);
    }
  };

  

  const signIn = async () => {
    try {
      console.log('trying login')
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setuser(userInfo)
     
      console.log(userInfo.user)
            navigation.navigate('hoby',{
               "mobile": 123,
               "name" : userInfo.user.name ,
               "email": userInfo.user.email,
               "photo" : userInfo.user.photo,
                 "id":userInfo.user.id  
               
      })
      
      
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('processing')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View style={{flex:1}} >
     
      <ImageBackground source={welcome} style={{flex:1,height:height,width:width,opacity:.35}} />
     
      
   
    <View style={{width:width,paddingHorizontal:width*.2,position:"absolute",bottom:height*.3}}>
      <Button title= "Get Start" onPress={signIn} />
      </View>
      <View style={{width:width,paddingHorizontal:width*.2,position:"absolute",bottom:height*.2}}>
      <Button title= "signout" onPress={signOut} />
      </View>
    </View>
  )
}





export default Login