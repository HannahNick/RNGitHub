/**
 * Created by nick on 2018/8/28
 */
import React,{Component} from 'react';
import {Text} from 'react-native';
import {withNavigationFocus} from 'react-navigation';

/**
 * 针对某个组件设定焦点获取
 */
class FocusTest extends Component{

    render(){
        return(
            <Text>{this.props.isFocused?"Focus":"NoFocus"}</Text>
        )
    }
}

export default withNavigationFocus(FocusTest);