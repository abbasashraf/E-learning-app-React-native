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
    Alert
} from 'react-native';
import { Button, Container, Content, Card, Item, Label, Input, Spinner, Toast } from 'native-base';
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

class Fields extends Component<{}> {
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
        Actions.courses({ data: this.props.data[i], keyValue: this.props.keyData[i] })
        //console.log(this.props.keyData[i])
    }

    addPress() {
        this.state.adbtn ? this.setState({ adbtn: false }) : this.setState({ adbtn: true })
    }

    submitbutton() {
        var field = this.state.field
        if (field.trim() == "") {
            alert("please input the course name")
        } else {
            this.props.dispatch(FieldAction.addField(field))
            this.setState({ field: "" })
        }

    }
    longPressbtn(i) {
        Alert.alert(
            'Delete ',
            'Are you sure ?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'delete', onPress: () => this.delete(i) },

            ],
            { cancelable: false }
        )
    }

    delete(i) {
        // console.log('OK Pressed')
        var index = this.props.keyData[i]
        this.props.dispatch(FieldAction.deleteField(index))
    }
    render() {
        // console.log(this.props.data, "this.props.data field")
        // console.log(this.props.keyData, "this.props.data keyData")

        var data = this.props.data
        return (
            <Container>
                <Content contentContainerStyle={{backgroundColor:"white"}} >
                    <Button style={{
                        width: width - 30,
                        marginLeft: 15,
                        marginTop: 10,
                        marginBottom: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#008B8B"
                    }}
                        onPress={this.addPress.bind(this)}
                    >
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Add a Field</Text>
                    </Button>
                    {this.state.adbtn ? <View style={{
                        flexWrap: 'wrap',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flex: 1,
                        paddingLeft: 15
                    }}>

                        <Item floatingLabel style={{ marginLeft: 20, width: width - 100, marginLeft: 4 }}>
                            <Label>Add Field:</Label>
                            <Input value={this.state.field} onChange={ev => this.setState({ field: ev.nativeEvent.text })} />
                        </Item>
                        <Button info style={{ marginTop: 10, marginLeft: 14, backgroundColor: "#008B8B", }} onPress={this.submitbutton.bind(this)}>
                            <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>   Add   </Text></Button>
                    </View> : null}
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
                                            <TouchableOpacity key={i} onPress={this.handlePress.bind(this, i)} onLongPress={this.longPressbtn.bind(this, i)}>
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


export default connect(mapStateToProps, null)(Fields);

