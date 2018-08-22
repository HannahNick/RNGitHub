import React,{Component} from 'react'
import {TextInput,StyleSheet,View, Text} from 'react-native'

export default class Girl extends Component{
    constructor(props){
        super(props);
    }

    getParamsByNavigator(){
        return <Text style={styles.text}>我收到了男孩:{this.props.word}</Text>
    }

    getParamsByNavigation(){
        return <Text style={styles.text}>我收到了男孩:{this.props.navigation.state.params.word}</Text>
    }

    render(){
        const {setParams} = this.props.navigation;
        return(
            <View style={styles.tabContainer}>
                <Text style={styles.text}>I am Girl</Text>
                {this.getParamsByNavigation()}
                <Text style={styles.text} onPress={()=>{
                    //onCallBack是上级页面传来的参数
                    this.props.onCallBack('一盒巧克力');
                    //这里是结束页面,finish
                    this.props.navigator.pop();
                }}>回赠巧克力</Text>
                <TextInput style={styles.textInput} onChangeText={(text)=>{
                    setParams({
                        word:text,
                    })
                }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabContainer:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'red',
    },
    text:{
        fontSize:20,
    },
    textInput:{
        height:50,
    }
});