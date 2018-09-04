/**
 * Created by nick on 2018/8/8
 */
import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    Alert,
    View,
    Text,
    Image,
    VirtualizedList,
    ListView,
    Platform,
    RefreshControl,
    SafeAreaView
} from 'react-native';
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
import CustomPlaceholder from "./common/CustomPlaceholder";
import TabSelectComponent from "./common/TabSelectComponent";

const REQUEST_URL = "https://shop.ap-ec.cn/CMS-COMPONENTSETTING-SERVICE/cmsComponentValue/getSettingByFileId.apec2";

export default class HeyGuysHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: [],
            isLoading: false,
            showTabTitle: false,
            hasStickyTab: false,
            stickTabIndex: 0,
        };
        this.tabData = [];
        this.httpManager = new HttpManager(this.dataCallBack);
    }

    dataCallBack = (success, result) => {
        if (success) {
            const data = result.data;
            let szCity = [];
            let stickTabIndex = -1;
            let hasStickyTab = false;//是否有吸顶组件
            for (let i = 0; i < data.length; i++) {
                const content = data[i];
                if (content.cityId === "100") {
                    const type = content.componentType;
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
                        const newContent = {...content,componentType:"8_1"};
                        szCity.push(newContent);
                        hasStickyTab = true;
                        stickTabIndex = i;
                    } else if (type === "3") {
                        szCity.push(content);
                    } else if (type === "2") {
                        szCity.push(content);
                    }
                }
            }
            this.setState({
                data: [].concat(szCity),
                hasStickyTab: hasStickyTab,
                stickTabIndex: szCity.length-2,
            });
        } else {
            Alert.alert(result.data);
        }
        this.setState({
            loaded: true,
        })
    };

    componentDidMount() {
        // this.doPost(REQUEST_URL);
        this.httpManager.getHomeData(REQUEST_URL);
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
                            szCity.push(content);
                        }
                    }
                }
                this.tabData = [].concat(szCity);
                this.setState({
                    data: [].concat(szCity),
                    loaded: true,
                });
            }).catch(error => {
            Alert.alert(error);
        }).finally(() => {
            this.setState({
                isLoading: false,
            });
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
        return (<HeyGuysRecommendComponent data={data} ref={(ref) => this.list = ref}/>)
    }

    /**
     * 吸顶Tab
     * @param data
     * @returns {*}
     */
    getTabLayout(data) {
        return (<TabSelectComponent data={data} listDataCallBackListener={this.changeListData}/>)
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
    getHomeBanner(data) {
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
            return this.getTabLayout(item.groups);
        } else if (type === "8_1") {
            return this.getHeyGuysRecommendType(item.groups);
        } else if (type === "3") {
            return this.getNews(item.groups);
        } else if (type === "2") {
            return this.getHomeBanner(item.groups);
        }
        return null;
    }

    /**
     * 首次进入loading提示
     * @returns {*}
     */
    renderLoadingView() {
        return (
            <View style={styles.contain}>
                <CustomPlaceholder onReady={this.state.loaded} bgColor="red" animate="fade">

                </CustomPlaceholder>
            </View>
        )
    }

    /**
     * 点击顶部Tab切换数据
     * @param tabGoodsData
     * @param tabHeight
     */
    changeListData = (tabGoodsData, tabHeight) => {
        this.parentList.scrollToIndex({viewPosition:0,index:this.state.stickTabIndex});
        this.list.changeData(tabGoodsData, tabHeight);
    };

    /**
     * 下拉刷新
     */
    loadData() {
        this.setState({
            isLoading: true,
        });
        this.doPost(REQUEST_URL);
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
                ref={ref=>this.parentList=ref}
                renderItem={(data) => this.renderItemView(data)}
                style={styles.list}
                keyExtractor={this._keyExtractor}
                stickyHeaderIndices={this.state.hasStickyTab?[this.state.stickTabIndex]:[100]}
                showsVerticalScrollIndicator={false}
                refreshControl={//自定义刷新组件
                    <RefreshControl
                        title={'loading'}
                        colors={['red', 'green', 'blue']}
                        refreshing={this.state.isLoading}//刷新状态标志
                        onRefresh={() => {
                            //刷新调用的方法
                            this.loadData();
                        }}
                        tintColor={'orange'}//ios菊花颜色
                        titleColor={'red'}//ios文本颜色
                    />
                }
                // ItemSeparatorComponent={this._separator}
            />
        )
    }

}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    tabLayout: {
        height: 50,
        position: 'absolute'
    },

});