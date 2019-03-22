/*
 * Copyright (C) 2014 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package com.fgl27.twitchtv;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
/*
 * Main Activity class that loads {@link MainFragment}.
 */
public class MainActivity extends Activity {

    public WebView mwebview;
    public Context mcontext;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mcontext = this;

        mwebview = (WebView) findViewById(R.id.WebView);
        WebSettings websettings = mwebview.getSettings();
        websettings.setJavaScriptEnabled(true);
        websettings.setDomStorageEnabled(true);

        websettings.setAllowFileAccess(true);
        websettings.setAllowContentAccess(true);
        websettings.setAllowFileAccessFromFileURLs(true);
        websettings.setAllowUniversalAccessFromFileURLs(true);

        mwebview.addJavascriptInterface(new WebAppInterface(this), "Android");
        //mwebview.loadUrl("file:///android_asset/index.html");
        mwebview.loadUrl("https://fgl27.github.io/SmartTwitchTV/release/index.min.html");
        mwebview.setWebViewClient(new WebViewClient() {
            public void onConsoleMessage(String message, int lineNumber, String sourceID) {
                Log.d("MyApplication", message + " -- From line " +
                    lineNumber + " of " +
                    sourceID);
            }
        });
    }

    public class WebAppInterface {
        Context mwebContext;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mwebContext = c;
        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToast(String toast) {
            Toast.makeText(mwebContext, toast, Toast.LENGTH_SHORT).show();
        }

        @JavascriptInterface
        public void startVideo(String videoAddress, String title, String description) {
            Intent intent = new Intent(mcontext, PlaybackActivity.class);
            intent.putExtra("url", videoAddress);
            intent.putExtra("title", title);
            intent.putExtra("description", description);
            mcontext.startActivity(intent);
        }
    }

}
