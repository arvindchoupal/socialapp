import React,{useState,useEffect} from  'react'
import {Text,ImageBackground,View,Button,Dimensions} from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-google-signin/google-signin';
import welcome from './images/welcome.jpg'
import Login from './screens/login';
import Home from './screens/home';
import Chat from './screens/chat'
import Profile from './screens/profile';
import HobyScreen from './screens/hoby';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Test from './screens/targetedhoby';
import Newprofile from './screens/newprofile'
import Myprofile from './screens/profile';
import messaging from '@react-native-firebase/messaging';

const {height,width} = Dimensions.get('screen')

GoogleSignin.configure();

const Signup = createStackNavigator()

const AuthNotDone = ()=>{
  return(
    <Signup.Navigator>
    <Signup.Screen name="login" component={Login} options={{
            headerShown: false,
          }}/>
    <Signup.Screen name="hoby" component={HobyScreen} options={{
            headerShown: false,
          }}/>


           <Signup.Screen name="authdone" component={AuthDone} options={{
            headerShown: false,
          }}/>
    </Signup.Navigator>
  )
}

const User = createStackNavigator()

const AuthDone = ()=>{
  return(
    <User.Navigator >
    <User.Screen name="home" component={Home} options={{
            headerShown: false,
          }}/>
    <User.Screen name="profie" component={Profile} options={{
            headerShown: false,
          }}/>
          <User.Screen name="targetedhoby" component={Test}  options={{
            headerShown: false,
          }} />
           <User.Screen name="profile" component={Newprofile}  options={{
            headerShown: false,
          }} />
    <User.Screen name="start" component={AuthNotDone} options={{
            headerShown: false,
          }} />
           <User.Screen name="chat" component={Chat} options={{
            headerShown: false,
          }} />
           <User.Screen name="myprofile" component={Myprofile} options={{
            headerShown: false,
          }} />
    </User.Navigator>
  )
}



const App = ()=>{
  useEffect(()=>{
    messaging().getToken().then(token=>{
      console.log(token)
      console.log('token')
    })
  },[])
  const [user,setuser] = useState()
  const [empty,setempty] = useState()
  const [initializing,setinitializing] = useState(true)
  const getid = async () => {
    console.log('getting id')
    try {
      const value = await AsyncStorage.getItem("id")
      console.log(value)
      if(value !== "") {setuser(value);console.log('getting id'+ value)}
    } catch(e) {
      console.log(e)
    }
    setinitializing(false)
    console.log('getting complt')
  }
useEffect(()=>{
  getid()
},[empty]
)
if (initializing) return null;
  return (
    <NavigationContainer>
     {user ? <AuthDone/> : <AuthNotDone/>}
 </NavigationContainer>
  
  )
}







export default App