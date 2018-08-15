import {AsyncStorage, Platform} from "react-native";

/**
 * Created by nick on 2018/8/14
 * 网络请求管理
 */
const TIME_OUT = 15000;
export default class HttpManager{

    /**
     * 请求超时封装
     * @param url
     * @param header
     * @returns {Promise<any>}
     */
    abortablePromise(url,header) {
        let abort_fn = null;
        //这是一个可以被reject的promise
        let abort_promise = new Promise((resolve, reject)=>{
            abort_fn = function() {
                reject('network timeout');
            };
        });

        let fetch_promise = new Promise((resolve,reject)=>{
            fetch(url,header)
                .then((response)=>response.json())
                .then((result)=>resolve(result))
                .catch((error)=>reject(error));
        });
        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        let abortable_promise = Promise.race([
            fetch_promise,
            abort_promise
        ]);

        setTimeout(function () {
            abort_fn();
        },TIME_OUT);
        return abortable_promise;
    }

    doRequest(url,params){
        const header = {
            method: 'POST',
            headers: {//要求服务器返回的结果是json格式的
                'Content-Type': 'application/x-www-form-urlencoded',
                'source-type': Platform.OS === 'ios'?'ios':'android',
                'role-type': 'cs',
            },
            body: JSON.stringify(params),
        };
        return this.abortablePromise(url,header);
    }

    /**
     * 获取本地缓存数据
     * @param url
     * @returns {Promise<any> | Promise}
     */
    getLocalCacheData(url){
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
     * @param url
     * @param header
     * @returns {Promise<any> | Promise}
     */
    requestNetWork(url,header){
        return new Promise((resolve,reject)=>{
            fetch(url,header)
                .then((response)=>response.json())
                .then((result)=>resolve(result))
                .catch((error)=>reject(error));
        })
    }

    /**
     * 保存网络数据
     * @param url
     * @param data
     */
    saveNetWorkData(url,data){
        if (!url || !items) return;
        //定义个对象用来保存网络数据的时间戳
        let wrapData = {items:items,update_data:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack);
    }

}