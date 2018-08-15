/**
 * Created by nick on 2018/8/15
 */
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Swiper from 'react-native-swiper'


export default class News extends React.Component {

    render() {
        const { data } = this.props;
        return (
            <View style={styles.newsContainner}>
                <Text style={styles.leftText}>行情资讯</Text>
                <VBanner data={data} />
                <View style={styles.seprator}/>
                <Text style={styles.rightText}>更多</Text>
            </View>
        )
    }
}

class VBanner extends React.Component {

    renderItem = (item, index) => {
        return (
            <View style={styles.viewWrap} key={index}>
                <Text style={styles.text} numberOfLines={1}>{item.noticeDetailTitle}</Text>
            </View>
        )
    };

    render() {
        const { data } = this.props;
        const elements = data.map((element, index) => this.renderItem(element, index));
        return (
            <View style={styles.container}>
                <Swiper
                    style={styles.swiperWrapper}
                    height={44}
                    horizontal={false}
                    autoplay={true}
                    showsPagination={false}>
                    { elements }
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    swiperWrapper: {},
    viewWrap: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    text: {
        color: 'rgb(102,102,102)',
        fontSize: 14,
    },

    newsContainner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        backgroundColor: 'white'
    },
    seprator: {
        backgroundColor: 'rgb(232,232,232)',
        width: 1,
        height: 16
    },
    leftText: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'white',
        padding: 8,
        fontStyle: 'italic',
    },
    rightText: {
        fontSize: 14,
        backgroundColor: 'white',
        padding: 8,
        color: 'rgb(102,102,102)',
    }
});