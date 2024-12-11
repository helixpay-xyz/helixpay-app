export default {
    name: 'ServiceSchema',
    primaryKey: 'id',
    properties: {
        id: 'string',
        code: 'string',
        name: 'string',
        description: 'string',
        special: 'string',
        status: 'int',
        uri: 'string',
        port: 'string',
        query: 'string',
        user: 'string',
        refId: 'string',
        defaultParam: 'string',
        icon: 'string',
        extra: 'string',
        sortOrder: 'int',
        language: 'string',
        created: 'string',
        updated: 'string',
        extras: 'string?'
    }
}
