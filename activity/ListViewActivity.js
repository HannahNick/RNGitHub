import React,{Component} from 'react';
import {View,Text,ListView,StyleSheet} from 'react-native';
import ListViewComponent from './widget/ListViewComponent';
import NavigationBar from '../NavigationBar';
var data={
    "result":[
        {
            "email":"365719562@qq.com",
            "fullName":"张三张三"
        },
        {
            "email":"m13714570137_1@163.com",
            "fullName":"Nick"
        },
        {
            "email":"m123454656_1@163.com",
            "fullName":"王大锤"
        }
    ]
}
export default class ListViewActivity extends Component{

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state ={
            dataSource:ds.cloneWithRows(data.result),
        }
    }

    renderRow=(item)=>{
        return <View style={styles.row}>
            <Text style={styles.tips}>{item.fullName}</Text>
            <Text style={styles.tips}>{item.email}</Text>
        </View>
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title='列表示例'/>
                <ListView dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    tips:{
        fontSize: 14,
        color:'black',
    },
    row:{
        height:50,
    }
});