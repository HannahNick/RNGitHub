
import keys from '../../../res/data/keys.json';
import {AsyncStorage,Alert} from 'react-native';
export var FLAG_LANGUAGE={flag_language:'flag_language',flag_key:'flag_key'};
export default class LanguageDao{
    constructor(flag){//标示哪个模块在调用
        this.flag=flag;
    }

    /**
     * 把数据转换成json字符串保存到数据库
     * @param data
     */
    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{
        })
    }

    /**
     * 删除对象
     */
    delete(){
        AsyncStorage.removeItem(this.flag,(error)=>{
        });
    }

    /**
     * 从数据库中获取数据,获取的是字符串,再经过转换成对象返回到调用者那边使用
     */
    fetch(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){//如果获取失败了就回调
                    reject(error);
                }else{
                    if(result){//判断result是否为空？?还能这么写？  result不为空
                        try{//JSON解析有可能抛异常
                            resolve(JSON.parse(result));//因为保存的是字符串，所以获取的时候需要做一步转换
                        }catch(e){
                            reject(e);
                        }
                    }else{//如果数据库为空就返回默认的数据
                        let data = this.flag===FLAG_LANGUAGE.flag_key?keys:null;
                        this.save(data);
                        resolve(data);
                    }
                }
            })
        })
    }
}