import {Component} from 'react'
import React from "react";
import {StyleSheet,Text, View,AppRegistry} from "react-native";
import {StackNavigator} from 'react-navigation';
import SecondActivity from "./SecondActivity";

export default class FirstActivity extends Component{

    constructor(props){
        super(props);
        this.state={
            word:'123',
        }
    }

    render(){
        const {navigate} = this.props.navigation;
        return (<View style={styles.container}>
            {/*<Text style={styles.text}
                  onPress={()=>{
                      this.props.navigator.push({
                          component:SecondActivity,
                          params:{
                              word:"第一页面传值",
                              onCallBack:(word)=>{
                                  this.setState({
                                      word:word,
                                  })
                              }
                          }
                      })
                  }}
            >点击往下一个页面传值</Text>*/}
            <Text style={styles.fontType}
                  onPress={()=>{
                navigate('SecondActivity')
            }}>推荐跳转方式2</Text>
            <Text style={styles.text}>{this.props.navigation.state.params.word}</Text>

        </View>)
    }
}

const styles = StyleSheet.create({
    contain:{
        flex:1,
        justifyContent:'center',
    },
    fontType:{
        fontSize:20 ,
        color:'black',
        backgroundColor:'skyblue',
    },

});




