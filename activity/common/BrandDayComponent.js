/**
 * Created by nick on 2018/8/15
 */

import React,{Component} from 'react';
import {StyleSheet, FlatList, Image, View, Text} from "react-native";

export default class BrandDayComponent extends Component{

    constructor(props){
        super(props);
    }

    /**
     * 超级品牌日商品
     * @param item
     * @returns {*}
     */
    getBrandDayItem({item}) {

        return (
            <View style={styles.brandDayItem}>
                <Image style={styles.brandDayGoodsImage} source={{uri: item.skuImage}}/>
                <Text style={styles.brandDayGoodsTitle} numberOfLines={1}>{item.goodsName}</Text>
                <Text style={styles.brandDayGoodsDescription} numberOfLines={1}>{item.skuName}</Text>
                <Text style={styles.brandDayGoodsPrice}>¥{item.price}</Text>
            </View>
        )
    }

    /**
     * 为每个item添加id
     * @param item
     * @param index
     * @returns {*}
     * @private
     */
    _keyExtractor = (item, index) => index.toString();

    render(){
        const data = this.props.data;
        const rows = data[0].goods.rows;
        const topImg = data[0].imgUrl;
        return(
            <View>
                {topImg ? <Image style={styles.topImg} source={{uri: topImg}}/> : null}
                <FlatList
                    data={rows}
                    renderItem={this.getBrandDayItem}
                    style={styles.brandList}
                    horizontal={true}
                    keyExtractor={this._keyExtractor}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )

    }



}

const styles = StyleSheet.create({
    //楼层顶部图
    topImg: {
        height: 60,
        resizeMode: 'stretch',
    },
    //超级品牌日
    brandList: {
        height: 175,
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,

    },
    brandDayItem: {
        width: 110,
        height: 160,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#F0F0F0',
        marginRight: 5
    },
    brandDayGoodsImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    brandDayGoodsTitle: {
        fontSize: 14,
        color: 'black',
    },
    brandDayGoodsDescription: {
        fontSize: 11,
    },
    brandDayGoodsPrice: {
        fontSize: 14,
        color: 'red',
    },
});