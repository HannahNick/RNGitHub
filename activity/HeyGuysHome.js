/**
 * Created by nick on 2018/8/8
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, Alert, View, Text, Image, VirtualizedList, ListView, Platform} from 'react-native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from "react-native-scrollable-tab-view";
import CustomTabBar from "./common/CustomTabBar";
import TofuComponent from "./common/TofuComponent";
import HeyGuysRecommendComponent from "./common/HeyGuysRecommendComponent";
import LauncherComponent from "./common/LauncherComponent";
import NewGoodsComponent from "./common/NewGoodsComponent";
import HttpManager from "./manager/HttpManager";
import BrandDayComponent from "./common/BrandDayComponent";
import News from "./common/News";
import HomeBanner from "./common/HomeBanner";

const REQUEST_URL = "https://shop.ap-ec.cn/CMS-COMPONENTSETTING-SERVICE/cmsComponentValue/getSettingByFileId.apec2";

export default class HeyGuysHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: [],
        };
        this.httpManager = new HttpManager();
    }

    componentDidMount() {
        this.doPost(REQUEST_URL);
    }

    doPost(url) {
        const params = {viewType: 2, tempFileId: 1};
        this.httpManager.doRequest(url, params)
            .then(result => {
                const data = result.data;
                let szCity = [];
                for (let i = 0; i < data.length; i++) {
                    const content = data[i];
                    const type = content.componentType;
                    if (content.cityId === "100") {
                        if (type === "7_2") {
                            szCity.push(content);
                        } else if (type === "7_3") {
                            szCity.push(content);
                        } else if (type === "6") {
                            szCity.push(content);
                        } else if (type === "4_1") {
                            szCity.push(content);
                        } else if (type === "5") {
                            szCity.push(content);
                        } else if (type === "8") {
                            szCity.push(content);
                        } else if (type === "3") {
                            szCity.push(content);
                        } else if (type === "2") {
                            szCity.push(content)
                        }
                    }
                }
                this.setState({
                    data: [].concat(szCity),
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
    getTofuType(data, size) {
        return (<TofuComponent data={data} tofuNum={size}/>);
    }

    /**
     * 入口样式
     * @param data
     * @returns {*}
     */
    getLauncherType(data) {
        return (<LauncherComponent data={data}/>)
    }

    /**
     * 新品上市
     * @param data
     * @returns {*}
     */
    getNewGoodsType(data) {
        return (<NewGoodsComponent data={data}/>)
    }

    /**
     * 超级品牌日
     * @param data
     * @returns {*}
     */
    getBrandDayType(data) {
        return (<BrandDayComponent data={data}/>)
    }

    /**
     * 获取好伙计精选相关
     * @param data
     * @returns {*}
     */
    getHeyGuysRecommendType(data) {
        return (<HeyGuysRecommendComponent data={data}/>)
    }

    /**
     * 获取新闻轮播
     * @param data
     */
    getNews(data) {
        return (<News data={data}/>)
    }

    /**
     * 获取轮播图
     * @param data
     * @returns {*}
     */
    getHomeBanner(data){
        return (<HomeBanner data={data}/>)
    }

    /**
     * 渲染主列表Item
     * @param item
     * @returns {*}
     */
    renderItemView({item}) {
        const type = item.componentType;
        if (type === "7_2") {
            return this.getTofuType(item.groups, 3);
        } else if (type === "7_3") {
            return this.getTofuType(item.groups, 4);
        } else if (type === "6") {
            return this.getLauncherType(item.groups);
        } else if (type === "4_1") {
            return this.getNewGoodsType(item.groups);
        } else if (type === "5") {
            return this.getBrandDayType(item.groups);
        } else if (type === "8") {
            return this.getHeyGuysRecommendType(item.groups);
        } else if (type === "3") {
            return this.getNews(item.groups);
        } else if (type === "2") {
            return this.getHomeBanner(item.groups);
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

    onClickListener = () => {

    };

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
        backgroundColor: 'white'
    },
    loading: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },


});