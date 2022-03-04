import React, { useState }  from "react";
import {Text,View,Dimensions, FlatList,Pressable,ImageBackground} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Media from "./media";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Latest from "./latest";

const {height,width}= Dimensions.get('window')
import { StatusBar } from "expo-status-bar";
import Top from "./home";

const Tab = createMaterialTopTabNavigator();

function MyTabs({navigation,targetedhobby}) {
 
  return (
    <Tab.Navigator 
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12,color:'white' },
      tabBarItemStyle: { width: width*.33 },
      tabBarStyle: { backgroundColor: 'black' }}}
    >
      <Tab.Screen name="top" component={Targetedhoby} initialParams={{"targetedhobby":targetedhobby}}/>
      <Tab.Screen name="latest" component={Latest} />
      <Tab.Screen name="media" component={Media} />
    </Tab.Navigator>
  )}

const Targetedhoby = ({navigation,route})=>{
  const hobby = route.params.hobby
  const users = route.params.users
  const myid = route.params.myid
 

  return (
    <View style={{flex:1,height:height,width:width}}>
      <View>
      <FlatList
        
            data={ users.filter((item) => {
              
             return  item.hobbies.includes(hobby)
            })}
           
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
    

const Test =({route,navigation})=>{
  const [screen,setscreen] = useState("grey")
  const targetedhobby = route.params.selectedhobby
  const users = route.params.users
  const myid = route.params.myid
 
  
  
  return (
    <View>
    <View style={{backgroundColor:'black', width:width,height:height*.1,alignItems:'center',flexDirection:'row'}} >
    <Text style={{color:'white',marginTop:25,fontWeight:'bold',fontSize:15,marginLeft:25}}>Hobbizo</Text>
   </View>
   <View style={{height,width:width}}>
   <Tab.Navigator 
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12,color:'white' },
      tabBarItemStyle: { width: width*.33 },
      tabBarStyle: { backgroundColor: 'black' }}}
    >
      <Tab.Screen name="top" component={Targetedhoby} initialParams={{"users":users,"hobby":targetedhobby,"myid":myid}}/>
      <Tab.Screen name="latest" component={Latest} initialParams={{"users":users,"hobby":targetedhobby,"myid":myid}} />
      <Tab.Screen name="media" component={Media} />
    </Tab.Navigator>
   </View>
   </View>
   
   
  )
}
export default Test;