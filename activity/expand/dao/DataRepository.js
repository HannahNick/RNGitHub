import {AsyncStorage} from 'react-native';

import GitHubTrending from 'GitHubTrending';
export const FLAG_STORAGE={flag_popular:'popular',flag_trending:'trending'};
export default class DataRepository{

    constructor(flag){
        this.flag=flag;
        if (flag === FLAG_STORAGE.flag_trending){
            this.trending = new GitHubTrending();
        }
    }

    fetchRepository(url){
        return new Promise((resolve,reject)=>{
            //获取本地数据
            this.fetchLocalRepository(url)
                .then(result=>{
                    //如果本地数据不为空返回
                    if (result) {
                        resolve(result);
                    }else {
                        //如果为空就请求网络
                        this.fetchNetRepository(url)
                            .then(result=>{
                                resolve(result);
                            })
                            .catch(e=>{
                                reject(e);
                            })
                    }
                })
                .catch(e=>{//出现了解析异常或者本地数据获取失败的时候去请求网络
                    this.fetchNetRepository(url)
                        .then(result=>{
                            resolve(result);
                        })
                        .catch(e=>{
                            reject(e);
                        })
                })
        })
    }

    /**
     * 根据传来的url获取对应的数据库数据
     * @param url url连接
     * @returns {Promise<any> | Promise}
     */
    fetchLocalRepository(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if (!error) {
                    try{
                        resolve(JSON.parse(result));
                    }catch (e) {
                        reject(e);
                    }
                }else {
                    reject(error);
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param url 网络链接
     * @returns {Promise<any> | Promise}
     */
    fetchNetRepository(url){
        return new Promise((resolve,reject)=>{
            if (this.flag === FLAG_STORAGE.flag_trending) {
                this.trending.fetchTrending(url)
                    .then(result=>{
                        if (!result) {
                            reject(new Error('responseData is null'));
                            return;
                        }
                        this.saveRepository(url,result);
                        resolve(result);
                    })
            }else {
                fetch(url)
                    .then(response=>response.json())
                    .then(result=>{
                        if (!result){
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(result.items);
                        this.saveRepository(url,result.items)
                    })
                    .catch(error=>{
                        reject(error);
                    })
            }
        })
    }

    /**
     * 把网络数据缓存起来
     * @param url 网络链接
     * @param items 网络数据
     * @param callBack 回调接口
     */
    saveRepository(url,items,callBack){
        if (!url || !items) return;
        //定义个对象用来保存网络数据的时间戳
        // let wrapData = {items:items,update_data:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(items),callBack);
    }

    /**
     * 判断数据是否过时
     * @param longTime 数据的时间戳
     * @returns {boolean} true过时 false没过时
     */
    checkData(longTime){
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth() !== tDate.getMonth()) return true;
        if (cDate.getDay() !== tDate.getDay()) return true;
        if (cDate.getHours() - tDate.getHours()>4) return true;
        return false;
    }
}