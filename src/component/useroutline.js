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



class UserOutline extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      adbtn: false,
      outLine: "",
      data: []
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
  render() {
    //console.log(this.props.data, "outline data in component")
    // var key = this.props.oneKey
    // console.log(name, key, "name, key")
    //console.log(this.props.keys, "keyyyyyyssss")
    //console.log(this.state.outLine.length)
    var data = this.state.data
    var name = this.props.courseName

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
                  <View>
                    <Text>  </Text>
                  </View>
                </CardItem>
              </Card>
            </View>
          </Content>



          {this.props.isFetch ? data.length == 0 ?
            <Card>
              <CardItem>
                <Text>No Records of Outline</Text>
              </CardItem>
            </Card> :
            <Card>
              <CardItem header>
                <Text>Course Outline</Text>
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
                            <CardItem style={{ width: width - 20, }} >
                              <Text>{i + 1}.     </Text>
                              <Text adjustsFontSizeToFit numberOfLines={2}>{val}</Text>
                            </CardItem>
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


export default connect(mapStateToProps)(UserOutline);

