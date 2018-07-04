import {Component} from 'react'
import React from "react";
import {Image, TextInput, View, StyleSheet, Text, TouchableHighlight} from "react-native";
import MainActivity from './MainActivity';
import FirstActivity from './FirstActivity';
import NavigationBar from "../NavigationBar";
export default class PhoneLoginActivity extends Component{

    state={
        showCoundDown:false,//是否显示倒计时
        requestCodeTime:30,

    };

    getCode = ()=>{
        if(this.state.showCoundDown){
            return;
        }
        setInterval(()=>{this.countDown()},1000);
    };

    constructor(props){
        super(props);
    }

    countDown(){
        if(this.state.requestCodeTime===0){
            this.setState({
                showCoundDown:false
            });
            return 0;
        }else {
            this.setState({
                requestCodeTime:this.state.requestCodeTime-1,
            });
            return this.state.requestCodeTime;
        }

    }

    render(){
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <NavigationBar/>
                <Image style={styles.logo} source={require('../res/images/edition_ip.png')}/>
                <View style={styles.inputTextContain}>
                    <Image style={styles.userIcon} source={require('../res/images/user.png')}/>
                    <TextInput style={styles.inputTextType} keyboardType='number-pad' underlineColorAndroid={'transparent'} placeholder={"请输入手机号"}/>
                    <View style={styles.verticalLine}/>
                    <Text style={styles.getCode} onPress={this.getCode}>{this.state.showCoundDown?this.state.requestCodeTime:"获取验证码"}</Text>
                </View>
                <View style={styles.inputTextContain}>
                    <Image style={styles.userIcon} source={require('../res/images/lock.png')}/>
                    <TextInput style={styles.inputTextCodeInput} keyboardType='number-pad' underlineColorAndroid={'transparent'} placeholder={"请输入验证码"}/>
                </View>
                <TouchableHighlight
                    style={styles.touchType}
                    activeOpacity={0.9}
                    underlayColor={'#FFE289'}
                    onPress={()=>{
                        // navigate('FirstActivity')
                    }}
                >
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginTextType}>登录</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.register}>注册</Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
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
        width:60,
        flexDirection:'row',
        alignItems:'center',
        fontSize:12,
        marginLeft:3,
        marginRight:5,
        textAlign:'center',
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
    registerContain:{
        flexDirection:'row-reverse',
        alignSelf:'stretch',
        marginRight:40,
        marginLeft:40,
        marginTop:10,
    },
    register:{
        alignSelf:'flex-end',
        marginRight:40,
        textDecorationLine:'underline',
    }

});