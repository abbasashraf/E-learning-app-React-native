import fireBase from '../../firebase/index.js';
import { Actions } from 'react-native-router-flux';

export class SigninAction {

    static LOGIN = "LOGIN";
    static LOGIN_SUCCESS = "LOGIN_SUCCESS";
    static LOGIN_UN_SUCCESS = "LOGIN_UN_SUCCESS";


    static login(credentials) {
        return (dispatch) => {
            fireBase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(function (res) {
                // alert("login success")
              
                dispatch(SigninAction.loginSuccess());
                Actions.home()
            }).catch((err) => {
                //alert(err.message)
                dispatch(SigninAction.loginUnSuccess(err.message));
            });
            dispatch({
                type: SigninAction.LOGIN
            })
        }
       
    }
    static loginSuccess() {
        return {
            type: SigninAction.LOGIN_SUCCESS,
            
        }
    }
    static loginUnSuccess(payload) {
        return {
            type: SigninAction.LOGIN_UN_SUCCESS,
            payload
         
        }
    }

}