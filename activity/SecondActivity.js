import {Component} from 'react'
import React from "react";
import {Text, View,StyleSheet} from "react-native";
import NavigationBar from "../NavigationBar";

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
            <Text style={styles.textType1}>这里是Text1</Text>
            <Text style={styles.textType2}>这里是Text2</Text>
            <Text style={styles.textType3}>这里是Text3</Text>
            {/*<NavigationBar title='第二个页面'/>*/}
        </View>)
    }

}

const styles = StyleSheet.create({
    contain: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        borderWidth:1,
        borderColor:'gray',
    },
    fontType: {
        fontSize: 20,
        color: 'red'
    },
    textType1:{
        //他的相对布局不是相对于父容器，而是相对于兄弟节点。
        backgroundColor:'steelblue',

    },
    textType2:{
        flex:1,
        backgroundColor:'skyblue',
    },
    textType3:{
        width:100,
        backgroundColor:'powderblue',
    },

});