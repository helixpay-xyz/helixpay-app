import CBGlobal from 'globals/CBGlobal';
import CBNotificationHandler from 'handlers/CBNotificationHandler';
import CBDeeplinkHandler from 'handlers/CBDeeplinkHandler';

export default class CBRun {

    static runCheckPermission(callback) {
        if (CBGlobal.userInfo) {

        }
        callback && callback();
    }

    static runCheckNotification(callback) {
        if (CBGlobal.appNotification) {
            const data = {...CBGlobal.appNotification};
            setTimeout(() => CBNotificationHandler.onClick(null, data), 1000);
            CBGlobal.appNotification = null;
        }
        callback && callback();
    }

    static runCheckUrl(callback) {
        if (CBGlobal.appUrl) {
            const url = CBGlobal.appUrl;
            setTimeout(() => CBDeeplinkHandler.handleUrl(url), 1000);
            CBGlobal.appUrl = null;
        }
        callback && callback();
    }

    static runCheckDynamicUrl(callback) {
        if (CBGlobal.appDynamicUrl) {
            const url = CBGlobal.appDynamicUrl;
            setTimeout(() => CBDeeplinkHandler.handleDynamicUrl(url), 1000);
            CBGlobal.appDynamicUrl = null;
        }
        callback && callback();
    }
}
