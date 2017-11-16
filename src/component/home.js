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
  View,
} from 'react-native';
import Fields from "./fields.js"
import AddField from './addField'
// import { Header } from 'react-native-elements';\
import { Container, Header, Content, Tab, Tabs, Left, Body, Right, Button, Icon, Title } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import { LogOutAction } from "../store/actions/logout";
import { Actions } from 'react-native-router-flux';



class Home extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  logOut() {
    this.props.dispatch(LogOutAction.logout())
    Actions.login()
  }
  render() {
    return (



      <Container>
        <Header
          style={{ backgroundColor: "#ff4f00" }}>
          <Left>
            <Button transparent>
              <Icon />
            </Button>
          </Left>
          <Body>
            <Title>Faculty</Title>
          </Body>
          <Right>
            <Button onPress={this.logOut.bind(this)} transparent>
              {/* <Icon name='menu' /> */}
              <Text style={{color:"white"}}>Logout</Text>

            </Button>
          </Right>
        </Header>

        <Content>
          <Fields />
          <ModalDropdown options={['option 1', 'option 2']}>

          </ModalDropdown>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});


export default connect()(Home);

