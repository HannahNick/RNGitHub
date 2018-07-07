import {Component} from 'react'
import React from "react";
import {Text, View,StyleSheet,TouchableHighlight,Image,TouchableOpacity} from "react-native";
import NavigationBar from "../NavigationBar";

/**
 * 第二测试页面
 */
export default class SecondActivity extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        return (<View style={styles.contain}>
            {/*<Text style={styles.fontType}>{this.props.word}</Text>*/}
            {/*<Text style={styles.fontType}*/}
                  {/*onPress={()=>{*/}
                        {/*this.props.navigation.goBack();*/}
                  {/*}}*/}
            {/*>返回上级页面</Text>*/}
            {/* <Text style={styles.textType1}>这里是Text1</Text>  */}
            {/* <Text style={styles.textType2}>这里是Text2</Text> */}
            {/* <Text style={styles.textType3}>这里是Text3</Text> */}
            
            <NavigationBar 
                title='SecondActivity' 
                style={{
                    backgroundColor:'#EE6363',
                }} 
                rightButton={
                    <TouchableOpacity onPress={()=>{
                        this.props.navigation.pop();
                    }}> 
                        <Image 
                        style={{width:20,height:20,resizeMode:'contain'}}
                        source={require('../res/images/share.png')} />
                    </TouchableOpacity>
                } 
                leftButton={ 
                    <TouchableHighlight>
                        <Image source={require('../res/images/arrow_back.png')}
                            style={{width:20,height:20,resizeMode:'contain'}}
                        />
                    </TouchableHighlight>
                }
            />
        </View>)
    }

}
 
const styles = StyleSheet.create({
    contain: { 
        flexDirection: 'row', 
        justifyContent: 'flex-start',
    },
    fontType: {
        fontSize: 20,
        color: 'red'
    },
    textType1:{
        //他的相对布局不是相对于父容器，而是相对于兄弟节点。
        backgroundColor:'steelblue',
        flex:1,
    },
    textType2:{
        width:200,
        backgroundColor:'skyblue',
    },
    textType3:{
        backgroundColor:'powderblue',
    },

});