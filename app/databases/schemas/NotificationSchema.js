export default {
    name: 'NotificationSchema',
    primaryKey: 'id',
    properties: {
        id: 'string',
        type: 'string',
        heading: 'string',
        content: 'string',
        url: 'string',
        timestamp: 'string',
        date: 'string',
        time: 'string',
        data: 'string',
        isRead: 'bool',
        isDelete: 'bool',
        extras: 'string?'
    }
}
