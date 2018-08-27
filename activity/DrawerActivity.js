/**
 * Created by nick on 2018/8/23
 */

import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
export default class DrawerActivity extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.showDrawerButton} onPress={()=>{this.props.navigation.navigate('DrawerNav')}}> 抽屉出来!</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    showDrawerButton:{
        height:50,
        fontSize:16,
        textAlign: 'center',
        backgroundColor: 'skyblue',
    }
});