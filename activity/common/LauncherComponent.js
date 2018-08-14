/**
 * Created by nick on 2018/8/14
 */

import React,{Component} from 'react';
import {StyleSheet,Image, Text, View} from "react-native";

export default class LauncherComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const data = this.props.data;
        let items = [];
        for (let i = 0; i < data.length; i++) {
            const group = data[i];
            let item = <View style={styles.launcherItem} key={i}>
                <Image source={{uri: group.imgUrl}} style={styles.launcherImage}/>
                <Text style={styles.launcherTitle}>{group.imgTitle}</Text>
            </View>;
            items.push(item);
        }
        return(
            <View style={styles.launcherContainer}>
                {items}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //入口Launcher
    launcherContainer: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    launcherItem: {
        width: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    launcherImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',

    },
    launcherTitle: {
        fontSize: 11
    },
});