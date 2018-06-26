import {Component} from 'react'
import React from "react";
import {Text, View,StyleSheet} from "react-native";

export default class SecondActivity extends Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        return (<View style={styles.contain}>
            <Text style={styles.fontType}>{this.props.word}</Text>
            <Text style={styles.fontType}
                  onPress={()=>{
                        this.props.navigation.goBack();
                  }}
            >返回上级页面</Text>
        </View>)
    }

}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: 'center',
    },
    fontType: {
        fontSize: 20,
        color: 'red'
    }
});