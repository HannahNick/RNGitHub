import React,{Component} from 'react';
import {StyleSheet,View,Text,Image,ListView,TouchableOpacity,RefreshControl} from 'react-native';
import Toast,{DURATION} from 'react-native-easy-toast';
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
export default class NickListActivity extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==f2});
        this.state={
            dataSource:ds.cloneWithRows(data.result),
            isRefreashIng:true,
        }
    }

    renderItem=(item,arg2,arg3)=>{
        return(
            <TouchableOpacity onPress={()=>{
                this.toast.show("点击了第"+arg3+"项");
            }}>
                <View style={{height:50,justifyContent:'center',}}>
                    <Text>{item.name}</Text>
                    <Text>{item.age}</Text>
                 </View>
            </TouchableOpacity>
        )
    }

    renderDecoration=(arg1,arg2,arg3)=>{
        return <View style={{backgroundColor:'gray',height:1}}></View>
    }

    renderFooter=()=>{
        return <Image
            resizeMode='contain'
            style={{height:50}}
            source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530941431900&di=bf6b1a74aebce24a29996d3f722b6ce8&imgtype=0&src=http%3A%2F%2Fs9.rr.itc.cn%2Fr%2FwapChange%2F20166_10_10%2Fa4n7n66185398770855.jpg"}}
        />
    }

    doRefresh=()=>{
        setTimeout(()=>{this.setState({
            isRefreashIng:false
        })},2000);
    }

    render(){
        return(
            <View style={styles.container}>
                <ListView 
                    renderRow={this.renderItem}
                    dataSource={this.state.dataSource}
                    renderSeparator={this.renderDecoration}
                    renderFooter={this.renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreashIng}
                            onRefresh={this.doRefresh()}
                        />
                    }
                />
                <Toast ref={toast=>{this.toast=toast}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },

});