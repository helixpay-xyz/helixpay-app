import Realm from 'realm';
import ServiceSchema from 'databases/schemas/ServiceSchema';
import NotificationSchema from 'databases/schemas/NotificationSchema';

const SCHEMA_VERSION = 0;

export default class CBDatabase {

    constructor() {
        this.realm = new Realm({
            //path: '/Users/daocongtan/Desktop/default.realm', // debug realm
            schema: [
                ServiceSchema,
                NotificationSchema
            ],
            schemaVersion: SCHEMA_VERSION,
            migration: (oldRealm, newRealm) => {

            }
        });
    }

    close() {
        if (this.realm && !this.realm.isClosed) {
            this.realm.close();
        }
    }

    create(schema, array, callback) {
        try {
            if (array && !Array.isArray(array)) array = [array];
            this.realm.write(() => {
                for (let i = 0; i < array.length; i++) {
                    this.realm.create(schema, array[i], Realm.UpdateMode.All);
                }
            });
            callback && callback(true);
        } catch (e) {
            callback && callback(false);
        }
    }

    read(schema, filter, sort) {
        let array = this.realm.objects(schema);
        if (filter) {
            array = array.filtered(filter);
        }
        if (sort) {
            array = array.sorted(sort);
        }
        return Array.from(array);
    }

    update(callback) {
        this.realm.write(() => {
            callback && callback();
        });
    }

    delete(schema, filter, sort) {
        this.realm.write(() => {
            let array = this.realm.objects(schema);
            if (filter) {
                array = array.filtered(filter);
            }
            if (sort) {
                array = array.sorted(sort);
            }
            this.realm.delete(array);
        });
    }

    remove(object, callback) {
        try {
            this.realm.write(() => {
                this.realm.delete(object);
            });
            callback && callback(true);
        } catch (e) {
            callback && callback(false);
        }
    }

    clear() {
        this.realm.write(() => {
            this.realm.deleteAll();
        });
    }
}
