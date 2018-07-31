package com.app.rnlib.Module;

import android.util.Log;
import android.widget.Toast;

import com.app.rnlib.Constans;
import com.app.rnlib.Manager.NativeCallJsManager;
import com.app.rnlib.ReactNativeRootView.OnJsCallBackListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Nick on 2018/7/23.
 */
public class HomeModule extends ReactContextBaseJavaModule {

    private OnJsCallBackListener mListener;

    public HomeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        NativeCallJsManager.getInstance().initContext(reactContext);
    }

    public void initListener(OnJsCallBackListener listener){
        mListener = listener;
    }

    @Override
    public String getName() {
        return "HomeModule";
    }

    @ReactMethod
    public void doToast(String message){
//        Intent intent = new Intent(getCurrentActivity(),RnTestActivity.class);
//        getCurrentActivity().startActivity(intent);
        if (mListener==null){
            Log.e(Constans.TAG,"JSCallbackListener is null!!!");
            return;
        }
        mListener.onJsCallBack(message);
    }

    @ReactMethod
    public void showToast(String msg, Callback callback){
        Toast.makeText(getCurrentActivity(), msg, Toast.LENGTH_SHORT).show();
        callback.invoke("Native收到了参数");
    }

}
