import React,{Component} from 'react';
import {StyleSheet,View,Image,Text,TextInput,Alert,TouchableOpacity,ListView,RefreshControl} from 'react-native';
import NavigationBar from '../../NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import LanguageDao,{FLAG_LANGUAGE} from "../expand/dao/LanguageDao";

const URL="https://api.github.com/search/repositories?q=";
const POPULAR_TYPE="&sort=start";

export default class PopularFragment extends Component{

    constructor(props){
        super(props);
        this.dataRepository = new DataRepository();
        this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state={
            popularData:'',
            isLoading:false,
            language:[],
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

    componentDidMount() {
        this.loadData();
    }

    /**
     * 获取数据库里的数据
     */
    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    language:result,
                })
            })
            .catch(error=>{
                console.log(error);
            });
    }

    /**
     * 渲染tab
     */
    renderTab(){
        /*其中内部子组件需要添加tabLabel属性，这个属性是为ScrollableTabView添加名字*/
        return this.state.language.map((keys,index)=>{
            if (keys.checked){
                return <PopularTab key={index} tabLabel={keys.name}/>;
            }else {
                return null;
            }
        });
    }



    render(){
        //这个和android的TabLayou很像
        let content = this.state.language.length>0?<ScrollableTabView
            tabBarBackgroundColor='#2196F3'
            //未选中状态的tab文字颜色
            tabBarInactiveTextColor="mintcream"
            //选中状态的tab文字颜色
            tabBarActiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7',height:2}}
            //这里要注意导包，和ScrollableTabView一起使用的
            renderTabBar={()=><ScrollableTabBar/>}
        >
            {this.renderTab()}
        </ScrollableTabView>:null;
        return(
            <View 
                //这里要注意需要给父容器添加flex:1属性，否则看不到内容，无法自适应内容
                style={styles.container}>
                <NavigationBar title="最热" statusBar={{backgroundColor:'#2196F3'}}/>
                {content}
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
        this.setState({
            isLoading:true
        });
        let url = URL+this.props.tabLabel+POPULAR_TYPE;
        this.dataRepository.getPopularData(url)
        .then(result=>{
            this.setState({
                //这里要注意cloneWithRows的返回值类型是ListViewDataSource
                dataSource:this.state.dataSource.cloneWithRows(result.items),
                isLoading:false,
            })
        })
        .catch(error=>{
            this.setState({
                popularData:JSON.stringify(error),
            })
        })
    } 

    renderItem(data){
        return (
            <TouchableOpacity>
                <View style={styles.item_shadow}>
                    <Text style={styles.title}>{data.full_name}</Text>
                    <Text style={styles.description}>{data.description}</Text> 
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.title}>Author:</Text>
                            <Image source={{uri:data.owner.avatar_url}}
                                style={{height:22,width:22}}
                                resizeMode='contain'
                            />
                        </View>
                        <Text style={styles.title}>Stars: {data.stargazers_count}</Text>
                        <Image 
                            style={{width:22,height:22}}
                            source={require("../../res/images/collection_def.png")}
                            resizeMode='contain'
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderDecoration=(arg1,arg2,arg3)=>{

        return <View style={{backgroundColor:'gray',height:1}}/>
    };

    render(){
        return <ListView
            dataSource={this.state.dataSource}
            renderRow={data=>this.renderItem(data)}
            refreshControl={
                <RefreshControl refreshing={this.state.isLoading}
                    onRefresh={()=>this.getData()}
                    colors={['#2196F3']}
                    //下面这几个属性是ios才生效
                    tintColor={'#2196F3'}
                    title={'Loading...'}
                    titleColor={'#2196F3'}
                />
            }

        />
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    item_shadow:{
        backgroundColor:'white',
        padding:10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,//垂直边距？
        borderWidth: 0.5,
        borderColor: '#dddddd',
        borderRadius: 2,
        //这几个参数是在ios上才会显示阴影
        shadowColor: 'gray',//阴影颜色
        shadowOffset: {width:0.5,height:0.5},//阴影偏移
        shadowOpacity: 0.4,//阴影不透明度
        shadowRadius: 1,//阴影模糊半径
        //这几个参数是在android上才会显示阴影
        elevation:2,//阴影颜色高度
    },
    title:{
        fontSize: 16,
        marginBottom: 2,
        color:'#212121',
    },
    description:{
        fontSize:14,
        marginBottom: 2,
        color:'#757575',
    }
})