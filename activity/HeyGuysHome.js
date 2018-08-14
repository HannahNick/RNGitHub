/**
 * Created by nick on 2018/8/8
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, Alert, View, Text, Image, VirtualizedList, ListView, Platform} from 'react-native';
import ScrollableTabView,{ScrollableTabBar,DefaultTabBar} from "react-native-scrollable-tab-view";
import CustomTabBar from "./common/CustomTabBar";
import TofuComponent from "./common/TofuComponent";
import HeyGuysRecommendComponent from "./common/HeyGuysRecommendComponent";
import LauncherComponent from "./common/LauncherComponent";
import NewGoodsComponent from "./common/NewGoodsComponent";

const REQUEST_URL = "https://shop.ap-ec.cn/CMS-COMPONENTSETTING-SERVICE/cmsComponentValue/getSettingByFileId.apec2";

export default class HeyGuysHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: [],
        };
    }

    componentDidMount() {
        this.doPost(REQUEST_URL);
    }

    doPost(url) {
        const params = {viewType: 2, tempFileId: 1};
        fetch(url, {
            method: 'POST',
            headers: {//要求服务器返回的结果是json格式的
                'Content-Type': 'application/x-www-form-urlencoded',
                'source-type': Platform.OS === 'ios'?'ios':'android',
                'role-type': 'cs',
            },
            body: JSON.stringify(params),
        }).then(response => response.json())
            .then(result => {
                const data = result.data;
                let szCity = [];
                for (let i = 0; i <data.length ; i++) {
                    const content = data[i];
                    const type = content.componentType;
                    if (content.cityId==="100"){
                        if (type === "7_2") {
                            szCity.push(content);
                        }else if (type ==="7_3"){
                            szCity.push(content);
                        } else if (type === "6") {
                            szCity.push(content);
                        } else if (type === "4_1") {
                            szCity.push(content);
                        } else if (type === "5") {
                            szCity.push(content);
                        } else if (type ==="8"){
                            szCity.push(content);
                        }
                    }
                }
                this.setState({
                    data: this.state.data.concat(szCity),
                    loaded: true
                });
            }).catch(error => {
            Alert.alert(error);
        });
    }

    /**
     * 豆腐块样式
     * @returns {*}
     * @param data
     * @param size
     */
    getTofuType(data,size) {
        return <TofuComponent data={data} tofuNum={size}/>;
    }

    /**
     * 入口样式
     * @param data
     * @returns {*}
     */
    getLauncherType(data) {
        return <LauncherComponent data={data}/>
    }

    /**
     * 新品上市
     * @param data
     * @returns {*}
     */
    getNewGoodsType(data) {
        return <NewGoodsComponent data={data}/>
    }

    /**
     * 超级品牌日
     * @param data
     * @returns {*}
     */
    getBrandDayType(data) {
        const rows = data[0].goods.rows;
        const topImg = data[0].imgUrl;
        return (
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
     * 获取好伙计精选相关
     * @param data
     * @returns {*}
     */
    getHeyGuysRecommendType(data){
        return <HeyGuysRecommendComponent data={data}/>
    }

    /**
     * 渲染主列表Item
     * @param item
     * @returns {*}
     */
    renderItemView({item}) {
        const type = item.componentType;
        if (type === "7_2") {
            return this.getTofuType(item.groups,3);
        }else if (type==="7_3"){
            return this.getTofuType(item.groups,4);
        } else if (type === "6") {
            return this.getLauncherType(item.groups);
        } else if (type === "4_1") {
            return this.getNewGoodsType(item.groups);
        } else if (type === "5") {
            return this.getBrandDayType(item.groups);
        } else if (type ==="8"){
            return this.getHeyGuysRecommendType(item.groups);
        }
        return null;
    }

    /**
     * loading提示
     * @returns {*}
     */
    renderLoadingView() {
        return (
            <View style={styles.loading}>
                <Text>Loading....</Text>
            </View>
        )
    }

    /**
     * 分割线
     * @returns {*}
     * @private
     */
    _separator = () => {
        return <View style={{height: 4}}/>;
    };

    /**
     * 为每个item添加id
     * @param item
     * @param index
     * @returns {*}
     * @private
     */
    _keyExtractor = (item, index) => index.toString();


    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <FlatList
                data={this.state.data}
                renderItem={(data) => this.renderItemView(data)}
                style={styles.list}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                // ItemSeparatorComponent={this._separator}
            />

        )
    }

}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor:'white'
    },
    loading:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
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
    }

});