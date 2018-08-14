/**
 * Created by nick on 2018/8/7
 */

import React, {Component} from 'react';
import {FlatList, Text, View, StyleSheet, RefreshControl, ActivityIndicator} from "react-native";

const data = {
    "result": [
        {
            "name": "王大锤",
            "age": 19,
        },
        {
            "name": "王尼玛",
            "age": 21,
        },
        {
            "name": "王尼美",
            "age": 25,
        },
        {
            "name": "张全蛋",
            "age": 22,
        },
        {
            "name": "二哈",
            "age": 23,
        },
        {
            "name": "孔连顺",
            "age": 24,
        },
        {
            "name": "王尼玛",
            "age": 21,
        },
        {
            "name": "王尼玛",
            "age": 21,
        },
        {
            "name": "王尼玛",
            "age": 21,
        },
        {
            "name": "王尼玛",
            "age": 21,
        },
        {
            "name": "王尼玛",
            "age": 21,
        },
        {
            "name": "王尼玛",
            "age": 21,
        },
        {
            "name": "王尼玛",
            "age": 21,
        },
        {
            "name": "王尼玛",
            "age": 21,
        },
    ]
};

type Props = {};
export default class FlatListActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: data.result,
        }

    }

    renderItem(data) {
        return  <MyListItem data={data} id={data.id}/>

    }

    loadData(refreshing) {

        setTimeout(() => {
            let dataArray = [];
            if (refreshing) {
                this.setState({
                    isLoading: true,
                });
                for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
                    dataArray.push(this.state.dataArray[i]);
                }
            } else {
                dataArray = this.state.dataArray.concat(data.result);
            }
            this.setState({
                isLoading: false,
                dataArray: dataArray
            })
        }, 2000);

    }

    genIndicator() {
        return <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                size={'large'}
                animating={true}
                color={'red'}
            />
            <Text>正在加载更多</Text>
        </View>
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View style={styles.tabContainer}>
                <FlatList
                    data={this.state.dataArray}//列表数据源
                    renderItem={(data) => this.renderItem(data)}//渲染item时回调对应位置的数据
                    // refreshing={this.state.isLoading}//刷新状态标志
                    // onRefresh={()=>{
                    //     //刷新调用的方法
                    //     this.loadData();
                    // }}
                    keyExtractor={this._keyExtractor}//为每个item添加id
                    refreshControl={//自定义刷新组件
                        <RefreshControl
                            title={'loading'}
                            colors={['red', 'green', 'blue']}
                            refreshing={this.state.isLoading}//刷新状态标志
                            onRefresh={() => {
                                //刷新调用的方法
                                this.loadData(true);
                            }}
                            tintColor={'orange'}//ios菊花颜色
                            titleColor={'red'}//ios文本颜色
                        />
                    }

                    ListFooterComponent={() => this.genIndicator()}//上拉加载更多的样式
                    onEndReached={() => {//上拉加载调用相关接口
                        this.loadData(false);
                    }}
                />
            </View>
        );
    }
}

class MyListItem extends React.PureComponent {

    constructor(props){
        super(props);
    }


    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{this.props.data.item.name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
    },
    item: {
        backgroundColor: '#169',
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        margin: 10
    }

});