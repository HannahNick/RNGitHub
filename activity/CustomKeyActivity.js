import React,{Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,ScrollView,Image,Alert} from 'react-native';
import NavigationBar from '../NavigationBar';
import ViewUtil from '../js/utils/ViewUtil';
import LanguageDao,{FLAG_LANGUAGE} from './expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box';
import ArrayUtil from "../js/utils/ArrayUtil";
export default class CustomKeyActivity extends Component{

    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changeValues=[];//用于保存用户操作的数据
        this.state={
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
            });
        })
        .catch(error=>{
            console.log(error);
        })
    }
    onSave(){
        if (this.changeValues.length===0){
            this.props.navigation.goBack();
            return;
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigation.goBack();
    }

    goBack(){
        this.props.navigation.goBack();
    }

    renderView(){
        if(!this.state.dataArray||this.state.dataArray.length===0){
            return <Text/>;
        }
        let len = this.state.dataArray.length;
        let views=[];
        for(let i=0;i<len-2;i+=2){//每两个为一组来遍历这个数组
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2===0?this.renderCheckBox(this.state.dataArray[len-2]):null}
                    {this.renderCheckBox(this.state.dataArray[len-1])}
                </View>
                <View style={styles.line}/>
            </View> 
        );
        return views;
    }

    renderCheckBox(data){
        let leftText=data.name;
        return(
            <CheckBox
                isIndeterminate={false}
                style={styles.check}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                isChecked={!data.checked}
                checkedImage={<Image  style={styles.checkIcon } source={require('../res/images/check.png')}/>}
                unCheckedImage={<Image style={styles.checkIcon} source={require('../res/images/uncheck.png')}/>}
            />
        )
    }

    onClick(data){
        data.checked=!data.checked;
        //如果勾选的对象在定义的数组中的话，就移除，否则就添加进去
        ArrayUtil.updateArray(this.changeValues,data);
    }

    render(){
        let rightButton=<TouchableOpacity onPress={()=>this.onSave()}>
            <View style={{marginRight:10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>;
        return (
            <View style={{flex:1}}>
                <NavigationBar 
                    title='自定义标签' 
                    leftButton={ViewUtil.getLeftButton(()=>this.goBack())}
                    rightButton={rightButton}
                    />
                {this.renderView()}
                <Text style={{height:30,alignSelf:'center'}} onPress={()=>{
                    this.languageDao.delete();
                }}>删除数据</Text>
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
        height:40,
    },
    checkIcon:{
        tintColor:'#2196F3',
        width:20,
        height:20,
        resizeMode:'contain',
    },
    check:{
        flex:1,
        paddingLeft: 10,
        paddingRight: 10,
    }
});