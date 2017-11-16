import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Router, Scene } from 'react-native-router-flux';
import Home from './home';
import Login from './login';
import Courses from "./courses";
import AddField from "./addField";
import Outline from './outline'




export default class Route extends Component {

    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='login' component={Login} initial='true'  hideNavBar='true' />
                    <Scene key='home' component={Home}   hideNavBar='true' />
                    <Scene key='courses' component={Courses}  hideNavBar='true' />
                    <Scene key='addfield' component={AddField}  hideNavBar='true' />
                    <Scene key='outline' component={Outline}  hideNavBar='true' />
                </Scene>
            </Router>
        );
    }
 
}