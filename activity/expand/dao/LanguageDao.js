
import keys from '../../../res/data/keys.json';
import {AsyncStorage} from 'react-native';
var FLAG_LANGUAGE={flag_language:'flag_language',flag_key:'flag_key'}
export default class LanguageDao{
    constructor(flag){//标示哪个模块在调用
        this.flag=flag;
    }

    /**
     * 
     * @param {把数据保存到数据库} data 
     */
    save(data){
        AsyncStorage.setItem(this.flag,JSON.stringify(data),(error)=>{

        })
    }

    /**
     * 从数据库中获取数据
     */
    fetch(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){//如果获取失败了就回调
                    reject(error);
                }else{
                    if(result){//判断result是否为空？?还能这么写？  数据库有数据就返回
                        try{//JSON解析有可能抛异常
                            resolve(JSON.parse(result));
                        }catch(e){
                            reject(e)
                        }
                    }else{//如果数据库为空就返回默认的数据
                        var data = this.flag===FLAG_LANGUAGE.flag_key?keys:null;
                        this.save(data);
                        resolve(data)
                    }
                }
            })
        })
    }
}