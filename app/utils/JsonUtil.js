export default class JsonUtil {

    static parseJsonString(jsonString) {
        try {
            if (!jsonString || (jsonString && jsonString.length === 0)) {
                return null;
            }
            return JSON.parse(jsonString);
        } catch (e) {
            return null;
        }
    }

    static buildDefaultParam(object) {
        if (object) {
            return JSON.stringify(object);
        } else {
            return '';
        }
    }

    static jsonCookieToCookieString(json) {
        if (json) {
            let cookieString = '';
            for (const [key, value] of Object.entries(json)) {
                cookieString += `${key}=${value.value}; `;
            }
            return cookieString;
        } else {
            return '';
        }
    }
}
