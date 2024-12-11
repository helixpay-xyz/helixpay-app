import React, {Component} from 'react';
import DropdownAlertHolder from '../../DropdownAlertHolder';
import DialogAlertHolder from '../../DialogAlertHolder';
import RootNavigation from 'screens/RootNavigation';
import JsonUtil from 'utils/JsonUtil';
import {ThemeContext} from 'react-native-elements';

export default class Base extends Component {

    static contextType = ThemeContext;

    defaultParam = {};

    constructor(props) {
        super(props);
        this.setDefaultParam(props.route);
    }

    componentDidMount() {
        const {navigation, route} = this.props;
        this.focusSubscription = navigation.addListener('focus', this.handleFocusSubscription);
        this.blurSubscription = navigation.addListener('blur', this.handleBlurSubscription);
        this.setNavigation(navigation, route);
        this.setOptions(navigation, route);
        this.setEvents(navigation);
        this.setDefaultParam(route);
    }

    setNavigation(navigation, route) {
        RootNavigation.setNavigation(navigation);
        RootNavigation.setRoute(route);
    }

    handleFocusSubscription = () => {
        const {navigation, route} = this.props;
        this.setNavigation(navigation, route);
        this.setDefaultParam(route);
        this.componentFocus();
    };

    handleBlurSubscription = () => {
        this.componentBlur();
    };

    setOptions(navigation, route) {

    }

    setEvents(navigation) {

    }

    setDefaultParam(route) {
        const {params = {}} = route;
        this.defaultParam = JsonUtil.parseJsonString(params.defaultParam);
    }

    getParam(name, defaultValue) {
        const {route} = this.props;
        const {params = {}} = route;
        return params[name] !== undefined && params[name] !== null ? params[name] : defaultValue;
    }

    setParams(params) {
        const {navigation} = this.props;
        navigation.setOptions(params);
    }

    componentFocus() {

    }

    componentBlur() {

    }

    componentWillUnmount() {
        this.focusSubscription();
        this.blurSubscription();
    }

    alertWithType(...args) {
        DropdownAlertHolder.alertWithType(...args);
    }

    alert(...args) {
        DialogAlertHolder.alert(...args);
    }

    dismiss() {
        DialogAlertHolder.dismiss();
    }

    render() {
        return null;
    }
}
