import {Platform} from "react-native";

/**
 * Created by nick on 2018/8/14
 * 网络请求管理
 */
export default class HttpManager{

    constructor(props){
        this.header = {
            method: 'POST',
            headers: {//要求服务器返回的结果是json格式的
                'Content-Type': 'application/x-www-form-urlencoded',
                'source-type': Platform.OS === 'ios'?'ios':'android',
                'role-type': 'cs',
            },
            body: JSON.stringify(props.body),
        }


    }


    abortablePromise(fetch_promise,timeout) {
        let abort_fn = null;

        //这是一个可以被reject的promise
        let abort_promise = new Promise(function(resolve, reject) {
            abort_fn = function() {
                eject('abort promise');
            };
        });

        //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        let abortable_promise = Promise.race([
            fetch_promise,
            abort_promise
        ]);

        setTimeout(function () {
            abort_fn();
        },timeout);

        return abortable_promise;
    }
}