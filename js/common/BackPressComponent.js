/**
 * Created by nick on 2018/7/31
 */

import React,{Component} from "react";
import {BackHandler} from "react-native";

export default class BackPressComponent{

    constructor(props){
        this.hardwareBackPress= this.onHardwareBackPress.bind(this);
        this.props = props;
    }

    componentDidMount() {
        if (this.props.backPress){
            BackHandler.addEventListener("hardwareBackPress",this.hardwareBackPress);
        }
    }

    componentWillUnmount() {
        if (this.props.backPress){
            BackHandler.removeEventListener("hardwareBackPress",this.hardwareBackPress);
        }
    }

    onHardwareBackPress(e){
        return this.props.backPress(e);
    }

}