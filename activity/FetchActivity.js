import React,{ Component } from "react";
import {StyleSheet,View,Text,Alert} from 'react-native';
import HttpUtils from "../HttpUtil"; 
export default class FetchActivity extends Component{

    constructor(props){
        super(props);
        this.state={
            result:'',
        }
    }

    onLoad = (url)=>{
        fetch(url)
        .then(response=>response.json())
        .then(result=>{
            this.setState({
                result:JSON.stringify(result),//这里返回的结果是一个对象，需要json去解析一下
            });
        })
        .catch(error=>{
            this.setState({
                result:JSON.stringify(error),
            });
        })
    }    
      
    doPost(url){         
        var params = {viewType:2,tempFileId:1};
        fetch(url,{
            method:'POST',
            headers:{//要求服务器返回的结果是json格式的
                'Content-Type': 'application/x-www-form-urlencoded',
                'source-type': 'android',
                'role-type': 'cs',
            }, 
            body:JSON.stringify(params),
        }).then(response=>response.json())
        .then(result=>{
            Alert.alert(JSON.stringify(result));
        }).catch(error=>{
            Alert.alert("error");
        });
    }

    loadGet(url){
        HttpUtils.get(url)
        .then(result=>{
            this.setState({
                result:JSON.stringify(result),
            })
        })
        .catch(error=>{
            this.setState({
                result:JSON.stringify(error),
            })
        })
    }

    loadPost(url,params){
        HttpUtils.post(url,params)
        .then(result=>{
            this.setState({
                result:JSON.stringify(result),
            })
        })
        .catch(error=>{
            this.setState({
                result:JSON.stringify(error),
            })
        })
    }

    render(){
        return (
            <View>
                <Text 
                style={{height:50,textAlign:'center',backgroundColor:'skyblue'}}
                onPress={()=>{
                    this.loadGet("http://192.168.11.12:8181/getUserInfo");
                }}>get请求获取数据</Text>
                <Text 
                style={{height:50,textAlign:'center',backgroundColor:'powderblue'}}
                onPress={()=>{
                    this.doPost("http://heyguys.ap88.com/CMS-COMPONENTSETTING-SERVICE/cmsComponentValue/getSettingByFileId.apec2"); 
                }} 
                >Post请求提交数据</Text>
                <Text>{this.state.result}</Text>
            </View>

        );
    }
}