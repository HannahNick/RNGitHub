import React,{Component} from 'react';
import {View,ListView,StyleSheet,Text} from 'react-native';

const data={
    "result":[
        {
            "name":"王大锤",
            "age":19,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":25,
        },
        {
            "name":"王尼玛",
            "age":22,
        },
        {
            "name":"王尼玛",
            "age":23,
        },
        {
            "name":"王尼玛",
            "age":24,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
    ]  
};
export default class NickListActivity extends Component{

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        this.state={
            dataSource:ds.cloneWithRows(data.result)
        }
    }

    renderItem = (item)=>{
        return (
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{margin:20}}>{item.name}</Text>
                <Text>{item.age}</Text>
            </View>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource} renderRow={this.renderItem}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },

});