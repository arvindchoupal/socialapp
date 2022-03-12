import React,{useState,useEffect} from 'react'
import {Text,View,ScrollView,BackHandler, Dimensions,Image,Button, StatusBar, Pressable,FlatList, Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'



const {height,width} = Dimensions.get('window')






const Myprofile = ({route,navigation}) =>{
    const [newprofilepic,setnewProfileImage] = useState(' ')
    const [hobiesEdit,sethobbiesEdit] = useState(false)
    const [videofile,setvideofile] = useState()
    const [guitar, setGuitar] = useState(false);
    const [cycling, setCycling] = useState(false);
    const [yoga, setYoga] = useState(false);
    const [singing, setSinging] = useState(false);
    const [gym, setGym] = useState(false);
    const [theater, setTheater] = useState(false);
    const [crafting, setCrafting] = useState(false);
    const [painting, setPainting] = useState(false);
    const [pottery, setPottery] = useState(false);
    const [astrology, setAstrology] = useState(false);
    const [gardening, setGardening] = useState(false);
    const [photography, setPhotography] = useState(false);
    const [calligraphy, setCalligraphy] = useState(false);
    const [fashion, setFashion] = useState(false);
    const [interiordesigning , setInteriorDesigning ] = useState(false);
    const [makeup, setMakeup] = useState(false);
    const [carnatic, setCarnatic] = useState(false);
    const [playingInstrument, setPlayingInstrument] = useState(false);
    const [poetry, setPoetry] = useState(false);
    const [hindustaniClassical, setHindustaniClassical] = useState(false);
    const [opera, setOpera] = useState(false);
    const [jazz, setJazz] = useState(false);
 const [medialist,setmedialist] = useState([])
    const profile = route.params.profile
  const url = 'http://15.206.28.55:8060/upload'



  useEffect(() => {
    const backAction = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
          }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

const updateProfile = async ()=>{
    console.log('update profile start')
    if(newprofilepic != ' '){
     await fetch('http://15.206.28.55:8060/updateprofilepic', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": profile.myemail,
      "newProfilePic": newprofilepic

    })
  }).then((response) => response.json()).then((data) => {
   console.log(data)
   console.log('profile pic') 
  })
    .catch(err => console.error(err));
    console.log('profile pic')
    }

    if(medialist[0]){
       await fetch('http://15.206.28.55:8060/updatemedia', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "email": profile.myemail,
              "new media": medialist
        
            })
          }).then((response) => response.json()).then((data) => {
            console.log(data)
            console.log('media res')
          
          
           
          })
            .catch(err => console.error(err));
            console.log('media res')
       }


}





  const media = async()=>{

   
    const includeExtra = true
    const options = {
        title: 'Select Video',
        type: 'library',
        options: {
         
          selectionLimit: 3,
          mediaType: 'video',
          includeExtra,
         
        }}
    const image1 = await launchImageLibrary(options)
    const formdata =  new FormData()
       formdata.append('file',{
           uri:image1.assets[0].uri,
           type:image1.assets[0].type,
           name:image1.assets[0].fileName
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
     
   
        let str = respjson.profile_url
       var new_str = str.replace('http://localhost:8060', 'http://15.206.28.55:8060')
       setmedialist([...medialist,str])  
}

    
    const photo = async()=>{
        Alert.alert('phot profile')
        console.log('photo start')
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
     
   
        let str = respjson.profile_url
       var new_str = str.replace('http://localhost:8060', 'http://15.206.28.55:8060')
       setnewProfileImage(str)
        
        // console.log('media')
        // setmedialist([...medialist,new_str])
        // console.log(medialist)
        
    }
    return(
        <ScrollView  style={{backgroundColor:'white'}}>
            <StatusBar  backgroundColor="#0c0b4a"/>
            <View>
           <LinearGradient colors={['#0c0b4a', '#2623a8', '#5a57eb']} style={{height:height*.12,width:width,paddingLeft:20,paddingTop:height*.05}}>

            <View> 
                <Text style={{color:'white'}}> Profile   </Text>  
                  </View>
  </LinearGradient>
  </View>   
          <View style={{ elevation:5, backgroundColor:'white', shadowColor: "#000",width:width,shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.23,shadowRadius: 2.62,elevation: 4,}}>
           <View style={{alignItems:'center', position:'absolute',top:-height*.08,right:0,left:0}}>
           <Pressable onPress={photo}>
             <Image source={{uri:newprofilepic != ' ' ? newprofilepic: profile.myphoto} } style={{borderRadius:100, height:height*.16,width:height*.16}} />
          
    <Text style={{color:'#0c0b4a',textAlign:'center'}}> Change </Text>
     </Pressable>
      </View>
    <View style={{marginTop:height*.12}}>
    <Text style={{color:'#0c0b4a',textAlign:'center',fontSize:25}}> {profile.myname} </Text> 
          
          </View>
    <View style={{flexDirection:'row',justifyContent:'space-between',margin:10,marginTop:30}}>
        <Text style={{fontSize:15,fontWeight:'900'}}>About</Text>
        <Text style={{color:'blue'}}>Edit</Text>
    </View>
    <View style={{alignItems:'center'}}>
    <Text>
    I Love Cricket
    </Text>
    </View> 

    <View style={{flexDirection:'row',justifyContent:'space-between',margin:10,marginTop:30}}>
        <Text style={{fontSize:15,fontWeight:'900'}}>Hobbies</Text>
      <Pressable onPress={()=> sethobbiesEdit(!hobiesEdit)}>
          <Text style={{color:'blue'}}>Edit</Text>
          </Pressable>  

          
    </View>
    {hobiesEdit?<ScrollView style={{width:width*.8, backgroundColor:'#fae7d4',paddingTop:5}}>
       
   <View style={{paddingHorizontal:width*.02,backgroundColor:'#fae7d4',flexWrap:'wrap',flexDirection:'row'}}>
   <Pressable onPress={()=>setPainting(!painting)}>
       <View style={{backgroundColor:painting ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Painting
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setCrafting(!crafting)}>
       <View style={{backgroundColor:crafting ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Crafting
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setGardening(!gardening)}>
       <View style={{backgroundColor:gardening ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
            Gardening
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setGuitar(!guitar)}>
       <View style={{backgroundColor:guitar?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
              Guitar
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setCycling(!cycling)}>
       <View style={{backgroundColor:cycling?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
             Cycling
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setYoga(!yoga)}>
       <View style={{backgroundColor:yoga ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
           Yoga
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setGym(!gym)}>
       <View style={{backgroundColor:gym ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
             Gym
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setTheater(!theater)}>
       <View style={{backgroundColor:theater ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Theater
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setPoetry(!poetry)}>
       <View style={{backgroundColor:poetry ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
           Poetry
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setAstrology(!astrology)}>
       <View style={{backgroundColor:astrology ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Astrology
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setPhotography(!photography)}>
       <View style={{backgroundColor:photography ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
               Photography
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setCalligraphy(!calligraphy)}>
       <View style={{backgroundColor:calligraphy ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
              Calligraphy
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setFashion(!fashion)}>
       <View style={{backgroundColor:fashion ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
              Fashion
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setInteriorDesigning(!interiordesigning)}>
       <View style={{backgroundColor:interiordesigning ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
             interiordesigning
           </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setMakeup(!makeup)}>
       <View style={{backgroundColor:makeup ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
              Makeup
              </Text>
       </View>
   </Pressable>
   
   <Pressable onPress={()=>setHindustaniClassical(!hindustaniClassical)}>
       <View style={{backgroundColor:hindustaniClassical ?"#25e014":'white',padding:10,margin:10,borderRadius:10,borderColor:'black',borderWidth:0}}>
           <Text>
            hindustaniClassical
           </Text>
       </View>
   </Pressable>
   
   
   </View>
         <View style={{paddingHorizontal:width*.2,paddingTop:height*.1}}>
   <Button title="Submit" onPress={()=>submit()}></Button>
   </View>
  
     </ScrollView>:
    <View style={{width:width*.8, flexDirection:'row',borderColor:'pink'}}>
   <FlatList
    data ={profile.myhobbies}
    horizontal
    contentContainerStyle={{flexGrow:1, justifyContent: "flex-start"}}
    renderItem = {
             ({item,index})=>{
            return (
                <View style={{backgroundColor:'#d2d4d6',margin:5,padding:5}}>
                    <Text>
                        {item}
                    </Text>
                    </View>
            )
                     }
               }
    keyExtractor={index => index}
    />

    </View> } 


    <View>
        <View style={{padding:10,paddingTop:15, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={{fontSize:15,fontWeight:'900'}}>
                Album 
            </Text>

            <Text style={{color:'blue'}} >
              View all
            </Text>
        </View>
    </View>

<View>
    <FlatList
   
        contentContainerStyle={{flexGrow:1,flexWrap:'wrap',flexDirection:'row'}}
        data={medialist}
        renderItem={({item})=>{
            console.log(item)
            return(
                <View>
                     <View style={{width:width*.8/3,borderColor:'grey',borderWidth:2,height:width*.8/3,justifyContent:'center',alignItems:'center',margin:10}}>
          <Image source={{uri:item}} style={{height: width*.8/3,width:width*.8/3}} />
      </View>
                    </View>
            )
        }}
    ListHeaderComponent={()=>{
        return(
            <Pressable onPress={media}>
            <View style={{width:width*.8/3,borderColor:'grey',borderWidth:2,height:width*.8/3,justifyContent:'center',alignItems:'center',margin:10}}>
                <Text>
                    Add File
                </Text>
            </View>
            </Pressable>  
        )
    }}
        />

</View>

      

              </View> 
         
        <View>
            <Button title={'Update Profile'} onPress={updateProfile} />
        </View>
        </ScrollView>
    )
}

export default Myprofile