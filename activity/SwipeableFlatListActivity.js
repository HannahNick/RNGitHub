/**
 * Created by nick on 2018/8/22
 */

import React,{Component} from 'react'
import {SwipeableFlatList, TouchableHighlight,Image, StyleSheet, Text, View ,Alert} from "react-native";

var REQUEST_URL =
    "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
export default class SwipeableFlatListActivity extends Component{

    constructor(props){
        super(props);
        this.state={
            loaded:false,
            data:[]
        }

    }

    _keyExtractor = (item, index) => item.id;

    /**
     * 侧滑点击删除时删除item
     * @param item
     */
    deleteItem({item}){
        let {data} = this.state;
        data.splice(data.findIndex(obj=>obj.id===item.id),1);//这个删除方法很不错
        this.setState({
            data:data,
        })
    }

    genQuickActions(data){
        return <View style={styles.quickContainer}>
            <TouchableHighlight style={styles.quick} onPress={()=>this.deleteItem(data)}>
                <View >
                    <Text >删除</Text>
                </View>
            </TouchableHighlight>
        </View>
    }


    render(){
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <SwipeableFlatList
                data={this.state.data}
                renderItem={(data)=>this.renderMovie(data)}
                style={styles.list}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={this._separator}
                //以下是该列表特有属性
                renderQuickActions={(data)=>this.genQuickActions(data)}//渲染侧滑的样式
                maxSwipeDistance={100}//最大策划距离
            />
        )
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    data: this.state.data.concat(responseData.movies),
                    loaded: true
                });
            });
    }

    renderMovie({item}){
        return (
            <View style={styles.tabContainer}>
                <Image
                    source={{ uri: item.posters.thumbnail }}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.year}>{item.year}</Text>
                </View>
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

    }
});