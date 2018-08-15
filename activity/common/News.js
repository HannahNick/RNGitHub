import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import Carousel from 'react-native-snap-carousel'


export default class News extends React.Component {

    render() {
        const { data } = this.props;
        return (
            <View style={styles.newsContainner}>
                <Text style={styles.leftText}>商城快报</Text>
                <VCarousel data={data} />
                <View style={styles.seprator}/>
                <Text style={styles.rightText}>更多</Text>
            </View>
        )
    }
}

class VCarousel extends React.Component {

    renderItem = ({item, index}) => {
        console.log(`VCarousel: ${JSON.stringify(item)} `);
        return (
            <View style={styles.viewWrap} key={index}>
                <Text style={styles.text} numberOfLines={1}>{item.noticeDetailTitle}</Text>
            </View>
        )
    };

    render () {
        const { data } = this.props;
        console.log(`VCarousel data: ${JSON.stringify(data)} `);
        return (
            <View style={{flex: 1}}>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    vertical={true}
                    data={data}
                    renderItem={this.renderItem}
                    sliderHeight={44}
                    itemHeight={44}
                    itemWidth={100}
                    sliderWidth={100}
                    enableSnap={true}
                    lockScrollWhileSnapping={true}
                    loop={true}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={2000}
                    useScrollView={true}
                    loopClonesPerSide={3}
                />
            </View>
        )
    }
}

class VBanner extends React.Component {

    renderItem = (item, index) => {
        return (
            <View style={styles.viewWrap} key={index}>
                <Text style={styles.text} >{item.noticeDetailTitle}</Text>
            </View>
        )
    };

    render() {

        const { data } = this.props;
        const elements = data.item.groups.map((element, index) => this.renderItem(element, index));
        return (
            <View style={styles.container}>
                <Swiper
                    style={styles.swiperWrapper}
                    height={44}
                    horizontal={false}
                    autoplay
                    loop
                    showsPagination={false}>
                    { elements }
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    swiperWrapper: {
        // transform:[{rotate: "90deg"}]
    },
    viewWrap: {
        // height: 44,
        // width: 100,
        flex: 1,
        justifyContent: 'center',
        // transform:[{rotate: "-90deg"}]
    },
    text: {
        color: 'rgb(102,102,102)',
        fontSize: 14,
    },
    container: {
        flex: 1,
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
        width:80,
        textAlign:'center',
        fontStyle:'italic'
    },
    rightText: {
        fontSize: 14,
        backgroundColor: 'white',
        padding: 8,
        color: 'rgb(102,102,102)',
    }
});