export default {
    STATUS_OK: 200,

    URI_TERMS_AND_CONDITIONS: '',

    URL_PATTERN: '',
    DYNAMIC_URL_PATTERN: '',

    APP_STORE_LINK: '',
    PLAY_STORE_LINK: '',
    MESSENGER_APP_STORE_LINK: 'https://apps.apple.com/us/app/messenger/id454638411',
    MESSENGER_PLAY_STORE_LINK: 'https://play.google.com/store/apps/details?id=com.facebook.orca',

    PHONE_NUMBER_REGEX_PATTERN: /^(0?)(3[2-9]|5[2|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
    CODE_REGEX_PATTERN: /[0-9]{6}$/,
    PASSWORD_REGEX_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
    EMAIL_REGEX_PATTERN: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    DATE_REGEX_PATTERN: /\d{4}-\d{2}-\d{2}/,
    TIME_REGEX_PATTERN: /\d{2}:\d{2}/,

    COUNTDOWN: 60,

    SERVICE_SCHEMA: 'ServiceSchema',
    NOTIFICATION_SCHEMA: 'NotificationSchema'
}
