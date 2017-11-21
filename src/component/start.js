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
    TouchableOpacity,
    BackHandler
} from 'react-native';
// import { Header } from 'react-native-elements';\
import { Container, Header, Content, Tab, Tabs, Left, Body, Right, Icon, Title } from 'native-base';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import fireBase from '../firebase';




class Started extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            loader: false
        }
    }

    btnClose() {

        BackHandler.exitApp();
        return true;



    }
    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', function () {
    //         BackHandler.exitApp();
    //         console.log("backHandler running")
    //         //Actions.pop();
    //     });
    // }
    // componentWillUnmount() {
    //     console.log("Unmounting app, removing listeners");
    //     BackHandler.removeEventListener('hardwareBackPress');
    // }
    // componentWillReceiveProps() {
    //     console.log(nextProps, "nextProps")
    // }
    
    admin() {
        fireBase.auth().onAuthStateChanged(() => {

            if (fireBase.auth().currentUser) {
                Actions.home();

            }
            else {
                Actions.login();
            }
        })
    }

    render() {
        //console.log("start")
        return (



            <Container>

                <Content contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F5FCFF',
                }}>
                    <View style={{ position: "absolute", top: 16, right: 16 }}>
                        <TouchableOpacity  >


                            <Button onPress={this.btnClose.bind(this)}
                                buttunStyle={{ width: 40, justifyContent: "center", }}
                                textStyle={{ color: "black", textAlign: "center", fontSize: 20 }}
                                title={`x`}
                                backgroundColor="none"
                            >

                            </Button>


                        </TouchableOpacity>
                    </View>


                    <View style={styles.loginContainer}>
                        <Text style={{ color: "#ff4f00", fontSize: 22 }}>E-LearninG {'\n'} {'\n'} {'\n'}</Text>
                    </View>
                    <View>
                        <TouchableOpacity  >

                            <Button
                                raised
                                onPress={this.admin.bind(this)}
                                buttonStyle={{ width: 200, justifyContent: "center", backgroundColor: "#000080" }}
                                textStyle={{ color: "white", textAlign: "center" }}
                                title={`Admin`}
                            >
                            </Button>

                        </TouchableOpacity>

                        <View>
                            <Text>{'\n'}</Text>
                        </View>
                        <TouchableOpacity>
                            <Button
                                raised

                                onPress={() => Actions.userHome()}
                                buttonStyle={{ width: 200, justifyContent: "center", backgroundColor: "#ff4f00" }}
                                textStyle={{ color: "white", textAlign: "center" }}
                                title={`User`}
                            >
                            </Button>
                        </TouchableOpacity>
                    </View>

                </Content >
            </Container >
        );
    }
}

const styles = StyleSheet.create({

});


export default Started;

