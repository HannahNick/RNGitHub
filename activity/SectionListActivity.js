/**
 * Created by nick on 2018/8/22
 */
import React,{Component} from 'react';
import {Image, SectionList, StyleSheet, Text, View} from "react-native";

const CITY_NAMES=[{
    data:['背景','上海','广州','深圳'],
    title:"一线"
},{data:['杭州','苏州','成都','武汉','郑州'],title:'二线'},
    {data:['洛阳','厦门','青岛','拉萨'],title:'三线'}
];

export default class SectionListActivity extends Component{

    constructor(props){
        super(props);
        this.state={
            loaded:true,
            data:CITY_NAMES,
        }

    }

    _keyExtractor = (item, index) => index.toString();

    renderMovie({item}){
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{item}</Text>
            </View>
        )
    }

    renderLoadingView(){

        return(
            <View style={styles.loading}>
                <Text>Loading....</Text>
            </View>
        )
    }

    _separator = () => {
        return <View style={{height:2,backgroundColor:'yellow'}}/>;
    };

    renderHeader({section}){
        return <View >
            <Text>{section.title}</Text>
        </View>
    }

    render(){
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <SectionList
                sections={this.state.data}
                renderItem={(data)=>this.renderMovie(data)}
                style={styles.list}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={this._separator}
                //分组吸顶效果只有在IOS才有效
                renderSectionHeader={(data)=>this.renderHeader(data)}
            />
        )
    }

}
const styles = StyleSheet.create({

    tabContainer:{
        flexDirection: 'row',
        backgroundColor:'#F5FCFF',
    },
    loading: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: "center"
    },
    year: {
        textAlign: "center"
    },
    thumbnail: {
        width: 100,
        height: 100,
        resizeMode:'stretch'
    },
    list: {
        paddingTop: 20,
        backgroundColor: "#F5FCFF"
    },
    quickContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    quick:{
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        width: 100,

    },
    item: {
        backgroundColor: '#169',
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
});