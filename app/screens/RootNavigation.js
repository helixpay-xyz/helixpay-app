export default class RootNavigation {

    static screens = require('assets/jsons/screens.json');
    static navigation;
    static route;

    static isAvailable() {
        return this.navigation !== null && this.navigation !== undefined && this.route !== null && this.route !== undefined;
    }

    static setNavigation(navigation) {
        this.navigation = navigation;
    }

    static setRoute(route) {
        this.route = route;
    }

    static getRouteName() {
        const {name} = this.route;
        return name;
    }

    static navigate(...args) {
        if (this.screens.includes(args[0])) {
            this.navigation.navigate(...args);
        } else {
            this.navigation.navigate('Empty');
        }
    }

    static push(...args) {
        if (this.screens.includes(args[0])) {
            this.navigation.push(...args);
        } else {
            this.navigation.navigate('Empty');
        }
    }

    static replace(...args) {
        this.navigation.replace(...args);
    }

    static pop(...args) {
        this.navigation.pop(...args);
    }

    static callback(name, data) {
        const {params = {}} = this.route;
        if (params[name]) params[name](data);
    }

    static goBack() {
        this.navigation.goBack();
    }

    static goHome() {
        this.navigation.navigate('Home');
    }
}
