/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Fields from "./fields.js"
import AddField from './addField';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Tab, Tabs, Left, Body, Right, Button, Title, Card, CardItem, Item, Label, Input, Spinner, } from 'native-base';
var { height, width } = Dimensions.get('window');
import { connect } from 'react-redux';
import { FieldAction } from '../store/actions/field';
import Icon from 'react-native-vector-icons/MaterialIcons';


function mapStateToProps(state) {
  console.log(state.FieldReducer.outlineData)
  return {
    data: state.FieldReducer.outlineData,
    isFetch: state.FieldReducer.isOutLineFetchData,
    keys: state.FieldReducer.outLineKeys
  }
}



class Outline extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      adbtn: false,
      outLine: "",
      data: []
    }
  }


  handleAddOutline() {
    var keyforFetch = this.props.keyforFetch
    var i = this.props.i
    var outLinename = this.state.outLine
    var courseName = this.props.courseName
    var key = this.props.oneKey

    if (outLinename.trim() == "") {
      alert("please insert the outline name")
    } else {

      this.props.dispatch(FieldAction.addOutline(outLinename, courseName, i, keyforFetch))
    }

  }

  componentDidMount() {
    var key = this.props.oneKey
    var courseName = this.props.courseName
    this.props.dispatch(FieldAction.fetchOutLine(key, courseName))
    setTimeout(() => {

    }, 500)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }
  coomponentWillUnmount() {

    this.setState({
      data: []
    })
  }
  outlineDelete(i) {
    var key = this.props.oneKey
    var courseName = this.props.courseName
    var index = this.props.keys[i]
    this.props.dispatch(FieldAction.deleteOutLine(index, key, courseName))
  }
  render() {
    console.log(this.props.data, "outline data in component")
    var data = this.state.data
    var name = this.props.courseName
    // var key = this.props.oneKey
    // console.log(name, key, "name, key")
    console.log(this.props.keys, "keyyyyyyssss")
    console.log(this.state.outLine.length)

    return (
      <Container>
        <Header
          style={{ backgroundColor: "#ff4f00" }}>
          <Left>
            <Button onPress={() => Actions.pop()} transparent>
              <Icon size={26} style={{ color: "white" }} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Outline</Title>
          </Body>
          <Right>
            <Button transparent>
              {/* <Icon name='menu' /> */}
            </Button>
          </Right>
        </Header>
        <Content>
          <Content >
            <View>
              <Card >
                <CardItem style={{ borderColor: "#ff4f00", borderWidth: 1 }} >
                  {/* <Icon name='person' size={30} /> */}
                  <Body style={{ justifyContent: 'center', alignItems: "center", }}>
                    <Text style={{ color: "black", fontSize: 22 }}>{name.toUpperCase()}</Text>
                    <Text style={{ color: "black" }}>{data.length}</Text>
                  </Body>
                  <Button info onPress={() => this.state.adbtn ? this.setState({ adbtn: false }) : this.setState({ adbtn: true })}><Text style={{ fontSize: 14, }}>  Add Outline  </Text></Button>
                  <View>
                    <Text>  </Text>
                  </View>
                </CardItem>
              </Card>
            </View>

            {this.state.adbtn ?
              <View style={{
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                flexDirection: 'row',
                flex: 1,
                paddingLeft: 15
              }}>

                <Item floatingLabel style={{ width: width - 100, marginLeft: 4 }}>
                  <Label>Add OutLine:</Label>
                  <Input value={this.state.outLine} onChange={ev => this.setState({ outLine: ev.nativeEvent.text })} />
                </Item>
                <Button onPress={this.handleAddOutline.bind(this)} info rounded style={{ marginTop: 10, marginLeft: 14 }}><Text style={{ fontSize: 14, }}>   Add   </Text></Button>
              </View> : null}
          </Content>



          {this.props.isFetch ? data.length == 0 ?
            <Card>
              <CardItem>
                <Text>No Records of Outline</Text>
              </CardItem>
            </Card> :
            <Card>
              <CardItem header>
                <Text>Courese Outline</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Card>

                    {data.map((val, i) =>
                      (
                        <View key={i} style={{
                          flexWrap: 'wrap',
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          borderBottomWidth: 0.5,
                          borderColor: "#ff4f00"
                        }}>
                          <TouchableOpacity style={{ backgroundColor: "#ff4f00" }}>
                            <CardItem style={{ width: width - 78, }} >
                              <Text>{i + 1}.     </Text>
                              <Text adjustsFontSizeToFit numberOfLines={2}>{val}</Text>
                            </CardItem>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={this.outlineDelete.bind(this, i)} >
                            <Right style={{
                              alignItems: "center",
                              justifyContent: "center",
                              // flexDirection: "column"
                              width: 30
                            }}>
                              <Icon size={20} name="delete" />
                            </Right>
                          </TouchableOpacity>

                        </View>

                      )
                    )}
                  </Card>

                </Body>
              </CardItem>

            </Card> : <View>
              <Spinner color='#ff4f00' size={40} />
            </View>}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});


export default connect(mapStateToProps)(Outline);

