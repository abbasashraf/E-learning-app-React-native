import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Router, Scene } from 'react-native-router-flux';
import Home from './home';
import Login from './login';
import Courses from "./courses";
import AddField from "./addField";
import Outline from './outline';
import Started from "./start";
import UserHome from "./userhome";
import UserCourses from "./usercourses";
import UserOutline from "./useroutline"




export default class Route extends Component {

    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='start' component={Started}  initial='true'  hideNavBar='true' />
                    <Scene key='userHome' component={UserHome} hideNavBar='true' />
                    <Scene key='userCourses' component={UserCourses} hideNavBar='true' />
                    <Scene key='userOutline' component={UserOutline}  hideNavBar='true' />
                    
                    
                    <Scene key='login' component={Login}  hideNavBar='true' />
                    <Scene key='home' component={Home} hideNavBar='true' />
                    <Scene key='courses' component={Courses} hideNavBar='true' />
                    <Scene key='addfield' component={AddField} hideNavBar='true' />
                    <Scene key='outline' component={Outline} hideNavBar='true' />
                </Scene>
            </Router>
        );
    }

}