/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {Navigator} from 'react-native-deprecated-custom-components';
import {StackNavigator} from 'react-navigation';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Boy from "./Boy";
import FirstActivity from "./activity/FirstActivity";
import SecondActivity from "./activity/SecondActivity";

export default class App extends Component<props> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        }

    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                {/*<TabNavigator hidesTabTouch={true}>
                    <TabNavigator.Item
                        tabStyle={styles.bottomMenu}
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Image style={styles.fragmentIcon} source={require('./res/images/home_def.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.fragmentIcon} source={require('./res/images/home_sel.png')}/>}
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <View style={styles.fragmentContain}>
                            <Text>首页</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'classification'}
                        renderIcon={() => <Image style={styles.fragmentIcon} source={require('./res/images/classification_def.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.fragmentIcon} source={require('./res/images/classification_sel.png')}/>}
                        onPress={() => this.setState({selectedTab: 'classification'})}>
                        <View style={styles.fragmentContain}>
                            <Text>分类</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'shopping'}
                        renderIcon={() => <Image style={styles.fragmentIcon} source={require('./res/images/Shopping_def.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.fragmentIcon} source={require('./res/images/Shopping_sel.png')}/>}
                        onPress={() => this.setState({selectedTab: 'shopping'})}>
                        <View style={styles.fragmentContain}>
                            <Text>购物车</Text>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'me'}
                        renderIcon={() => <Image style={styles.fragmentIcon} source={require('./res/images/my_def.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.fragmentIcon} source={require('./res/images/my_sel.png')}/>}
                        onPress={() => this.setState({selectedTab: 'me'})}>
                        <View style={styles.fragmentContain}>
                            <Text>我的</Text>
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>*/}
                {/*<Navigator
                    //1.先导入navigator组件
                    //2.初始化路由
                    //3.
                    initialRoute={{
                        component: Boy,//指定默认显示的界面
                    }}
                    //每一个页面被渲染的时候会回调这个函数,这是页面跳转的配置
                    renderScene={(route,navigator)=>{
                        let Component = route.component;//将navigator传到下级页面
                        return <Component navigator={navigator} {...route.params}/>
                    }}
                />*/}
                {/*<Navigator
                    initialRoute={{
                        component:FirstActivity,
                    }}
                    renderScene={(route,navigator)=>{
                        let Component=route.component;
                        return <Component navigator={navigator} {...route.params}/>
                    }}

                />*/}
                <Text onPress={()=>{
                    navigate("FirstActivity",{word:"APP传来了一个参数"})
                }}>跳转到第一个页面</Text>
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
        justifyContent:'center',
        flexWrap:'wrap',
        alignItems:'center',
    },
    bottomMenu:{
        paddingTop:20,
    },
    fragmentIcon:{
        width:40,
        height:30,
        marginTop:10,
        resizeMode:'contain',
    }
});

