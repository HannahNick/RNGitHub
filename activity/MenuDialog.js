/**
 * Created by nick on 2018/8/28
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Modal, TouchableOpacity, Image, DeviceInfo, View, Text} from 'react-native';

export default class MenuDialog extends Component {
    state = {
        visible: false
    };

    show() {
        this.setState({
            visible: true
        })
    }

    dismiss() {
        this.setState({
            visible: false
        })
    }

    onRequestClose() {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <Modal
                transparent={true} //是否透明
                animationType={"fade"} //显示动画
                visible={this.state.visible} //是否弹出
                onRequestClose={() => this.onRequestClose()}//Android必须实现 硬件返回时的操作
            >
                <TouchableOpacity style={{flex:1}} onPress={()=>this.setState({visible:false})}>
                    <View style={styles.container}>
                        <Image
                            source={require('../res/images/arrow_top.png')}
                            fadeDuration={0}
                            style={styles.arrow}
                        />
                        <View style={styles.content}>
                            {/* 关闭页面 */}
                            <TouchableOpacity
                                onPress={() => {
                                    {
                                        this.setState({
                                            visible: false
                                        })
                                    }
                                }}
                            >
                                <Text>关闭页面</Text>
                            </TouchableOpacity>
                            {/* 返回按钮 */}
                            <TouchableOpacity
                                onPress={() => {

                                }}
                            >
                                <Text>返回</Text>
                            </TouchableOpacity>

                            {/* 模态跳转 */}
                            <TouchableOpacity
                                onPress={() => {}}
                            >
                                <Text>模态跳转</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.6)',//黑色带有透明度的背景
        alignItems: 'flex-start'
    },
    arrow: {
        marginTop: 100 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        height: 6,
        marginLeft: 18,
        resizeMode: 'contain'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        paddingRight: 15
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    },
    content:{
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginLeft: 3
    }
});

MenuDialog.propTypes = {
    theme: PropTypes.object,
    onClose: PropTypes.func,
};
MenuDialog.defaultProps = {
    menus: []
};