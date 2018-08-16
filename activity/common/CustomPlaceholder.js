/**
 * Created by nick on 2018/8/16
 */
import React from 'react';
import { View,Text } from 'react-native';
import Placeholder from 'rn-placeholder';

const customPlaceholder = props => {
    const style = { backgroundColor: props.bgColor };
    return (
        <Text style={style}>
            中农小易 = {props.bgColor}
        </Text>
    );
};

export default Placeholder.connect(customPlaceholder);