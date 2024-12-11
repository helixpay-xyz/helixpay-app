import {DeviceEventEmitter} from 'react-native';
import RootNavigation from 'screens/RootNavigation';
import CBCache from 'caches/CBCache';
import ServiceHandler from 'databases/handlers/ServiceHandler';
import JsonUtil from 'utils/JsonUtil';

export default class CBControl {

    static navigateWith(root, param, injection) {
        let services = [];
        const appServices = CBCache.appServices;
        const cacheServices = appServices.filter(i => i?.code === root || i?.refId === root);
        if (cacheServices && Array.isArray(cacheServices) && cacheServices.length > 0) {
            services = cacheServices;
        } else {
            const codeServices = ServiceHandler.getServiceByCode(root);
            const refIdServices = ServiceHandler.getServiceByRefId(root);
            services = [...codeServices, ...refIdServices];
            CBCache.appServices = [...appServices, ...codeServices, ...refIdServices];
        }
        const refId = services[0]?.refId || root;
        const defaultParam = {
            ...JsonUtil.parseJsonString(services[0]?.defaultParam),
            ...JsonUtil.parseJsonString(param)
        };

        RootNavigation.navigate(refId, {
            defaultParam: JsonUtil.buildDefaultParam({
                ...defaultParam
            }),
            ...injection
        });

        if (injection && typeof injection === 'string') {
            const array = injection.split('|');
            setTimeout(() => DeviceEventEmitter.emit(array[0], array[1]), Number(array[3] || 600));
        }
    }
}
