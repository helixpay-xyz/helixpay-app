import {makeAutoObservable} from 'mobx';

class AppStore {

    mode = 'AuthLoading';

    constructor() {
        makeAutoObservable(this);
    }

    setMode(mode) {
        this.mode = mode;
    }

    reset() {

    }

    clear() {
        this.mode = 'AuthLoading';
    }
}

export default new AppStore();
