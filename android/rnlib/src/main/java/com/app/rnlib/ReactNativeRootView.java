package com.app.rnlib;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.widget.FrameLayout;

import com.app.rnlib.Manager.NativeCallJsManager;
import com.app.rnlib.Manager.ReactNativeManager;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;

/**
 * Created by Nick on 2018/7/30.
 * RN容器View,一被初始化就立刻加载页面
 */
public class ReactNativeRootView extends FrameLayout{
    public ReactNativeRootView(@NonNull Context context) {
        this(context,null);
    }

    public ReactNativeRootView(@NonNull Context context, @Nullable AttributeSet attrs) {
        this(context, attrs,0);
    }

    public ReactNativeRootView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        ReactRootView reactRootView = new ReactRootView(context);
        ReactInstanceManager reactManager = ReactNativeManager.getInstance().getReactManager();
        reactRootView.startReactApplication(reactManager, Constans.HOME_MODULE, null);
        addView(reactRootView);
    }

    /**
     * 通知RN刷新页面
     */
    public void onRefresh(){
        NativeCallJsManager.getInstance()
                .sendMsgToJs(Constans.DO_REFRESH,"");
    }

    /**
     * 设置RN回调监听
     * @param listener
     */
    public void setOnJsCallListener(OnJsCallBackListener listener){
        CallBackCenter.getInstance().initViewAndListener(listener);
    }

    public interface OnJsCallBackListener {
        void onJsCallBack(String msg);
    }
}
