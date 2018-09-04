/**
 * Created by nick on 2018/8/14
 */

import React,{Component} from 'react';
import {StyleSheet, FlatList, View, Text, Image} from "react-native";
import ScrollableTabView,{ScrollableTabBar} from "react-native-scrollable-tab-view";

export default class HeyGuysRecommendComponent extends Component{

    constructor(props){
        super(props);
        this.tablistArray=this.props.data;//每个Tab对应列表的数据
        const goodsData = this.tablistArray[0].goods.rows;
        if (goodsData.length % 2 !== 0) {
            goodsData.push(goodsData[goodsData.length-1]);
        }
        const listHeight = 214*goodsData.length/2;
        this.state = {
            tabListData:goodsData,//保存每个Tab的列表数据
            tabListHeight:listHeight,//保存每个Tab的列表高度
        };
    }

    renderHeyGuysRecommendItem({item}){
        const url = item.skuImage;
        const goodsName = item.goodsName;
        const des = item.skuName;
        const price = item.price;
        return(
            <View style={styles.heyguysItemContainer}>
                <Image style={styles.heyguysImg} source={{uri:url}}/>
                <Text style={styles.heyguysGoodsName} numberOfLines={1}>{goodsName}</Text>
                <Text style={styles.heyguysGoodsDes} numberOfLines={1}>{des}</Text>
                <Text style={styles.heyguysGoodsPrice}>¥{price}</Text>
            </View>
        )
    }

    changeData(tabGoodsData,tabListHeight){
        this.setState({
            tabListData:[].concat(tabGoodsData),
            tabListHeight:tabListHeight
        });
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
        // const data = this.props.data;
        // let items = [];
        // for (let i = 0; i < data.length; i++) {
        //     const dataBean = data[i];
        //     const goodsData=dataBean.goods.rows;
        //     if (goodsData.length % 2 !== 0) {
        //         goodsData.push(goodsData[goodsData.length-1]);
        //     }
        //     const listHeight = 214*goodsData.length/2+50;
        //     this.tablistHeightArray.push(listHeight);
        //     this.tablistArray.push(goodsData);
        //     items.push(<Text key={i} tabLabel={dataBean.poolName} style={{height:1}}/>);
        //     if (i === 0) {
        //         this.tabListTopImage = dataBean.imgUrl;
        //     }
        // }
        // //这个和android的TabLayou很像
        // let content = data.length>0?<ScrollableTabView
        //     onChangeTab={obj=>{
        //         const tabGoodsData=this.tablistArray[obj.i];
        //         const tabHeight = this.tablistHeightArray[obj.i];
        //
        //     }
        //     }
        //     initialPage={0}
        //     tabBarBackgroundColor='white'
        //     //未选中状态的tab文字颜色
        //     tabBarInactiveTextColor="gray"
        //     //选中状态的tab文字颜色
        //     tabBarActiveTextColor="black"
        //     tabBarUnderlineStyle={{backgroundColor:'#FF9224',height:2}}
        //     //这里要注意导包，和ScrollableTabView一起使用的
        //     renderTabBar={()=><ScrollableTabBar/>}
        // >
        //     {items}
        // </ScrollableTabView>:null;
        return(
            <View style={{backgroundColor:'white',height:this.state.tabListHeight}}>
                {/*{this.tabListTopImage ? <Image style={styles.topImg} source={{uri: this.tabListTopImage}}/> : null}*/}
                {/*{content}*/}
                <FlatList
                    ref={ref=>this.list=ref}
                    data={this.state.tabListData}
                    renderItem={data=>this.renderHeyGuysRecommendItem(data)}
                    keyExtractor={this._keyExtractor}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
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
    //好伙计精选
    heyguysItemContainer:{
        height:210,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#F0F0F0',
        flex:1,
        margin:2,
    },
    heyguysImg:{
        width:180,
        height:150,
        resizeMode:'contain',
        alignSelf:'center'
    },
    heyguysGoodsName:{
        fontSize:14,
        color:'black',
    },
    heyguysGoodsDes:{
        fontSize:11,
    },
    heyguysGoodsPrice:{
        fontSize:14,
        color:'red',
    },
});