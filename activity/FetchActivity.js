import React,{ Component } from "react";
import {StyleSheet,View,Text,Alert} from 'react-native';
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

    doPost=(url)=>{
        var params = {viewType:2,tempFileId:1};
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
            fetch(url,{
                method:'POST',
                header:{//要求服务器返回的结果是json格式的
                    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
                    'Connection':'Keep-Alive',
                    'source-type':'android',
                    'encryptType':"2",
                    'role-type:':"cs",
                },
                body:formBody,
            }).then(response=>response.json())
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result),
                });
            }).then(error=>{
                this.setState({
                    result:JSON.stringify(error),
                });
            })
    }

    render(){
        return (
            <View>
                <Text 
                style={{height:50,textAlign:'center',backgroundColor:'skyblue'}}
                onPress={()=>{
                    this.onLoad("http://192.168.11.12:8181/getUserInfo");
                }}>get请求获取数据</Text>
                <Text 
                style={{height:50,textAlign:'center',backgroundColor:'powderblue'}}
                onPress={()=>{
                    this.doPost("http://heyguys.ap88.com/CMS-COMPONENTSETTING-SERVICE/cmsComponentValue/getSettingByFileId.apec2") 
                }} 
                >Post请求提交数据</Text>
                <Text>{this.state.result}</Text>
            </View>

        );
    }
}