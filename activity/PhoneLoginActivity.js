import {Component} from 'react'
import React from "react";
import {Image, TextInput, View, StyleSheet, Text, TouchableHighlight} from "react-native";


export default class PhoneLoginActivity extends Component{

    constructor(prpos){
        super(prpos);
    }

    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../res/images/edition_ip.png')}/>
                <View style={styles.inputTextContain}>
                    <Image style={styles.userIcon} source={require('../res/images/user.png')}/>
                    <TextInput style={styles.inputTextType} keyboardType='number-pad' underlineColorAndroid={'transparent'} placeholder={"请输入手机号"}/>
                    <View style={styles.verticalLine}/>
                    <Text style={styles.getCode}>获取验证码</Text>
                </View>
                <View style={styles.inputTextContain}>
                    <Image style={styles.userIcon} source={require('../res/images/lock.png')}/>
                    <TextInput style={styles.inputTextCodeInput} keyboardType='number-pad' underlineColorAndroid={'transparent'} placeholder={"请输入验证码"}/>
                </View>
                <TouchableHighlight
                    style={styles.touchType}
                    activeOpacity={0.9}
                    underlayColor={'#FFE289'}
                    onPress={()=>{}}
                >
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginTextType}>登录</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#fff',
    },
    logo:{
        height:135,
        resizeMode:'center',
        marginTop:80,
        marginBottom:30,
    },
    inputTextContain:{
        flexDirection:'row',
        marginTop:10,
        marginLeft:40,
        marginRight:40,
        height:40,
        borderRadius:4,
        borderWidth:1,
        borderColor:'#FDCD45',
        alignItems:'center',
    },
    userIcon:{
        width:20,
        height:20,
        flex:1,
        resizeMode:'contain'
    },
    inputTextType:{
        flex:4.5,
    },
    verticalLine: {
        width:1,
        height:20,
        backgroundColor:'#FDCD45',
        marginLeft:5,
        marginRight:5,
    },
    getCode:{
        fontSize:12,
        marginLeft:3,
        marginRight:5,
    },
    inputTextCodeInput:{
        flex:7,
    },
    touchType:{
        flexDirection:'row',
        height:40,
        backgroundColor:'#FECC3F',
        marginTop:10,
        marginLeft:40,
        marginRight:40,
        borderRadius:3,

    },
    loginContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'gray',
        shadowOffset:{h:10,w:10},
        shadowRadius:3,
        shadowOpacity:0.8,
    },
    loginTextType:{
        fontSize:17,
        color:'black',
    },
});