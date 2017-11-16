
import fireBase from '../../firebase';

export class LogOutAction {
    static LOGOUT = "LOGOUT";
    static LOGOUT_SUCCESS = "LOGOUT_SUCCESS";




    static logout(){
        return (dispatch)=>{
             fireBase.auth().signOut().then(function () {
                dispatch(LogOutAction.logoutSuccess());
               // alert("logut succes")
            })
        }
    }

    static logoutSuccess(){
        return {
            type: LogOutAction.LOGOUT_SUCCESS
        }
    }
}