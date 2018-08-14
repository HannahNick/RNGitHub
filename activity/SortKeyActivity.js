/**
 * Created by nick on 2018/7/19
 */

import React,{Component} from 'react';
import LanguageDao,{FLAG_LANGUAGE} from "./expand/dao/LanguageDao";
import ArrayUtil from "../js/utils/ArrayUtil";
import SortableListView from "react-native-sortable-listview";
import {View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity, Alert} from "react-native";
import NavigationBar from "../NavigationBar";
import ViewUtils from "../js/utils/ViewUtil";

/**
 * 标签排序
 */
export default class SortKeyActivity extends Component{

    constructor(props){
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.dataArray=[];//数据库原始数据
        this.sortResultArray=[];//排序后的结果
        this.originalCheckedArray=[];//排序之前的数组
        this.state={
            checkArray:[],//已被订阅的标签
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        this.languageDao.fetch()
            .then(result=>this.getCheckedItems(result))
            .catch(error=>console.log(error));
    }

    /**
     * 过滤用户已订阅的数据
     * @param result
     */
    getCheckedItems(result){
        this.dataArray=result;
        let checkedArray=[];//创建一个空数组
        for (let i =0;i<result.length;i++){
            let data = result[i];
            if (data.checked){
                checkedArray.push(data);
            }
        }
        this.setState({
            checkArray:checkedArray,
        });
        this.originalCheckedArray=ArrayUtil.clone(checkedArray);
    }

    onBack(){
        if (ArrayUtil.isEqual(this.originalCheckedArray,this.state.checkArray)){
            this.props.navigation.goBack();
            return
        }
        Alert.alert("提示",
            "是否保存修改",
            [{text:"不保存",onPress:()=>{this.props.navigation.goBack()}, style:'cancel'},
                {text:"保存",onPress:()=>{this.onSave(true)}}])
    }

    /**
     * 保存排序后的订阅标签
     * @param isChecked
     */
    onSave(isChecked){
        //对比原始的排序和最新的排序是否相同
        if (!isChecked&&ArrayUtil.isEqual(this.originalCheckedArray,this.state.checkArray)){
            this.props.navigation.goBack();
            return;
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigation.goBack();
    }

    /**
     * 获取重新排序之后的数组
     */
    getSortResult(){
        this.sortResultArray=ArrayUtil.clone(this.dataArray);
        for (let i=0;i<this.originalCheckedArray.length;i++){
            let item = this.originalCheckedArray[i];
            let index = this.dataArray.indexOf(item);//获取原始位置的索引
            this.sortResultArray.splice(index,1,this.state.checkArray[i]);
        }
    }

    render(){
        let rightButton=<TouchableOpacity onPress={()=>this.onSave()}>
            <View style={{marginRight:10}}>
                <Text style={styles.title}>保存</Text>
            </View>
        </TouchableOpacity>;

        return(
          <View style={styles.tabContainer}>
              <NavigationBar title='标签排序'
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                rightButton={rightButton}
              />
              <SortableListView
                style={{flex:1}}
                data={this.state.checkArray}
                order={Object.keys(this.state.checkArray)}
                onRowMoved={e=>{
                    this.state.checkArray.splice(e.to,0,this.state.checkArray.splice(e.from,1)[0]);
                    this.forceUpdate();
                }}
                renderRow={row=><SortCell data={row}/>}
              />
          </View>
        );
    }

}

class SortCell extends Component{
    render(){
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                delayLongPress={500}
                style={styles.item}
                {...this.props.sortHandlers}
            >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={{width:20,height:20,resizeMode:'contain'}} source={require('../res/images/menu.png')}/>
                    <Text style={{marginLeft:10}}>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    tabContainer:{
        flex:1,
    },
    item:{
        padding:15,
        backgroundColor:"#f8f8f8",
        borderColor:'#eee',
        borderBottomWidth:1,
    },title:{
        fontSize: 15,
        color:'white',
    },
});