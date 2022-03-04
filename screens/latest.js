import React, { useState }  from "react";
import {Text,View,Dimensions, FlatList,Pressable,ImageBackground} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Media from "./media";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const {height,width} = Dimensions.get('window')
const Latest = ({navigation,route})=>{
    const hobby = route.params.hobby
    const users = route.params.users
    const myid = route.params.myid
    const dates = [2022-2-23,2022-2-24]
   const usersfilterd = users.filter((item) => {
                 return  item.hobbies.includes(hobby)
   })

   const sortedUsers = usersfilterd.sort((a,b)=> a.date - b.date)

    return (
      <View style={{flex:1,height:height,width:width}}>
        <View>
        <FlatList
          
              data={ sortedUsers.reverse()}
             
              contentContainerStyle={{flexGrow:1, justifyContent: "flex-start"}}
              renderItem={({item,inde})=>{
                let status = item.status
                
                
                
                return(
              
  
                  <View style={{flexDirection:'column'}}>
                  <View style={{flexDirection:'row',backgroundColor:'grey'}}>
                  
                  <View style={{backgroundColor:'red',height:width*.32,width:width*.32,margin:2}}>
                 {/* <Pressable onPress={()=>{navigation.navigate('targetedhoby',{"selectedhobby":thobby,"users":finalArray}
                  
  
                )}} > */}
                <Pressable onPress={()=>{
                  navigation.navigate('profile',{"user":item,'myid':myid})
                }}>
                    <ImageBackground source={{uri:item.profilePicture}} style={{height:width*.32,justifyContent:"flex-end",width:width*.32,padding:5}}> 
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                   <View style={{flexDirection:'row',alignItems:"center"}}>
                      <View style={{height:height*.01,width:height*.01,backgroundColor: status === "active"? "green":"red",borderRadius:5,margin:5}} />
                      <Text style={{color:'white'}}>{item.name}</Text>
                      </View>
                      <Text style={{color:'white', fontSize:10}}>{item.distance}Km</Text></View>
                    </ImageBackground>
                    </Pressable>
                    </View>
                  </View> 
                  </View>
                 
  
  
  
                )}}
                keyExtractor={inde=>inde}
               numColumns={3}
                
                />
                </View>
      </View>
    )              
  
  }
      
  
  

export default Latest