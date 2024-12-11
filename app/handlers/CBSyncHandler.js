import TaskManager from 'controls/TaskManager';
import CBSync from 'services/CBSync';
import CBPush from 'services/CBPush';

export default class CBSyncHandler {

    static tasks = null;

    static sync() {
        this.tasks = new TaskManager();
        this.tasks.MAX_RUNNING_TASK = 2;

        this.tasks.addTask(CBSync.syncService);
        this.tasks.addTask(CBSync.syncProfile);
        this.tasks.addTask(CBSync.syncNotification);
        this.tasks.addTask(CBSync.syncUnreadNotification);
        this.tasks.addTask(CBSync.syncOSNotification);
        this.tasks.addTask(CBSync.syncComplete);

        this.tasks.addTask(CBPush.pushOSToken);
        this.tasks.addTask(CBPush.pushFCMToken);

        this.tasks.doTask(() => {
            this.tasks.clear();
        });
    }

    static clear() {
        if (this.tasks) {
            this.tasks.clear();
            this.tasks = null;
        }
    }
}
