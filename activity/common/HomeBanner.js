/**
 * Created by nick on 2018/8/15
 */
import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Swiper from 'react-native-swiper'


export default class HomeBanner extends React.Component {


    renderItem = (item, index) => {
        return (
            <View style={styles.viewWrap} key={index}>
                <Image
                    resizeMode='stretch'
                    style={styles.image}
                    source={{uri: item.imgUrl}}
                />
            </View>
        )
    };

    render () {
        const { data } = this.props;
        const elements = data.map((element, index) => this.renderItem(element, index));
        console.log(`HomeBanner: ${JSON.stringify(data)}`);
        return (
            <View style={styles.container}>
                <Swiper
                    style={styles.swiperWrapper}
                    height={160}
                    dot={<View style={{backgroundColor: 'white', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                    activeDot={<View style={{backgroundColor: 'yellow', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                    paginationStyle={{
                        bottom: 10
                    }}
                    autoplay
                    loop>
                    { elements }
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    swiperWrapper: {},
    viewWrap: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        height: 160,
        backgroundColor: 'red'
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: 'yellow'
    }
})