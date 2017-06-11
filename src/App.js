import React, { Component } from 'react';
import {

} from 'react-native';
import CallNotification from './CallNotification';

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <CallNotification />
        );  
    }
}