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
import MainActivity from "./activity/MainActivity";

export default class App extends Component<props> {

    state={
      mIntent: this.props.navigation
    };

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const {navigate} = this.props.navigation;
        setTimeout(()=>{
           navigate("PhoneLoginActivity");
        },2000);
    }

    render() {
        // const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
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
                <Image
                    style={{flex:1,alignItems:'center',justifyContent:'center'}}
                    resizeMode='contain'
                    source={require('./res/images/launcher_back_ground.png')}/>
                {/*<Text*/}
                    {/*style={{backgroundColor:'skyblue'}}*/}
                    {/*onPress={()=>{*/}
                    {/*navigate("FirstActivity",{word:"APP传来了一个参数"});*/}
                {/*}}>跳转到第一个页面</Text>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: '#fff',
        alignItems:'center',
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

