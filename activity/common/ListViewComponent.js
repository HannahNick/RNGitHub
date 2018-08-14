import React,{Component} from 'react';
import {StyleSheet,ListView,View,Text,Image,TouchableOpacity,Alert,RefreshControl} from 'react-native';
import Toast,{DURATION} from 'react-native-easy-toast';
const URL="https://api.github.com/search/repositories?q=";
const POPULAR_TYPE="&sort=start";
export default class ListViewComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:false,
        }
    }

    /**
     * 当该组件加载完毕后就立刻请求网络
     */
    componentDidMount(){
        this.getData();
    }

    getData(){
        this.setState({
            isLoading:true,
        })
        fetch(URL+this.props.keyword+POPULAR_TYPE)
        .then(response=>response.json())
        .then(result=>{
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(result.items),
                isLoading:false
            }) 
        }) 
        .catch(error=>{
            this.toast.show("网络出错了",DURATION.LENGTH_SHORT);
        });
    }

    /**
     * 渲染条目
     */
    renderItem=(data)=>{
        return (
            <TouchableOpacity 
                onPress={()=>Alert.alert("点击了"+data.full_name)}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>{data.full_name}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                    <View style={styles.bottomLine}>
                        <View style={{flexDirection:'row'}}> 
                            <Text style={styles.authorName}>Author:</Text>
                            <Image source={{uri:data.owner.avatar_url}}
                                style={styles.authorIcon}/>
                        </View>
                        <Text>Stars:{data.stargazers_count}</Text>
                        <Image source={require('../../res/images/collection_def.png')} style={styles.authorIcon}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return (
            <View style={styles.tabContainer}>
                <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
                refreshControl={<RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.getData()}
                        colors={['#2196F3']}  
                    />}
                />
                <Toast ref={toast=>this.toast=toast}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabContainer:{
        flex: 1,
    }, 
    itemContainer:{
        padding:10,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width:0.5,height:0.5},
        shadowOpacity: 0.4, 
        shadowRadius: 1,
        backgroundColor: 'white',
        elevation:2,
    },
    authorName:{
        fontSize: 16,
        color:'black',
    },
    authorIcon:{
        width:22,
        height:22,
    },
    title:{
        fontSize: 16,
        color:'black',
        marginBottom: 5,
    },
    description:{
        fontSize:14,
        marginBottom:5,
    },
    bottomLine:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
});