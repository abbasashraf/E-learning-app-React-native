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
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Alert,
    BackHandler
} from 'react-native';
import { Button, Container, Content, Card, Item, Label, Input, Spinner, Toast, Header, Icon, Left, Right, Body, Title } from 'native-base';
var { height, width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
import { FieldAction } from '../store/actions/field'
import { connect } from 'react-redux';

function mapStateToProps(state) {
    //   console.log(state.FieldReducer.key)
    return {
        data: state.FieldReducer.fetchData,
        keyData: state.FieldReducer.key,
        isFetch: state.FieldReducer.isfetchData
    }
}

class UserHome extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            Array: [],
            adbtn: false,
            field: "",
        }
    }
    componentDidMount() {
        this.props.dispatch(FieldAction.fetchData())
    }




    handlePress(i) {
        // alert("alert on press")
        Actions.userCourses({ data: this.props.data[i], keyValue: this.props.keyData[i] })
        //console.log(this.props.keyData[i])
    }

    render() {
        // console.log(this.props.data, "this.props.data field")
        // console.log(this.props.keyData, "this.props.data keyData")
       // console.log("userHome")

        var data = this.props.data
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
                        <Title>Faculty</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={{ backgroundColor: "white" }} >
                    <View style={{ height: 100, }}>
                        <Card style={{ height: 100, alignItems: "center", justifyContent: "center" }}>
                            <View >
                                <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "bold" }}> here is all programs</Text>
                            </View>
                        </Card>
                    </View>

                    <Card>

                        {this.props.isFetch ?
                            data.length == 0 ? <View style={{
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: width,
                                height: height / 2
                            }}>
                                <Text>No records</Text>
                            </View> :

                                <View style={{
                                    flexWrap: 'wrap',
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                    flex: 1,
                                }}>

                                    {
                                        data.map((val, i) => (
                                            <TouchableOpacity key={i} onPress={this.handlePress.bind(this, i)}>
                                                <View style={{
                                                    width: Dimensions.get("window").width / 4 - 5.7,
                                                    height: 80,
                                                    margin: 2,

                                                }}>
                                                    <Card style={{
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        borderRadius: 2,
                                                        borderColor: "#ff4f00",
                                                        borderWidth: 1,
                                                    }}>
                                                        <Text
                                                            style={{
                                                                justifyContent: "center",
                                                                textAlign: "center",
                                                                alignItems: "center",

                                                                // textTransform: 'uppercase'
                                                            }}>{val.FieldName.toUpperCase()}</Text>
                                                    </Card>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            :
                            <Spinner color='#ff4f00' size={40} />}
                    </Card>


                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});


export default connect(mapStateToProps, null)(UserHome);

