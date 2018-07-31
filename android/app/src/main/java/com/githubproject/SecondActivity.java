package com.githubproject;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import com.app.rnlib.Manager.ReactNativeManager;
import com.app.rnlib.ReactNativeRootView;
import com.app.rnlib.ReactNativeRootView.OnJsCallBackListener;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

public class SecondActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler,OnJsCallBackListener{

    ReactNativeRootView mView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        mView = findViewById(R.id.rl_content);
        mView.setOnJsCallListener(this);
//        Button button = findViewById(R.id.btn_show_alert);
//        button.setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                NativeCallJsManager.getInstance().sendMsgToJs("showToast","弹就弹!");
//            }
//        });
    }

    @Override
    public void invokeDefaultOnBackPressed() {

    }

    @Override
    public void onPause() {
        super.onPause();
        ReactNativeManager.getInstance().onHostPause(this);
    }

    @Override
    public void onResume() {
        super.onResume();
        ReactNativeManager.getInstance().onHostResume(this,this);
    }

    @Override
    public void onJsCallBack(String msg) {
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
    }
}
