package com.githubproject;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

import com.app.rnlib.Manager.NativeCallJsManager;

public class RnTestActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rn_test);

        Button send_msg = (Button) findViewById(R.id.btn_sendmsg);
        send_msg.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                NativeCallJsManager.getInstance()
                        .sendMsgToJs("nativeCallRn","调起JS代码");
            }
        });

    }
}
