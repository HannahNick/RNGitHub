/**
 * Created by nick on 2018/9/3
 */
import React,{Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";

export default class TabSelectComponent extends Component{

    constructor(props){
        super(props);
        this.tablistArray=[];//保存每个Tab对应列表数据的数组
        this.tablistHeightArray=[];//保存每个Tab组件高度
        this.listDataCallBackListener = this.props.listDataCallBackListener;
    }

    render(){
        const data = this.props.data;
        let items = [];
        for (let i = 0; i < data.length; i++) {
            const dataBean = data[i];
            const goodsData=dataBean.goods.rows;
            if (goodsData.length % 2 !== 0) {
                goodsData.push(goodsData[goodsData.length-1]);
            }
            const listHeight = 214*goodsData.length/2;
            this.tablistHeightArray.push(listHeight);
            this.tablistArray.push(goodsData);
            items.push(<Text key={i} tabLabel={dataBean.poolName} style={{height:1}}/>);
        }
        //这个和android的TabLayou很像

        return data.length>0?<ScrollableTabView
            onChangeTab={obj=>{//Tab点击位置回调
                const tabGoodsData=this.tablistArray[obj.i];
                const tabHeight = this.tablistHeightArray[obj.i];
                this.listDataCallBackListener(tabGoodsData,tabHeight);//将点击对应位置的数据回调到外部
            }
            }
            initialPage={0}
            tabBarBackgroundColor='white'
            //未选中状态的tab文字颜色
            tabBarInactiveTextColor="gray"
            //选中状态的tab文字颜色
            tabBarActiveTextColor="black"
            tabBarUnderlineStyle={{backgroundColor:'#FF9224',height:2}}
            //这里要注意导包，和ScrollableTabView一起使用的
            renderTabBar={()=><ScrollableTabBar/>}
        >
            {items}
        </ScrollableTabView>:null;
    }


}

const styles = StyleSheet.create({


});