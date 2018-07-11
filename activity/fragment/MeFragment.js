import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import NavigationBar from '../../NavigationBar';
export default class MeFragment extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <NavigationBar title='我的'/>
                <Text onPress={()=>this.props.navigation.navigate("CustomKeyActivity")}>我的</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})