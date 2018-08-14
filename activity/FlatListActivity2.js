/**
 * Created by nick on 2018/8/8
 */

import React,{Component} from 'react'
import {FlatList, Image, StyleSheet, Text, View} from "react-native";

var REQUEST_URL =
    "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
export default class FlatListActivity2 extends Component{

    constructor(props){
        super(props);
        this.state={
            loaded:false,
            data:[]
        }

    }

    _keyExtractor = (item, index) => item.id;

    render(){
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <FlatList
                data={this.state.data}
                renderItem={(data)=>this.renderMovie(data)}
                style={styles.list}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={this._separator}
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
        width: 53,
        height: 81
    },
    list: {
        paddingTop: 20,
        backgroundColor: "#F5FCFF"
    }
});