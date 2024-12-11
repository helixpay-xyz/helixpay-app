package com.codebase.modules;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.codebase.widgets.Screenshot;

public class CBDetectorModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private final Screenshot screenshot;

    public CBDetectorModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        screenshot = new Screenshot(this.reactContext, new Screenshot.Listener() {
            @Override
            public void onScreenShot() {
                WritableMap params = Arguments.createMap();
                params.putString("type", "screenshot");

                sendEvent(reactContext, "CBDetectorEvent", params);
            }
        });
    }

    @Override
    public String getName() {
        return "CBDetector";
    }

    @ReactMethod
    public void startScreenshot() {
        if (screenshot != null) {
            screenshot.register();
        }
    }

    @ReactMethod
    public void stopScreenshot() {
        if (screenshot != null) {
            screenshot.unregister();
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }
}
