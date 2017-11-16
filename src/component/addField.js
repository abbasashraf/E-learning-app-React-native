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
    Dimensions
} from 'react-native';
import Fields from "./fields.js"
import { Container, Header, Content, Tab, Tabs, Left, Body, Right, Button, Icon, Title, Form, Item, Input, Label } from 'native-base';
var { height, width } = Dimensions.get('window');
import {FieldAction} from '../store/actions/field'
import {connect } from 'react-redux';



class AddField extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            field: ""
        }
    }

    submitbutton(){
        var field = this.state.field
        this.props.dispatch(FieldAction.addField(field))
    }
    render() {
        return (
            <Container>
                <Header
                    style={{ backgroundColor: "#ff4f00" }}>
                    <Left>
                        <Button onPress={()=>Actions.pop()} transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{
                    flex: 1,
                    justifyContent: "center", 
                    alignItems: "center", 
                    flexDirection: 'column'
                }}>
                    <View style={{
                        width: width - 40,
                        marginLeft: 20,
                        // justifyContent: "center", alignItems: "center"
                    }}>
                        <Form>
                            <Item floatingLabel>
                                <Label>Enter Field Name</Label>
                                <Input value={this.state.field} onChange={ev => this.setState({ field: ev.nativeEvent.text })} />
                            </Item>
                            <View>
                                <Text>{"\n"}</Text>
                            </View>
                            <Button onPress={this.submitbutton.bind(this)} block>
                                <Text>Submit</Text>
                            </Button>
                        </Form>
                    </View>
                </Content>

            </Container>
        );
    }
}

const styles = StyleSheet.create({

});


export default connect()(AddField);

