export default class CBConverter {

    static convertService(array) {
        try {
            return array.map(i => ({
                id: String(i.id),
                code: String(i.get('code') || ''),
                name: String(i.get('name') || ''),
                description: String(i.get('description') || ''),
                special: String(i.get('special') || ''),
                status: Number(i.get('status') || 0),
                uri: String(i.get('uri') || ''),
                port: String(i.get('port') || ''),
                query: String(i.get('query') || ''),
                user: String(i.get('user') || ''),
                refId: String(i.get('refId') || ''),
                defaultParam: String(i.get('defaultParam') || ''),
                icon: String(i.get('icon') || ''),
                extra: String(i.get('extra') || ''),
                sortOrder: Number(i.get('sortOrder') || 0),
                language: String(i.get('language') || ''),
                created: String(i.createdAt.toISOString() || ''),
                updated: String(i.updatedAt.toISOString() || ''),
                extras: String(i.get('extras') || '')
            }));
        } catch (e) {
            return null;
        }
    }
}
