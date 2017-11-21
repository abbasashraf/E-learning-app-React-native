
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { SigninAction } from '../store/actions/login.js';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { Spinner } from 'native-base';

var { height, width } = Dimensions.get('window');
import fireBase from '../firebase';
import { Actions } from 'react-native-router-flux';



function mapStateToProps(state) {
    return {
        error: state.LoginReducer.errorMessage,
        isProcessing: state.LoginReducer.isProcessing
    }
}

class Login extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            loader: true
        }
    }
    // componentWillMount() {
    //     fireBase.auth().onAuthStateChanged(() => {
    //         if (fireBase.auth().currentUser) {
    //             Actions.home();
    //         }
    //         else {
    //             this.setState({
    //                 loader: false
    //             })
    //         }
    //     })
    // }
    loginSubmit() {
        var credentials = {};
        credentials.email = this.state.email
        credentials.password = this.state.pass
        // console.log(credentials)
        this.props.dispatch(SigninAction.login(credentials))
        //  this.setState({ email: "", pass: "" })

    }
    render() {
       // console.log("login")
        // console.log(this.props.error)
        const error = this.props.error ? this.props.error : ""
        return (
            <View style={styles.container} >


                <View style={styles.loginContainer}>
                    <Text style={{ color: "#ff4f00", fontSize: 22 }}>E-LearninG {'\n'} {'\n'} {'\n'}</Text>
                </View>

                
                        <View style={styles.box}>
                            <FormLabel ><Text style={{ fontSize: 16, color: "#6495ED" }}>Email</Text> </FormLabel>
                            <FormInput style={{
                                color: "black",
                                fontSize: 16
                            }}
                                onChange={ev => this.setState({ email: ev.nativeEvent.text })} />
                            {/* <FormValidationMessage>{this.props.error || ""}</FormValidationMessage> */}

                            <FormLabel><Text style={{ fontSize: 16, color: "#6495ED" }}>Password</Text> </FormLabel>
                            <FormInput style={{
                                color: "black",
                                fontSize: 16

                            }}
                                onChange={ev => this.setState({ pass: ev.nativeEvent.text })}
                                secureTextEntry />
                            {/* <Text>{this.props.isProcessing? "true" : "false"}</Text> */}
                            <FormValidationMessage>{error}</FormValidationMessage>
                            <View>
                                <Text>{"\n"}</Text>
                            </View>
                            <Button
                                loading={this.props.isProcessing ? true : false}
                                disabled={this.state.email.length >= 6 && this.state.pass.length >= 6 ? false : true}
                                raised
                                buttonStyle={{ backgroundColor: '#ff4f00', borderRadius: 0 }}
                                textStyle={{ textAlign: 'center' }}
                                title={`Login`}
                                onPress={
                                    this.loginSubmit.bind(this)
                                }
                            />
                        </View>


            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    box: {
        width: width - 20,
        justifyContent: 'center',
        marginLeft: 10


    }
});

export default connect(mapStateToProps)(Login);
