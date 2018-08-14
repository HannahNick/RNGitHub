import React,{Component} from 'react';
import {StyleSheet,View,Text,ListView ,Image ,TouchableOpacity} from "react-native";
import NavigationBar from '../NavigationBar';
import Toast,{DURATION} from 'react-native-easy-toast';
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
/**
 * 列表
 */
export default class ListViewActivity extends Component{

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            dataSource:ds.cloneWithRows(data.result),
        }
    }

    renderItem=(item,arg2,arg3)=>{
        return (
            <TouchableOpacity onPress={()=>{
                this.toast.show("你点击了"+arg3,DURATION.LENGTH_SHORT);
            }}>
                <View style={styles.row}>
                    <Text style={styles.tips}>{item.fullName}</Text>
                    <Text style={styles.tips}>{item.email}</Text>
                </View>
            </TouchableOpacity>
            )
    }

    renderSeparator=(arg1,arg2,arg3)=>{
        return <View style={{height:1,backgroundColor:'gray'}}></View>
    }

    renderFooter=()=>{
        return (
            <Image 
            resizeMode='contain'
            style={{height:50}} 
            source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530941431900&di=bf6b1a74aebce24a29996d3f722b6ce8&imgtype=0&src=http%3A%2F%2Fs9.rr.itc.cn%2Fr%2FwapChange%2F20166_10_10%2Fa4n7n66185398770855.jpg"}}/>
        )
    }

    render(){
        return(
            <View>
                <NavigationBar title='列表页'/>
                <ListView 
                    dataSource={this.state.dataSource} 
                    renderRow={this.renderItem}
                    renderFooter={this.renderFooter}
                    renderSeparator={this.renderSeparator}
                />
                <Toast ref={toast=>this.toast=toast}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    tabContainer:{
        flex:1,
    },
    tips:{
        fontSize: 14,
        color:'black',
        marginRight: 5,
    },
    row:{
        height:50,
    }
});