import React,{Component} from 'react';
import {StyleSheet,View,Text,NativeModules,DeviceEventEmitter,Alert} from 'react-native';
import NavigationBar from '../../NavigationBar';
import SortKeyActivity from "../SortKeyActivity";
import CodePush from 'react-native-code-push';
export default class MeFragment extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount() {
        DeviceEventEmitter.addListener('nativeCallRn',(msg)=>{
            console.log(msg);
        })

    }

    toNativeActivity(){
        NativeModules.HomeModule.doToast("来自RN的信息传递");
    }

    show(){
        // NativeModules.mytoast.showToast("成功调起原生方法!!!牛逼",(msg)=>{
        //     console.log(msg)
        // })
    }

    update(){
        CodePush.sync({
            updateDialog:{
                appendReleaseDescription:true,
                descriptionPrefix:'更新内容',
                title:'更新',
                mandatoryUpdateMessage:'',
                mandatoryContinueButtonLabel:'更新',
            },
            //安装完立即重启
            // mandatoryInstallMode:CodePush.InstallMode.IMMEDIATE,
            //安装完下次重启后更新
            // mandatoryInstallMode:CodePush.InstallMode.ON_NEXT_RESTART,
            //安装完后进入后台重启更新
            mandatoryInstallMode:CodePush.InstallMode.ON_NEXT_RESUME,
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title='我的'/>
                <Text style={styles.mine} onPress={()=>this.props.navigation.navigate("CustomKeyActivity",{isRemove:false})}>标签订阅</Text>
                <Text style={styles.sortKey} onPress={()=>this.props.navigation.navigate("SortKeyActivity")}>标签排序</Text>
                <Text style={styles.removeKey} onPress={()=>this.props.navigation.navigate("CustomKeyActivity",{isRemove:true})}>删除标签</Text>
                <Text style={styles.grayStyle} onPress={()=>{this.toNativeActivity()}}>调用原生代码</Text>
                <Text style={styles.removeKey} onPress={()=>{this.show()}}>调用原生代码2</Text>
                <Text style={styles.checkUpdate} onPress={()=>{this.update()}}>检查更新</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red',
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
    },
    checkUpdate:{
        height:40,
        textAlign:'center',
        backgroundColor:'red',
    },
});