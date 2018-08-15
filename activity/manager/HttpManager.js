import {Platform} from "react-native";

/**
 * Created by nick on 2018/8/14
 * 网络请求管理
 */
const TIME_OUT = 15000;
export default class HttpManager{

    constructor(props){

    }


    abortablePromise(url,header) {
        let abort_fn = null;
        //这是一个可以被reject的promise
        let abort_promise = new Promise((resolve, reject)=>{
            abort_fn = function() {
                reject('abort promise');
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
}