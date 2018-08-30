import {Component} from 'react'
import React from "react";
import {StyleSheet,Text, View,AppRegistry,Alert,AsyncStorage} from "react-native";
import {StackNavigator} from 'react-navigation';
import SecondActivity from "./SecondActivity";
import Toast,{DURATION} from 'react-native-easy-toast';
import axios from 'axios';
import NavigationUtil from "../js/utils/NavigationUtil";

const KEY = "nick";
export default class FirstActivity extends Component{

    constructor(props){
        super(props);
        this.state={
            word:'123',
        }
    }

    getData(){ 
        axios.post ('http://heyguys.ap88.com/GOODSCORE-SERVICE/category/categroysByType.apec', {
            categoryType: '2',
        },{
            headers:{
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
      )
      .then(res => this.setState({
          word:JSON.stringify(res.data),
      }))
      .catch(err => Alert.alert(err))
    }

    getDataForFetch(){
        fetch('http://heyguys.ap88.com/CMS-COMPONENTSETTING-SERVICE/cmsComponentValue/getSettingByFileId.apec2', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      }, 
      body: JSON.stringify({
        tempFileId:1,
        viewType:2
      })
    }) 
      .then((response) => {
        // Alert.alert(JSON.stringify(response))
        return response.json()
      })
      .then((responseJson) => {
        console.log('data===> ' + responseJson)
        Alert.alert(JSON.stringify(responseJson))

        return responseJson;
      })
      .catch((error) => {
        console.error('error====>'+error);
      })
    }
    //123
    render(){
        const {navigate} = this.props.navigation;
        return (<View style={styles.contain}>
            {/*<Text style={styles.text}
                  onPress={()=>{
                      this.props.navigator.push({
                          component:SecondActivity,
                          params:{
                              word:"第一页面传值",
                              onCallBack:(word)=>{
                                  this.setState({
                                      word:word,
                                  })
                              }
                          }
                      })
                  }}
            >点击往下一个页面传值</Text>*/}
            {/*<Text style={styles.fontType}*/}
                  {/*onPress={()=>{*/}
                {/*navigate('PhoneLoginActivity')*/}
            {/*}}>推荐跳转方式2</Text>*/}
            {/*<View style={styles.text1TypeContain}>*/}
                {/*<Text style={styles.text1Type } onPress={()=>{*/}
                    {/*AsyncStorage.setItem(KEY,"123",error=>{*/}
                        {/*error?this.toast.show("保存失败"):this.toast.show("保存成功");*/}
                    {/*})*/}
                {/*}}>保存参数</Text>*/}
            {/*</View>*/}
            {/*<Text style={styles.text2Type} onPress={()=>{*/}
                    {/*AsyncStorage.getItem(KEY,(error,content)=>{*/}
                        {/*error?this.toast.show("没有相应值"):this.toast.show("获取值>>>"+content);*/}
                    {/*}) }}>获取参数</Text>*/}
            {/*<Text style={styles.text3Type} onPress={()=>{*/}
                    {/*AsyncStorage.removeItem(KEY,(error,content)=>{*/}
                        {/*error?this.toast.show("移除失败"):this.toast.show("移除成功>>>"+content);*/}
                    {/*}) }}>移除参数</Text>*/}
            {/*<Toast ref={toast=>this.toast=toast}/>*/}
            <Text style={styles.text} onPress={()=>NavigationUtil.popToPopPage({navigation:this.props.navigation})}>{this.props.navigation.state.params.word}</Text>
 
        </View>) 
    }
}

const styles = StyleSheet.create({
    contain:{
        flex:1,
        alignSelf:'stretch',
        justifyContent:'flex-start',
        flexWrap:'nowrap',//wrap:自适应  nowrap:不自适应(默认)
        flexDirection:'column',//row:水平 column:垂直(默认)
        borderWidth:2,
        borderColor:'gray',

    },
    fontType:{
        fontSize:20 ,
        color:'black',
        backgroundColor:'skyblue',
        alignSelf:'stretch',
    },
    text1TypeContain:{
        height:300,
        justifyContent:'center',
        backgroundColor:'powderblue',
    },
    text1Type:{
        // flex:1,//沿主轴方向的权重
        fontSize:20,
        textAlign:'right',
        backgroundColor:'red',
        //flex-start:沿侧轴开始位置 center:侧轴中间位置 flex-end:侧轴结束位置 stretch:沿侧轴铺满
        // alignSelf:'stretch',
    },
    text2Type:{
        fontSize:20,
        color:'black',
        // alignSelf:'stretch',
        backgroundColor:'steelblue',
    },
    text3Type:{
        fontSize:20,
        backgroundColor:'skyblue',
        // alignSelf:'stretch'
    }

});




