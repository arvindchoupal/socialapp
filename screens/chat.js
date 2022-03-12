import React,{useState,useEffect,useCallback} from 'react'
import {Text,View,Dimensions, Button,BackHandler} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage"

const {height,width} = Dimensions.get('window')






const Chat = ({route,navigation})=>{
  const [mydata,setmydata] =useState()
 const myid = route.params.myid


 const sendnoti = (message)=>{
  console.log('notfi')
  fetch ('https://f34c-2409-4064-915-4eee-189f-835a-eda8-a9d9.ngrok.io/send-noti',{
    method:'post',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": "dlB1TLV9R0qbeXfO79N_yP:APA91bF00pNqralubBBrwjUMvr5OL5nhvie_GjgMonQsll1ThT1CypOoQSU-PEay3C0ok4yn53PImkGY3nNE8-e762-KFZpzmrN-V0AqFecSGhZKF8LOlqcAtm_-C8RbB7-OzYg2kfSQ",
      "title": mydata.name,
      "msg":message
    
    })
  })
}
 useEffect(() => {
  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
}, []);

 console.log(myid)
  console.log('0')
  useEffect(()=>{
    console.log('1')
    getData()
    console.log('2')
  
  },[])


  const getData = async () => {
    console.log('const getdata')
    try {
      const jsonValue = await AsyncStorage.getItem('myprofiledata')
      const parsevale = await JSON.parse(jsonValue)
      setmydata(parsevale)
      console.log("mydat"+myid)
      console.log('3')
    
      //new realtime

      const docid = myid >  profile.id ? profile.id + '-' + myid :  myid+ '-' +profile.id 
      console.log('myid:' + myid)
     const messageRef = firestore().collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt','desc')
    
    messageRef.onSnapshot((querysnap)=>{
      const allmsg = querysnap.docs.map(docsnap=>{
        const data = docsnap.data()
        if(data.createdAt){
        return {
          ...docsnap.data(),
          createdAt:docsnap.data().createdAt.toDate()
        }
      }else {
        return{
        ...docsnap.data(),
        createdAt:new Date()
        }
      }

      })
      
      setMessages(allmsg)
    })

    

      
      
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }
    const [messages, setMessages] = useState([]);
    const profile = route.params.profile

    const getAllMessages = async ()=>{


      console.log("getallmsg")
      const docid = myid >  profile.id ? profile.id + '-' + myid :  myid+ '-' +profile.id 
      console.log('myid:' + myid)
      const querysnap = await firestore().collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt','desc')
      .get()
      const allmsg = querysnap.docs.map(docsnap=>{
        return {
          ...docsnap.data(),
          createdAt:docsnap.data().createdAt.toDate()
        }
      })
      
      setMessages(allmsg)
    }

    // useEffect(()=>{
    //   getAllMessages()
    // },[])









const onSend = (messagesArray ) => {
  const msg = messagesArray[0]
  const mymsg = {

  ...msg,
  sentBy:myid,
  sentTo :profile.id,
  createdAt:new Date()
  }
 setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
 const docid = myid >  profile.id ? profile.id + '-' + myid :  myid+ '-' +profile.id 
 console.log('profile id' + profile.id)
 
  firestore()
  .collection('chatrooms')
  .doc(docid)
  .collection('messages')
  .add({
   ...mymsg,createdAt:firestore.FieldValue.serverTimestamp()})
  
  .then(() => {
    console.log('User added!');
  });

  sendnoti(msg)
}

useEffect(()=>{
  console.log('if condition')
  if (mydata){
    console.log('if condition in')
  // getAllMessages()    not real time chat

}
},[])




 return (
   <>
   {mydata ? <View style={{flex:1}}>
   <View style={{height:height*0.08,width:width,backgroundColor:'green',flexDirection:'row',alignItems:'center'}}>
       <Text style={{color:'white',fontSize:18}}>
           {profile.name}
       </Text>
       </View>
<GiftedChat
messages={messages}
onSend={messages => onSend(messages)}
user={{
_id: myid,
}}
/>







</View>:<Button title={'send data'} />}
</>     
    )
}


export default Chat