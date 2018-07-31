package com.app.rnlib.Manager;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by Nick on 2018/7/24.
 * 向RN传递数据管理类
 */
public class NativeCallJsManager {

    private ReactContext mContext;

    private NativeCallJsManager(){}

    public static NativeCallJsManager getInstance(){
        return Holder.sManager;
    }

    public void initContext(ReactContext context){
        mContext = context;
    }

    public ReactContext getContext(){
        return mContext;
    }

    /**
     * 调用JS代码
     * @param eventName 事件名
     * @param msg 数据
     */
    public void sendMsgToJs(String eventName,String msg){
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName,msg);
    }

    private static class Holder{
        private static final NativeCallJsManager sManager = new NativeCallJsManager();
    }
}
