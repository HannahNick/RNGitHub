import React,{Component} from 'react';
import {View,Text,ListView,Image,TouchableOpacity,RefreshControl} from 'react-native';
import Toast,{DURATION} from 'react-native-easy-toast';//导入Toast和常量
const data={
    "result":[
        {
            "name":"王大锤",
            "age":19,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":25,
        },
        {
            "name":"王尼玛",
            "age":22,
        },
        {
            "name":"王尼玛",
            "age":23,
        },
        {
            "name":"王尼玛",
            "age":24,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
        {
            "name":"王尼玛",
            "age":21,
        },
    ]  
};

export default class NickListActivity2 extends Component{

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            dataSource:ds.cloneWithRows(data.result),
            isLoading:true,
        }
        this.onLoad();
    }

    /**
     * 渲染item
     */
    renderItem=(item)=>{ 
                return <TouchableOpacity onPress={()=>{
                        this.toast.show('点一下',DURATION.LENGTH_SHORT);
                    }}>
                        <View style={{height:40,flexDirection:'row'}}>
                            
                                <Text style={{marginRight:10}}>{item.name}</Text>
                                <Text>{item.age}</Text>
                        </View>
                    </TouchableOpacity>
    }

    /**
     * 渲染分割线
     * 返回的是一个组件，记得要设置高度
     * 
     * rowId:listview有多少行就返回多少个分割线，每个分割线都有个id
     */
    renderSeparator=(sectionId,rowId,adjacentRowHighlighted)=>{
        return <View key={rowId} style={{height:1,backgroundColor:'gray'}}></View>
    } 

    /**
     * 渲染底部视图
     */
    renderFooter=()=>{
        return <View style={{height:100}}>
            <Image 
            style={{height:100}} 
            resizeMode='contain' 
            source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530941431900&di=bf6b1a74aebce24a29996d3f722b6ce8&imgtype=0&src=http%3A%2F%2Fs9.rr.itc.cn%2Fr%2FwapChange%2F20166_10_10%2Fa4n7n66185398770855.jpg"}}/>
        </View>
    }

    onLoad=()=>{
        setTimeout(()=>{
            this.setState({
                isLoading:false,
            })
        },2000);
    }

    render(){
        return (
            <View>
                <ListView dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    renderSeparator={this.renderSeparator}
                    renderFooter={this.renderFooter}
                    refreshControl={<RefreshControl 
                        //告诉RefreshControl什么时候刷新
                        refreshing={this.state.isLoading} 
                        //下拉刷新调用方法
                        onRefresh={this.onLoad()}/>}
                />
                {/*当这个Toast组件初始化完成的时候，把Toast引用赋值到this.toast*/}
                <Toast ref={toast=>this.toast=toast}/>
            </View>
        )
    }
}

