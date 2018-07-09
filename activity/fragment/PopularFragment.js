import React,{Component} from 'react';
import {StyleSheet,View,Text,TextInput,Alert,ScrollView,ListView} from 'react-native';
import NavigationBar from '../../NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';

const URL="https://api.github.com/search/repositories?q=";
const POPULAR_TYPE="&sort=start";

export default class PopularFragment extends Component{

    constructor(props){
        super(props);
        this.dataRepository = new DataRepository();
        this.state={
            popularData:'',
        }
    }

    getData(key){
        let url = URL+key+POPULAR_TYPE;
        this.dataRepository.getPopularData(url)
        .then(result=>{
            this.setState({
                popularData:JSON.stringify(result),
            })
        })
        .catch(error=>{
            this.setState({
                popularData:JSON.stringify(error),
            })
        })
    }

    render(){
        return(
            <View 
            //这里要注意需要给父容器添加flex:1属性，否则看不到内容，无法自适应内容
            style={styles.container}>
                <NavigationBar title="最热"/>
                {/*这个和android的TabLayou很像*/}
                <ScrollableTabView 
                    //这里要注意导包，和ScrollableTabView一起使用的
                    renderTabBar={()=><ScrollableTabBar/>}
                >
                    {/*其中内部子组件需要添加tabLabel属性，这个属性是为ScrollableTabView添加名字*/}
                    <PopularTab tabLabel="Java"/>
                    <PopularTab tabLabel="IOS"/>
                    <PopularTab tabLabel="Android"/>
                    <PopularTab tabLabel="JavaScript"/>
                    <PopularTab tabLabel="Java"/>
                </ScrollableTabView>
                
            </View>
        )
    }
}

class PopularTab extends Component{
    constructor(props){
        super(props);
        this.dataRepository = new DataRepository();
        
        this.state={
            popularData:'',
            //这里要注意dataSource的类型是ListViewDataSource
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        let url = URL+this.props.tabLabel+POPULAR_TYPE;
        this.dataRepository.getPopularData(url)
        .then(result=>{
            this.setState({
                //这里要注意cloneWithRows的返回值类型是ListViewDataSource
                dataSource:this.state.dataSource.cloneWithRows(result.items),
            })
        })
        .catch(error=>{
            this.setState({
                popularData:JSON.stringify(error),
            })
        })
    }

    renderItem(data){
        return <View>
            <Text>{data.full_name}</Text>
            <Text>{data.description}</Text>
            <Text>{data.owner.avatar_url}</Text>
            <Text>{data.stargazers_count}</Text>
        </View>
    }

    renderDecoration=(arg1,arg2,arg3)=>{
        return <View style={{backgroundColor:'gray',height:1}}/>
    }

    render(){
        return <ListView dataSource={this.state.dataSource}
            renderRow={data=>this.renderItem(data)}
            renderSeparator={this.renderDecoration}
        />
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})