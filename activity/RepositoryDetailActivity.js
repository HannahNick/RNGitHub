/**
 * Created by nick on 2018/7/23
 */

import React, {Component} from 'react';
import {WebView, View, StyleSheet, Text, TextInput,DeviceEventEmitter} from 'react-native';
import NavigationBar from "../NavigationBar";
import ViewUtil from "../js/utils/ViewUtil";
// import BackPressComponent from "../js/common/BackPressComponent";

export default class RepositoryDetailActivity extends Component {
    constructor(props) {
        super(props);
        // this.backPress = new BackPressComponent({backPress:(e)=>this.onBackPress(e)});
        const data=this.props.navigation.state.params.item;
        this.state = {
            url: data.html_url,
            title:data.full_name,
            canGoBack:false,
        }
    }

    componentDidMount() {
        // this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        // this.backPress.componentWillUnmount();
    }

    onBackPress(e){
        this.goBack();
        return true;
    }

    /**
     * 返回到上级页面
     */
    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else {
            this.props.navigation.goBack();
        }
    }



    onNavigationStateChange(e){
        this.setState({
            canGoBack:e.canGoBack,
        })
    }

    render() {
        return (
            <View style={styles.tabContainer}>
                <NavigationBar title={this.state.title} leftButton={ViewUtil.getLeftButton(()=>{this.goBack()})}/>
                <WebView
                    ref={webView=>this.webView=webView}
                    source={{uri: this.state.url}}
                     //页面加载完毕的回调方法
                    onNavigationStateChange={(e)=>{this.onNavigationStateChange(e)}}
                    style={{flex:1}}
                    startInLoadingState={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
    },
    searchContain: {
        flexDirection:'row',
        alignItems:'center',
        margin:10,
    },
    input:{
        height:40,
        borderWidth:1,
        flex:1,
        marginLeft:5,
    }
});