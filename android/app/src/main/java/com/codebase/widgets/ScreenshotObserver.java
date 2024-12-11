package com.codebase.widgets;

import android.content.ContentResolver;
import android.content.Context;
import android.database.ContentObserver;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;

public class ScreenshotObserver extends ContentObserver {

    private static final String SORT_ORDER = MediaStore.Images.Media.DATE_ADDED + " DESC";
    private final String[] PROJECTION = {
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.DISPLAY_NAME,
            MediaStore.Images.Media.DATA
    };

    private Context mContext;
    private ContentResolver mContentResolver;
    private final Screenshot.Listener mListener;

    public ScreenshotObserver(Context context, Handler handler, ContentResolver contentResolver, Screenshot.Listener listener) {
        super(handler);
        mContext = context;
        mContentResolver = contentResolver;
        mListener = listener;
    }

    @Override
    public boolean deliverSelfNotifications() {
        return super.deliverSelfNotifications();
    }

    @Override
    public void onChange(boolean selfChange) {
        super.onChange(selfChange);
    }

    @Override
    public void onChange(boolean selfChange, Uri uri) {
        super.onChange(selfChange, uri);
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                mListener.onScreenShot();
            }
        });
    }
}