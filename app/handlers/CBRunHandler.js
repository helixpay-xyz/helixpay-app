import TaskManager from 'controls/TaskManager';
import CBRun from 'services/CBRun';

export default class CBRunHandler {

    static tasks = null;

    static run() {
        this.tasks = new TaskManager();

        this.tasks.addTask(CBRun.runCheckPermission);
        this.tasks.addTask(CBRun.runCheckNotification);
        this.tasks.addTask(CBRun.runCheckUrl);
        this.tasks.addTask(CBRun.runCheckDynamicUrl);

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
