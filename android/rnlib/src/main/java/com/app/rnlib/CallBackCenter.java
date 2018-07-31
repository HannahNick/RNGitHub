package com.app.rnlib;

import com.app.rnlib.Module.HomeModule;
import com.app.rnlib.ReactNativeRootView.OnJsCallBackListener;

/**
 * Created by Nick on 2018/7/30.
 */
public class CallBackCenter {

    private OnJsCallBackListener mListener;

    private CallBackCenter(){}

    public static CallBackCenter getInstance(){
        return Holder.sManager;
    }

    public void initViewAndListener(OnJsCallBackListener listener){
        mListener = listener;
    }

    public void bindListener(HomeModule module){
        module.initListener(mListener);
    }

    private static class Holder{
        private static final CallBackCenter sManager = new CallBackCenter();
    }
}
