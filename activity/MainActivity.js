import {Component} from 'react'
import TabNavigator from "react-native-tab-navigator";
import {Image, StyleSheet, Text, View,DeviceEventEmitter} from "react-native";
import React from "react";
import PopularFragment from './fragment/PopularFragment';
import MeFragment from './fragment/MeFragment';
import Toast,{DURATION} from "react-native-easy-toast";
import RepositoryDetailActivity from "./RepositoryDetailActivity";

export default class MainActivity extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
        }
    }

    componentDidMount() {
        //这个东西有点类似广播接收者
        this.listener=DeviceEventEmitter.addListener("showToast",(text)=>{
            this.toast.show(text,DURATION.LENGTH_SHORT);
        });
    }

    componentWillUnmount() {
        this.listener&&this.listener.remove();
    }

    render(){
        return (
            <View style={styles.container}>
                <TabNavigator hidesTabTouch={true}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Image style={styles.fragmentIcon} source={require('../res/images/home_def.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.fragmentIcon} source={require('../res/images/home_sel.png')}/>}
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <View style={styles.fragmentContain}>
                            <PopularFragment {...this.props}/>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'classification'}
                        renderIcon={() => <Image style={styles.fragmentIcon} source={require('../res/images/classification_def.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.fragmentIcon} source={require('../res/images/classification_sel.png')}/>}
                        onPress={() => this.setState({selectedTab: 'classification'})}>
                        <View style={styles.fragmentContain}>
                            <Text>分类</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'shopping'}
                        renderIcon={() => <Image style={styles.fragmentIcon} source={require('../res/images/Shopping_def.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.fragmentIcon} source={require('../res/images/Shopping_sel.png')}/>}
                        onPress={() => this.setState({selectedTab: 'shopping'})}>
                        <RepositoryDetailActivity/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'me'}
                        renderIcon={() => <Image style={styles.fragmentIcon} source={require('../res/images/my_def.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.fragmentIcon} source={require('../res/images/my_sel.png')}/>}
                        onPress={() => this.setState({selectedTab: 'me'})}>
                        <MeFragment {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
                <Toast ref={toast=>this.toast=toast}/>
            </View>
            );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    fragmentContain: {
        flex:1,
    },
    fragmentIcon:{
        width:40,
        height:30,
        marginTop:10,
        resizeMode:'contain',
    }
});