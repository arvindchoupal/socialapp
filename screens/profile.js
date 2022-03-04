import React,{useState} from 'react'
import {Text,View,Dimensions,Image, StatusBar, Pressable, Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
const {height,width} = Dimensions.get('window')

const Myprofile = ({route}) =>{
    const [newprofilepic,setnewProfileImage] = useState()
    const profile = route.params.profile
  const url = 'https://5309-2409-4064-28f-cd4d-78e4-f2ee-f287-40c3.ngrok.io/upload'

    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
          maxHeight: 200,
          maxWidth: 200,
          selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: false,
         
        }}
    const photo = async()=>{
        console.log('start photo')
        const images = await launchImageLibrary(options)
      
       const formdata =  new FormData()
       formdata.append('file',{
           uri:images.assets[0].uri,
           type:images.assets[0].type,
           name:images.assets[0].fileName
       })
     
       let resP = await fetch(
        url,
           {
                method: 'post',
                body :formdata,
                headers:{
                    'Content-Type': 'multipart/form-data'}
     } 
     );

     let respjson = await resP.json();
     
        console.log('response')
        let str = respjson.profile_url
       let new_str = str.replace('http://localhost:8060', 'https://5309-2409-4064-28f-cd4d-78e4-f2ee-f287-40c3.ngrok.io')
        setnewProfileImage(new_str)
        console.log(new_str,'respnsejson')
    }
    return(
        <View style={{alignItems:'center'}} >
            <StatusBar  backgroundColor="#0c0b4a"/>
           <LinearGradient colors={['#0c0b4a', '#2623a8', '#5a57eb']} style={{height:height*.45,width:width,paddingLeft:20,paddingTop:height*.05}}>

            <View> 
                <Text style={{color:'white'}}> Profile   </Text>  
                  </View>
  </LinearGradient>   
          <View style={{position:'absolute',top:height*.2, backgroundColor:'white', shadowColor: "#000",height:height*.8,width:width*.8,shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.23,shadowRadius: 2.62,elevation: 4,}}>
           <View style={{position:'absolute',top:-height*.08,right:width*.25,alignItems:'center'}}>
           <Pressable onPress={photo}>
             <Image source={{ uri:newprofilepic? newprofilepic: profile.myphoto}} style={{borderRadius:100, height:height*.16,width:height*.15}} />
     {console.log(newprofilepic)}
          <Text style={{color:'#0c0b4a',margin:5}}> Change </Text> 
          </Pressable>
          </View>
          
              </View> 
         
        
        </View>
    )
}

export default Myprofile