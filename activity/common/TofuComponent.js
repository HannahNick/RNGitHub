/**
 * Created by nick on 2018/8/14
 */

import React,{Component} from 'react';
import {StyleSheet,Image, Text, View} from "react-native";


export default class TofuComponent extends Component{

    constructor(props){
        super(props);
    }

    getThreeType(data){
        const group1 = data[0];
        const group2 = data[1];
        const group3 = data[2];
        return(<View style={styles.container3}>
            <View style={[styles.leftContainer3, {backgroundColor: group1.bgColor}]}>
                <Text style={styles.firstTofuText3}>{group1.imgTitle}</Text>
                <Image style={styles.firstImg3}
                       source={{uri: group1.imgUrl}}/>
            </View>
            <View style={styles.rightContainer3}>
                <View style={[styles.secondTofu3, {backgroundColor: group2.bgColor}]}>
                    <Image style={styles.secondAndThirdImg3} source={{uri: group2.imgUrl}}/>
                    <View style={styles.textContain2}>
                        <Text style={styles.firstText2}>{group2.imgTitle}</Text>
                        <Text style={styles.secondText2}>{group2.secondTitle}</Text>
                    </View>
                </View>
                <View style={[styles.thirdTofu3, {backgroundColor: group3.bgColor}]}>
                    <Image style={styles.secondAndThirdImg3} source={{uri: group3.imgUrl}}/>
                    <View style={styles.textContain2}>
                        <Text style={styles.firstText2}>{group3.imgTitle}</Text>
                        <Text style={styles.secondText2}>{group3.secondTitle}</Text>
                    </View>
                </View>
            </View>
        </View>)
    }

    getTwoType(group1,group2,keyIndex){
        return(<View style={styles.container2} key={keyIndex}>
            <View style={[styles.leftContainer2, {backgroundColor: group1.bgColor}]}>
                <Image style={styles.secondAndThirdImg3} source={{uri: group1.imgUrl}}/>
                <View style={styles.textContain2}>
                    <Text style={styles.firstText2}>{group1.imgTitle}</Text>
                    <Text style={styles.secondText2}>{group1.secondTitle}</Text>
                </View>
            </View>
            <View style={[styles.rightContainer2, {backgroundColor: group2.bgColor}]}>
                <Image style={styles.secondAndThirdImg3} source={{uri: group2.imgUrl}}/>
                <View style={styles.textContain2}>
                    <Text style={styles.firstText2}>{group2.imgTitle}</Text>
                    <Text style={styles.secondText2}>{group2.secondTitle}</Text>
                </View>
            </View>
        </View>)
    }

    getFourType(data){
        let content=[];
        content.push(this.getTwoType(data[0],data[1],10001));
        content.push(this.getTwoType(data[2],data[3],10002));
        return content;

    }

    render(){
        if (this.props.tofuNum ===2){
            return this.getTwoType(this.props.data[0],this.props.data[1]);
        } else if (this.props.tofuNum===3){
            return this.getThreeType(this.props.data);
        } else {
            return this.getFourType(this.props.data)
        }


    }
}

const styles = StyleSheet.create({
    //两个豆腐块的样式
    container2: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: 'white',
        marginBottom:4,
    },
    leftContainer2: {
        flex: 1,
        backgroundColor: '#ECF7E6',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight:2,
    },
    leftImage2: {
        width: 90,
        height: 90,
        marginLeft: 10,
        resizeMode: 'contain',

    },
    textContain2: {
        marginLeft: 10
    },
    firstText2: {
        fontSize: 16,
        color: 'black',
    },
    secondText2: {
        fontSize: 13,
        color: 'black',
    },
    rightContainer2: {
        flex: 1,
        backgroundColor: '#FFF8E8',
        marginLeft: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    //三个豆腐块的样式
    container3: {
        flexDirection: 'row',
        height: 130,
        backgroundColor: 'white',
        marginBottom: 4,
    },
    leftContainer3: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#FFF8E8',
        alignItems: 'center',
        marginRight: 2,
    },
    firstTofuText3: {
        color: 'black',
        fontSize: 17,
    },
    firstImg3: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    secondAndThirdImg3: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginLeft: 10,
    },

    rightContainer3: {
        flex: 1,
        marginLeft: 2,
    },
    secondTofu3: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#ECF7E6",
        marginBottom: 2,
        alignItems: 'center'
    },
    thirdTofu3: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#CDE6FB",
        marginTop: 2,
        alignItems: 'center'
    },
    secondAndThirdTofuText3: {
        marginTop: 15,
        marginLeft: 5,
        color: 'black',
    },
});