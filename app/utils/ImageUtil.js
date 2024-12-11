export default class ImageUtil {

    static images = {
        bg_not_found: require('assets/images/bg_not_found.png'),
        ic_bell: require('assets/images/ic_bell.png'),
        ic_check_circle: require('assets/images/ic_check_circle.png'),
        ic_download: require('assets/images/ic_download.png'),
        ic_empty_notification: require('assets/images/ic_empty_notification.png'),
        ic_exclamation_circle: require('assets/images/ic_exclamation_circle.png'),
        ic_exclamation_triangle: require('assets/images/ic_exclamation_triangle.png'),
        ic_face_id: require('assets/images/ic_face_id.png'),
        ic_flag: require('assets/images/ic_flag.png'),
        ic_info_circle: require('assets/images/ic_info_circle.png'),
        ic_notification: require('assets/images/ic_notification.png'),
        ic_times: require('assets/images/ic_times.png'),
        ic_update: require('assets/images/ic_update.png'),
        ic_warning: require('assets/images/ic_warning.png'),
        ic_zalo: require('assets/images/ic_zalo.png'),
        logo_intro_0: require('assets/images/logo_intro_0.png'),
        logo_intro_1: require('assets/images/logo_intro_1.png'),
        logo_intro_2: require('assets/images/logo_intro_2.png')
    };

    static getImage(imageUrl) {
        if (imageUrl && imageUrl.startsWith('http')) {
            const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1, imageUrl.length);
            const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
            if (fileNameWithoutExtension && this.images[fileNameWithoutExtension]) {
                return this.images[fileNameWithoutExtension];
            } else {
                return {uri: imageUrl};
            }
        } else if (imageUrl && imageUrl.indexOf('base64') > -1) {
            return {uri: imageUrl};
        } else {
            if (this.images[imageUrl]) {
                return this.images[imageUrl];
            } else {
                return require('assets/images/ic_loading.png');
            }
        }
    }
}
