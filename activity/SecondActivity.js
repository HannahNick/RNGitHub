import {Component} from 'react'
import React from "react";
import {Text, View,StyleSheet,TouchableHighlight,Image,TouchableOpacity} from "react-native";
import NavigationBar from "../NavigationBar";

/**
 * 第二测试页面
 */
export default class SecondActivity extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        return (<View style={styles.contain}>

        </View>)
    }

}
 
const styles = StyleSheet.create({
    contain: { 
        flexDirection: 'row', 
        justifyContent: 'flex-start',
    },
    fontType: {
        fontSize: 20,
        color: 'red'
    },
    textType1:{
        //他的相对布局不是相对于父容器，而是相对于兄弟节点。
        backgroundColor:'steelblue',
        flex:1,
    },
    textType2:{
        width:200,
        backgroundColor:'skyblue',
    },
    textType3:{
        backgroundColor:'powderblue',
    },

});