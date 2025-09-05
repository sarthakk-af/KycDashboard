package com.example.app;

import android.os.Bundle;
// MODIFICATION 1: Add this import statement
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // MODIFICATION 2: Add this line to enable debugging
        WebView.setWebContentsDebuggingEnabled(true);
    }
}
