import React, { useState, useEffect } from "react";
import { Text, View, Alert, Dimensions, Image, FlatList, TextInput, Pressable, ScrollView, TouchableOpacity } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from "@react-navigation/native";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import Ionicons from 'react-native-vector-icons/Ionicons'

const { height, width } = Dimensions.get('window')
// import { Ionicons } from "@expo/vector-icons";
const Newprofile = ({ navigation, route }) => {
    const [mydata,setmydata] =useState([])
    const [review,setreview] = useState()
    const [update,setupdate] =useState(false)
    const profile = route.params.user
    const myid = route.params.myid
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('myprofiledata')
         const mypdata = JSON.parse(jsonValue)
        console.log("mydata recived:")
        console.log(mypdata)
        setmydata(mypdata)
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
    
          console.log(e)
        }
        
      }
    useEffect(()=>{
        getData()},[])
    console.log(myid)
    return (
        <ScrollView>
            <View style={{  alignItems: 'center'}}>
                <Image source={{ uri: profile.profilePicture }} style={{ height: height * .1, width: height * .1, borderRadius: 100 }} />
                <Text style={{ fontSize: 17, fontWeight: "800", marginTop: 5 }}>{profile.name}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 13, color: "grey", marginTop: 5}}>Distance:{profile.distance}Km   |   </Text>
                    <Text style={{ fontSize: 13, color: "grey", marginTop: 5}}>Status:{profile.status}</Text>
                </View>
               

                <View style={{ flexDirection: 'row', width: width, height: height * .1 }}>
                    <View style={{  borderColor: "grey", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 2, width: width * .5, height: height * .08, marginTop: height * .03 }}>
                        <View style={{ width: width * .5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Ionicons name="person-add" size={16} color='black' /> */}
                            <Text style={{ marginLeft: 10, color: 'black' }}>
                                Add Friend
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginTop: height * .03, borderColor: "grey", width: width * .5, borderWidth: 2, alignItems: "center", justifyContent: "center", height: height * .08, borderLeftWidth: 0 }}>

                     <Pressable onPress={()=>navigation.navigate('chat',{"profile":profile,'myid':myid})}>
                        <View style={{ width: width * .5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Ionicons name="md-chatbox-ellipses-sharp" size={16} color="black" /> */}
                            <Text style={{ marginLeft: 10, color: 'black' }}>
                                Message
                            </Text>
                        </View>
                        </Pressable>
                    </View>
                </View>
                <View style={{ width: width,height:height*.77, marginTop: 20 }}>
                    <FlatList
                        data={profile.reviews}
                        renderItem={({ item, index }) => {
                            console.log("flat")
                            console.log(item)
                            return (
                                <View>
                                    <View style={{
                                        shadowColor: "grey",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.23,
                                        shadowRadius: 2.62,

                                        elevation: 5, flexDirection: 'row', alignItems: 'center', height: height * .1, width: width * .9, marginTop: 10,paddingLeft:10
                                    }}>
                                        <Image source={{ uri: item.pic }} style={{ height: height * .08, width: height * .08, borderRadius: 100 }} />
                                        <Text style={{ marginLeft: 5 }}>
                                            {item.review}
                                        </Text>
                                    </View>
                                </View>)
                        }}
                        keyExtractor={item => item.name}

                    />


                </View>
<View style={{flexDirection:'row', width:width,position:'absolute',right:0,bottom:0,left:0}}>
 <View style={{flexDirection:'row',backgroundColor:'white',borderRadius:50,width:width*.8,marginLeft:5,height:height*.055,paddingLeft:10}}>
     <TextInput placeholder="write your review" value={review}style={{width:width*.8}} onChangeText={(text)=>{setreview(text)}} />
     
 </View>
 <TouchableOpacity onPress={ ()=>{
     
    fetch('https://7952-2409-4064-2c04-e7bd-dcb6-58a8-7405-1fb2.ngrok.io/newreview', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"name": mydata.myname,"photo":mydata.myphoto,"review":review,"email":mydata.myemail})
  }).then((response) => response.json()).then((data) => {
  console.log(data)
  Alert.alert('Hobizo','your review is added')
  setreview("")

   
   
  })
    .catch(err => console.error(err))

 

 }} >
 <View style={{alignItems:'center',justifyContent:'center', backgroundColor:'green',height:height*.055,width:height*.055,borderRadius:100,marginLeft:10}}>
 <Ionicons name="send" size={18} color='white' />
</View>
</TouchableOpacity>
</View>






            </View>


        </ScrollView>
    )
}

export default Newprofile