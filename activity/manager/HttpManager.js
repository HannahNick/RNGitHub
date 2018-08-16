import {AsyncStorage, Platform} from "react-native";

/**
 * Created by nick on 2018/8/14
 * 网络请求管理
 */
const TIME_OUT = 4000;
export default class HttpManager {

    constructor(callBack) {
        this.callBack = callBack;
    }

    /**
     * 请求超时封装
     * @returns {Promise<any>}
     */
    abortablePromise(url,header) {
        let abort_fn = null;
        //这是一个可以被reject的promise
        let abortPromise = new Promise((resolve, reject) => {
            abort_fn = function () {
                reject('network timeout');
            };
        });
        const fetchPromise =new Promise((resolve,reject)=>{
            fetch(url, header)
                .then((response) => response.json())
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });

        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        let abortablePromise = Promise.race([
            fetchPromise,
            abortPromise
        ]);

        setTimeout(function () {
            abort_fn();
        }, TIME_OUT);
        return abortablePromise;
    }

    doRequest(url, params) {
        const header = {
            method: 'POST',
            headers: {//要求服务器返回的结果是json格式的
                'Content-Type': 'application/x-www-form-urlencoded',
                'source-type': Platform.OS === 'ios' ? 'ios' : 'android',
                'role-type': 'cs',
            },
            body: JSON.stringify(params),
        };
        return this.abortablePromise(url, header);
    }

    getHomeData(url) {
        this.getLocalCacheData(url);
    }

    /**
     * 获取本地缓存数据
     * @param url
     * @returns {Promise<any> | Promise}
     */
    getLocalCacheData(url) {
        AsyncStorage.getItem(url, (error, result) => {
            if (!error) {
                try {
                    this.callBack(true, JSON.parse(result));
                    this.requestNetWork(url);
                } catch (e) {
                    this.requestNetWork(url);
                }
            } else {
                this.requestNetWork(url);
            }
        });

    }

    /**
     * 保存网络数据
     * @param url
     * @param data
     */
    saveNetWorkData(url, data) {
        if (!url || !data) return;
        //定义个对象用来保存网络数据的时间戳
        // let wrapData = {items: items, update_data: new Date().getTime()};
        AsyncStorage.setItem(url, JSON.stringify(data), null);
    }

    /**
     * 获取网络数据
     * @param url
     * @param header
     * @returns {Promise<any> | Promise}
     */
    requestNetWork(url) {
        const params = {viewType: 2, tempFileId: 1};
        const header = {
            method: 'POST',
            headers: {//要求服务器返回的结果是json格式的
                'Content-Type': 'application/x-www-form-urlencoded',
                'source-type': Platform.OS === 'ios' ? 'ios' : 'android',
                'role-type': 'cs',
            },
            body: JSON.stringify(params),
        };
        this.abortablePromise(url,header)
            .then((result)=>{
                this.callBack(true, result);
                //获取到网络数据后保存到本地
                this.saveNetWorkData(url,result);
            })
            .catch((error)=>{
                this.callBack(false, error)
            })
    }



}