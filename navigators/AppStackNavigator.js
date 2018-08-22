/**
 * Created by nick on 2018/8/22
 */

import {createBottomTabNavigator, StackNavigator} from 'react-navigation';
import {Image, StyleSheet} from "react-native";
import PopularFragment from "../activity/fragment/PopularFragment";
import MeFragment from "../activity/fragment/MeFragment";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import SecondActivity from "../activity/SecondActivity";


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

                return <Ionicons
                    name={focused ? 'person':'person-outline'}
                    size={26}
                    style={{color:tintColor}}
                />
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