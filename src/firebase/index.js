import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyCQPyAijJ8ls0EN-Mi1c4-jPkj863hKvDk",
    authDomain: "quizapp-5281b.firebaseapp.com",
    databaseURL: "https://quizapp-5281b.firebaseio.com",
    projectId: "quizapp-5281b",
    storageBucket: "quizapp-5281b.appspot.com",
    messagingSenderId: "144096262049"
};
var fireBase = firebase.initializeApp(config);

export default fireBase;