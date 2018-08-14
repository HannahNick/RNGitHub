import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../../NavigationBar';
import ListViewComponent from '../common/ListViewComponent';

const URL="https://api.github.com/search/repositories?q=";
const POPULAR_TYPE="&sort=start";
export default class PopularFragment2 extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return( 
            <View style={styles.tabContainer}>
            <NavigationBar title="随便写写" /> 
                <ScrollableTabView
                    tabBarBackgroundColor='#2196F3'
                    tabBarActiveTextColor='white' 
                    tabBarInactiveTextColor='white' 
                    tabBarUnderlineStyle={{backgroundColor:'white',height:2}}
                    renderTabBar={()=><ScrollableTabBar />}
                >
                    <ListViewComponent tabLabel="Java" keyword="Java"/>
                    <ListViewComponent tabLabel="ios" keyword="ios"/>
                    <ListViewComponent tabLabel="android" keyword="android"/>
                    <ListViewComponent tabLabel="javaScript" keyword="javaScript"/>
                    <ListViewComponent tabLabel="python" keyword="python"/>

                </ScrollableTabView>
            </View>
        );

    }
}
const styles = StyleSheet.create({
    tabContainer:{
        flex: 1,
    }
});