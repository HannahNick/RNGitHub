package com.app.rnlib.Manager;

import android.app.Activity;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

/**
 * Created by Nick on 2018/7/26.
 * RN基础初始化相关类
 */
public class ReactNativeManager {

    private ReactInstanceManager mReactManager;

    private ReactNativeManager(){ }

    public static ReactNativeManager getInstance(){
        return Holder.sManager;
    }

    public void init(ReactApplication context){
        mReactManager = context.getReactNativeHost().getReactInstanceManager();

    }

    public ReactInstanceManager getReactManager(){
        return mReactManager;
    }

    public void onHostPause(Activity activity){
        mReactManager.onHostPause(activity);
    }

    public void onHostResume(Activity activity, DefaultHardwareBackBtnHandler handler){
        mReactManager.onHostResume(activity,handler);
    }

    private static class Holder {
        private static final ReactNativeManager sManager = new ReactNativeManager();
    }
}
