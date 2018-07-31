package com.app.rnlib;

import com.app.rnlib.Module.HomeModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Nick on 2018/7/23.
 * 首页包模块
 */
public class HomePackage implements ReactPackage{

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        HomeModule homeModule = new HomeModule(reactContext);
        CallBackCenter.getInstance().bindListener(homeModule);
        List<NativeModule> modules = new ArrayList<>();
        modules.add(homeModule);
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
