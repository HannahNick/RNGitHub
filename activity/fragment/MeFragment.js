import React,{Component} from 'react';
import {StyleSheet,View,Text,NativeModules,DeviceEventEmitter,Alert} from 'react-native';
import NavigationBar from '../../NavigationBar';
import SortKeyActivity from "../SortKeyActivity";
export default class MeFragment extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('nativeCallRn',(msg)=>{
            console.log(msg);
        })
    }

    show(){
        NativeModules.mytoast.showToast("成功调起原生方法!!!牛逼");
    }

    render(){
        return(
            <View>
                <NavigationBar title='我的'/>
                <Text style={styles.mine} onPress={()=>this.props.navigation.navigate("CustomKeyActivity",{isRemove:false})}>标签订阅</Text>
                <Text style={styles.sortKey} onPress={()=>this.props.navigation.navigate("SortKeyActivity")}>标签排序</Text>
                <Text style={styles.removeKey} onPress={()=>this.props.navigation.navigate("CustomKeyActivity",{isRemove:true})}>删除标签</Text>
                <Text style={styles.grayStyle} onPress={()=>{this.show()}}>调用原生代码</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    mine:{
        height:40,
        textAlign:'center',
        backgroundColor:'skyblue',
    },
    sortKey:{
        height:40,
        textAlign:'center',
        backgroundColor:'powderblue',
    },
    removeKey:{
        height:40,
        textAlign:'center',
        backgroundColor:'steelblue',
    },
    grayStyle:{
        height:40,
        textAlign:'center',
        backgroundColor:'darkgray',
    }
});