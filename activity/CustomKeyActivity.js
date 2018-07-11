import React,{Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,ScrollView,Image} from 'react-native';
import NavigationBar from '../NavigationBar';
import ViewUtil from '../js/utils/ViewUtil';
import LanguageDao,{FLAG_LANGUAGE} from './expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';
export default class CustomKeyActivity extends Component{

    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues=[];
        this.setState={
            dataArray:[]
        }
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        this.languageDao.fetch()
        .then(result=>{
            this.setState({
                dataArray:result,
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }
    onSave(){
        this.props.navigation.goBack();
    }

    renderView(){
        if(!this.state.dataArray||this.state.dataArray.length===0)return null
        let len = this.state.dataArray.length;
        let views=[];
        for(let i=0,l=len-2;i<l;i+=2){//每两个为一组来遍历这个数组
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2===0?this.renderCheckBox(this.state.dataArray[len-2]):null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views;
    }

    renderCheckBox(data){
        let leftText=data.name;
        return(
            <CheckBox 
                style={{flex:1,padding: 10,}}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                checkImage={<Image  style={{tintColor:'#6495ED'}} source={require('../res/images/check.png')}/>}
                unCheckedImage={<Image style={{tintColor:'#6495ED'}} source={require('../res/images/uncheck.png')}/>}
            />
        )
    }

    onClick(data){
        data.checked=!data.checked;
        //如果勾选的对象在定义的数组中的话，就移除，否则就添加进去
        for(var i=0,len=this.changeValues.length;i<len;i++){
            var temp = this.changeValues[i];
            if(temp===data){
                this.changeValues.splice(i,1);
                return;
            }
        }
        this.changeValues.push(data);
    }

    render(){
        let rightButton=<TouchableOpacity>
            <View style={{marginRight:10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>
        return (
            <View>
                <NavigationBar 
                    title='自定义标签' 
                    leftButton={ViewUtil.getLeftButton(()=>this.onSave())}
                    rightButton={rightButton}
                    />
                <ScrollView>
                    {this.renderView}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 15,
        color:'white',
    },
    line:{
        height:0.3,
        backgroundColor:'darkgray',
    },
    item:{
        flexDirection: 'row',
        alignItems: 'center',
    }
});