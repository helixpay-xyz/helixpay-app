import DialogAlertHolder from '../../DialogAlertHolder';
import RootNavigation from 'screens/RootNavigation';
import CBCache from 'caches/CBCache';
import CBNotificationId from 'constants/CBNotificationId';
import CBControl from 'controls/CBControl';
import CBGlobal from 'globals/CBGlobal';
import CBSync from 'services/CBSync';
import JsonUtil from 'utils/JsonUtil';
import notifee, {AndroidImportance} from '@notifee/react-native';

export default class CBNotificationHandler {

    static onReceived(action, id, title, body, data) {
        if (CBGlobal.appInitialize) {
            const categoryId = Number(data?.categoryId);
            if (CBCache.notificationId !== id && categoryId === CBNotificationId.POPUP_NOTIFICATION) {
                CBCache.notificationId = id;
                const heading = data?.heading;
                const content = data?.content;
                const buttons = JsonUtil.parseJsonString(data?.buttons);
                const options = JsonUtil.parseJsonString(data?.options);
                DialogAlertHolder.alert(heading || title, content || body, buttons || [], options || {});
            } else {
                CBSync.syncNotification();
                CBSync.syncUnreadNotification();
                CBSync.syncOSNotification();
                if (CBCache.notificationId !== id) {
                    CBCache.notificationId = id;
                    if (title && body) {
                        (async () => {
                            const channelId = await notifee.createChannel({
                                id: 'code-base-channel',
                                name: 'CodeBase Channel',
                                importance: AndroidImportance.HIGH,
                                sound: 'default'
                            });
                            await notifee.displayNotification({
                                title: title,
                                body: body,
                                data: data,
                                android: {
                                    channelId,
                                    smallIcon: 'ic_launcher',
                                    sound: 'default',
                                    pressAction: {
                                        id: 'default'
                                    }
                                },
                                ios: {
                                    sound: 'default'
                                }
                            });
                        })();
                    }
                }
            }
        }
    }

    static onClick(action, data) {
        if (data) {
            if (!CBGlobal.appInitialize || !RootNavigation.isAvailable()) {
                CBGlobal.appNotification = data;
            } else {
                if (data?.refId) {
                    CBControl.navigateWith(data?.refId, data?.defaultParam, data?.injection);
                } else {
                    const categoryId = Number(data?.categoryId);
                    switch (categoryId) {
                        case CBNotificationId.INFORMATION:
                            break;
                        case CBNotificationId.NEW_VERSION:
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}
