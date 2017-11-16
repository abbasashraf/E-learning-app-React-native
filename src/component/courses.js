
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { Container, Header, Content, Tab, Tabs, Left, Body, Right, Button, Title, Card, CardItem, Item, Label, Input, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
var { height, width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { FieldAction } from '../store/actions/field'


function mapStatetoProps(state) {
    // console.log(state.FieldReducer.courseData, "state.FieldReducer.courseData")
    return {
        DataCourse: state.FieldReducer.courseData,
        isFetchData: state.FieldReducer.isfetchCourseData,
        coursesKeys: state.FieldReducer.coursesKeys
    }
}

class Courses extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            array: ["course ", "course ", "course ", "course ", "course ", "course ", "course ", "course ", "course ", "course ", "course ", "course ", "course ", "course ", "course ", "course "],
            adbtn: false,
            courseName: "",
            DataCourse: [],
            coursesKeys: [],
            isFetchData: false
        }
    }

    addCourse() {
        var key = this.props.keyValue
        var name = this.state.courseName

        if (name.trim() == "") {
            alert("please input the course name")
        } else {
            this.props.dispatch(FieldAction.addCourse(key, name))
            this.setState({ courseName: "" })
        }
    }

    componentDidMount() {
        var key = this.props.keyValue
        this.props.dispatch(FieldAction.fethchCourses(key))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            DataCourse: nextProps.DataCourse,
            coursesKeys: nextProps.coursesKeys,
            isFetchData: nextProps.isFetchData
        })
    }

    deleteCourse(i) {
        indexField = this.props.keyValue
        indexCourse = this.state.coursesKeys[i]
        this.props.dispatch(FieldAction.deleteCourse(indexField, indexCourse))
    }
    handlePressed(i, val) {

        var keyforFetch = this.props.keyValue
        var indexCourse = this.state.coursesKeys[i]
        Actions.outline({ oneKey: indexCourse, courseName: val, i: i, keyforFetch: keyforFetch })
    }
    componentWillUnmount() {
        this.setState({
            DataCourse: [],
            coursesKeys: [],
            isFetchData: false
        })
    }
    render() {


        fieldName = this.props.data.FieldName
        var data = this.state.DataCourse || []
        var size = 26

        return (
            <Container>
                <Header style={{
                    backgroundColor: "#ff4f00",
                }}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon size={size} style={{ color: "white" }} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: "white" }}  >Courses</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            {/* <Icon size={size} style={{ color: "white" }} name='menu' /> */}
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
                                        <Text style={{ color: "black", fontSize: 22 }}>{fieldName.toUpperCase()}</Text>
                                        <Text style={{ color: "black" }}>{data.length}</Text>
                                    </Body>
                                    <Button info onPress={() => this.state.adbtn ? this.setState({ adbtn: false }) : this.setState({ adbtn: true })}><Text style={{ fontSize: 14, }}>  Add Course  </Text></Button>
                                    <View>
                                        <Text>  </Text>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>
                    </Content>



                    {this.state.adbtn ?
                        <View style={{
                            flexWrap: 'wrap',
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            flex: 1,
                            paddingLeft: 15
                        }}>

                            <Item floatingLabel style={{ width: width - 100, marginLeft: 4 }}>
                                <Label>Add Course:</Label>
                                <Input value={this.state.courseName} onChange={ev => this.setState({ courseName: ev.nativeEvent.text })} />
                            </Item>
                            <Button onPress={this.addCourse.bind(this)} info rounded style={{ marginTop: 10, marginLeft: 14 }}><Text style={{ fontSize: 14, }}>   Add   </Text></Button>
                        </View> : null}


                    {this.state.isFetchData ?
                        data.length == 0 ?
                            <View style={{
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: width,
                                height: height / 2
                            }}>
                                <Text>
                                    No Records
                            </Text>
                            </View> : <View>
                                <Card>
                                    {data.map((val, i) => (
                                        <View key={i} style={{
                                            flexWrap: 'wrap',
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                            borderBottomWidth: 0.5,
                                            borderColor: "#ff4f00"
                                        }}>
                                            <TouchableOpacity style={{ backgroundColor: "#ff4f00" }} onPress={this.handlePressed.bind(this, i, val.CourseName)} >
                                                <CardItem style={{ width: width - 54, }} >
                                                    {/* <Icon size={size} active name="library-books" /> */}
                                                    <Text>{i + 1}.     </Text>
                                                    <Text adjustsFontSizeToFit numberOfLines={2}>{val.CourseName}</Text>
                                                </CardItem>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={this.deleteCourse.bind(this, i)}>
                                                <Right style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexDirection: "column"
                                                }}>
                                                    <Icon size={size} name="delete" />
                                                </Right>
                                            </TouchableOpacity>

                                        </View>
                                    ))}
                                </Card>
                            </View> :
                        <View>
                            <Spinner color='#ff4f00' size={40} />
                        </View>}

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});


export default connect(mapStatetoProps)(Courses);

