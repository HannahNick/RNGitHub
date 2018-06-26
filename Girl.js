import {Component} from 'react'
import {StyleSheet,View, Text} from 'react-native'
import React from "react";

export default class Girl extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){

        return(
            <View style={styles.container}>
                <Text style={styles.text}>I am Girl</Text>
                <Text style={styles.text}>我收到了男孩:{this.props.word}</Text>
                <Text style={styles.text} onPress={()=>{
                    //onCallBack是上级页面传来的参数
                    this.props.onCallBack('一盒巧克力');
                    //这里是结束页面,finish
                    this.props.navigator.pop();
                }}>回赠巧克力</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'red',
    },
    text:{
        fontSize:20,
    }
});