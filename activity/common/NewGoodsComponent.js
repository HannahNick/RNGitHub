/**
 * Created by nick on 2018/8/14
 */

import React,{Component} from 'react';
import {StyleSheet,Image, Text, View} from "react-native";


export default class NewGoodsComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const data = this.props.data;
        const goodsInfo = data[0].goods.rows[0];
        const topImg = data[0].imgUrl;
        return(
            <View>
                {topImg ? <Image style={styles.topImg} source={{uri: topImg}}/> : null}
                {goodsInfo ? <View style={styles.newsGoodContainer}>
                    <Image style={styles.newsGoodImg} source={{uri: goodsInfo.skuImage}}/>
                    <View style={styles.newsGoodIntroduce}>
                        <Text style={styles.newsGoodTitle} numberOfLines={1}>{goodsInfo.goodsName}</Text>
                        <Text style={styles.newsGoodDescription}>{goodsInfo.goodsDescrition}</Text>
                        <View style={styles.newsGoodPrice}>
                            <Text style={{color:'black',fontSize:13}}>促销价</Text>
                            <Text style={{color:'red',fontSize:13}}>¥{goodsInfo.price}</Text>
                        </View>
                    </View>

                </View> : null}
                <View style={{height: 4,backgroundColor:'#F0F0F0'}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //新品上市
    newsGoodContainer: {
        height: 190,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    newsGoodImg: {
        width: 180,
        height: 170,
        resizeMode: 'contain',
    },
    newsGoodIntroduce: {
        flex: 1,
        alignSelf: 'stretch'

    },
    newsGoodTitle: {
        fontSize: 15,
        color: 'black',
        marginTop: 15,
        marginLeft: 10,
    },
    newsGoodDescription: {
        fontSize: 11,
        marginTop: 5,
        marginLeft: 10,
    },
    newsGoodPrice:{
        flexDirection:'row',
        marginTop:5,
        marginLeft:10,
    },
});