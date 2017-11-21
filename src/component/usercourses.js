
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

class UserCourses extends Component<{}> {
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

    handlePressed(i, val) {

        var keyforFetch = this.props.keyValue
        var indexCourse = this.state.coursesKeys[i]
        Actions.userOutline({ oneKey: indexCourse, courseName: val, i: i, keyforFetch: keyforFetch })
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
                                    <View>
                                        <Text>  </Text>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>
                    </Content>
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
                                                <CardItem style={{ width: width }} >
                                                    {/* <Icon size={size} active name="library-books" /> */}
                                                    <Text>{i + 1}.     </Text>
                                                    <Text adjustsFontSizeToFit numberOfLines={2}>{val.CourseName}</Text>
                                                </CardItem>
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


export default connect(mapStatetoProps)(UserCourses);

