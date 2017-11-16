/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Route from "./src/component/routes";
import { Provider } from 'react-redux';
import { store } from './src/store/index.js';


export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Route />

      </Provider>
    );
  }
}


