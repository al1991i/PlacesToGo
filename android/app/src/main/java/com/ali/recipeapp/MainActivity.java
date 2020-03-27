package com.ali.recipeapp;

import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebSettings;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

//    int nightModeFlags = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
//    WebSettings webSettings = this.bridge.getWebView().getSettings();
//    if (nightModeFlags == Configuration.UI_MODE_NIGHT_YES) {
//      if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
//        webSettings.setForceDark(WebSettings.FORCE_DARK_ON);
//      }
//    }


    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});
  }

  @Override
  public void onStart() {
    super.onStart();
    // Android fix for enabling dark mode
    int nightModeFlags = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
    WebSettings webSettings = this.bridge.getWebView().getSettings();
    if (nightModeFlags == Configuration.UI_MODE_NIGHT_YES) {
      String userAgent = webSettings.getUserAgentString();
      userAgent = userAgent + " AndroidDarkMode";
      webSettings.setUserAgentString(userAgent);
    }
  }
}
