/**
 * Created by nick on 2018/8/22
 */

import {createBottomTabNavigator, StackNavigator,createDrawerNavigator} from 'react-navigation';
import {Image, StyleSheet} from "react-native";
import PopularFragment from "../activity/fragment/PopularFragment";
import MeFragment from "../activity/fragment/MeFragment";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";
import SecondActivity from "../activity/SecondActivity";
import PhoneLoginActivity from "../activity/PhoneLoginActivity";
import HeyGuysHome from "../activity/HeyGuysHome";
import MainActivity from "../activity/MainActivity";

export const DrawerNav = createDrawerNavigator({
    MainActivity:{
        screen:MainActivity,
        navigationOptions:{
            drawerLabel:'MainActivity',
            drawerIcon:({tintColor})=>{
                return <MaterialIcons name={"drafts"} size={24} style={{color: tintColor}}/>
            }
        }
    },
    HeyGuysHome:{
        screen:HeyGuysHome,
        navigationOptions:{
            drawerLabel:'HeyGuysHome',
            drawerIcon:({tintColor})=>{
                return <MaterialIcons name={"drafts"} size={24} style={{color: tintColor}}/>
            }
        }
    }
},{
    initialRouteName: 'MainActivity',
});

export const bottomTabNavigator = createBottomTabNavigator({
    Home:{
        screen:PopularFragment,
        navigationOptions:({navigation})=>({
            tabBarLabel:'首页',
            tabBarIcon:({focused,tintColor})=>{
                return focused ? <Image style={styles.fragmentIcon} source={require('../res/images/home_sel.png')}/> :
                    <Image style={styles.fragmentIcon} source={require('../res/images/home_def.png')}/>;
            }
        })
    },
    Details:{
        screen:MeFragment,
        navigationOptions:({navigation})=>({
            tabBarLabel:'分类',
            tabBarIcon:({focused,tintColor})=>{
                return focused ?  <Image style={styles.fragmentIcon} source={require('../res/images/classification_sel.png')}/>:
                <Image style={styles.fragmentIcon} source={require('../res/images/classification_def.png')}/>;
            }
        })},
},{
    headerMode:'none',
    tabBarOptions:{
        activeTextColor:'tomato',
        inactiveTextColor:'gray'
    }
});

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    fragmentContain: {
        flex:1,
    },
    fragmentIcon:{
        width:40,
        height:30,
        marginTop:10,
        resizeMode:'contain',
    }
});