package com.codebase.widgets;

import android.content.ContentResolver;
import android.content.Context;
import android.database.ContentObserver;
import android.os.Handler;
import android.os.HandlerThread;
import android.provider.MediaStore;

public class Screenshot {

    private final HandlerThread mHandlerThread;
    private final Handler mHandler;
    private final ContentResolver mContentResolver;
    private final ContentObserver mContentObserver;

    public Screenshot(Context context, Listener listener) {
        mHandlerThread = new HandlerThread("Screenshot");
        mHandlerThread.start();

        mHandler = new Handler(mHandlerThread.getLooper());

        mContentResolver = context.getContentResolver();
        mContentObserver = new ScreenshotObserver(context, mHandler, mContentResolver, listener);
    }

    public void register() {
        mContentResolver.registerContentObserver(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, true, mContentObserver);
    }

    public void unregister() {
        mContentResolver.unregisterContentObserver(mContentObserver);
    }

    public interface Listener {
        void onScreenShot();
    }
}