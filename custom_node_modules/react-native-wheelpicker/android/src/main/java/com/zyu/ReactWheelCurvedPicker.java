package com.zyu;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Shader;
import android.os.SystemClock;
import android.util.AttributeSet;

import com.aigestudio.wheelpicker.WheelPicker;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.List;

/**
 * @author <a href="mailto:lesliesam@hotmail.com"> Sam Yu </a>
 */
public class ReactWheelCurvedPicker extends WheelPicker {

    private final EventDispatcher mEventDispatcher;
    private List<Dynamic> mValueData;

    public ReactWheelCurvedPicker(ReactContext reactContext) {
        super(reactContext);
        mEventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();

        setOnItemSelectedListener(new OnItemSelectedListener () {
            @Override
            public void onItemSelected(WheelPicker picker, Object data, int index) {
                if (mValueData != null && index < mValueData.size()) {
                    mEventDispatcher.dispatchEvent(
                            new ItemSelectedEvent(getId(),index));
                }
            }
        });
    }
 
    public void setItemIndex(int index) {
        super.setSelectedItemPosition(index , true);
    }

    public void setValueData(List<Dynamic> data) {
        mValueData = data;
    }

}

class ItemSelectedEvent extends Event<ItemSelectedEvent> {

    public static final String EVENT_NAME = "wheelCurvedPickerPageSelected";

    private final Integer mValue;

    protected ItemSelectedEvent(int viewTag,  Integer value) {
        super(viewTag);
        mValue = value;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        WritableMap eventData = Arguments.createMap();
        if(mValue!=null){
            eventData.putInt("data",mValue);
//
//            if(mValue instanceof  String){
//                eventData.putString("data",(String)mValue);
//            }else if(mValue instanceof Double){
//                eventData.putDouble("data",(Double)mValue);
//            }else if(mValue instanceof Integer){
//                eventData.putInt("data",(Integer)mValue);
//            }
        }
        return eventData;
    }
}
