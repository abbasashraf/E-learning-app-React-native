import fireBase from '../../firebase/index.js';


export class FieldAction {
    static ADDFIELD = "ADDFIELD"
    static FETCHDATA = "FETCHDATA"
    static FETCHCOURSESDATA = "FETCHCOURSESDATA"
    static FETCHOUTLINE = "FETCHOUTLINE"
    static REMOVEFIELD = "REMOVEFIELD"

    //  ADD field
    static addField(data) {
        return (dispatch) => {
            var dataRef = fireBase.database().ref('Field/').push({ FieldName: data });
            dataRef.then((data) => {
                dispatch(FieldAction.addFieldCo(data))
            }).catch((err) => {
                console.log(err)
            });
        }

    }
    //  ADD field state update 
    static addFieldCo(paylod) {
        return {
            type: FieldAction.ADDFIELD,
            payload
        }
    }
    // fetch data field 
    static fetchData() {
        return (dispatch) => {
            var dataRef = fireBase.database().ref('Field/');
            dataRef.on('value', (snapshot) => {
                var data = snapshot.val();
                var keys = []
                // var keys = [];
                var array = [];
                // array[keys[i]]
                for (var key in data) {
                    array.push(data[key]);
                    keys.push(key)
                }
                // console.log(keys,"keys")
                dispatch(FieldAction.fetchingDataCo(array, keys))
            })
        }
    }

    // fetch data field , state update
    static fetchingDataCo(payload, key) {
        //      console.log(key);
        return {
            type: FieldAction.FETCHDATA,
            payload,
            key

        }
    }
    // course ADD
    static addCourse(key, courseName) {
        console.log(key)
        return (dispatch) => {
            // var array = [];
            // var L = ""
            // // console.log(key);
            // var dataRef = fireBase.database().ref('courses/' + key);
            // dataRef.on('value', (snapshot) => {
            //     var data = snapshot.val();
            //     for (var key in data) {
            //         array.push(data[key]);
            //     }
            // })
            // L = array.length + 1;
            // console.log(L);

            var dataRef = fireBase.database().ref('Field/' + key).child("courses").push({ "CourseName": courseName })

        }
    }

    // fetch course
    static fethchCourses(key) {
        return (dispatch) => {

            var dataRef = fireBase.database().ref('Field/' + key).child("courses")
            dataRef.on('value', (snapshot) => {
                var keys = []
                var alldata = []
                var data = snapshot.val()
                for (let key in data) {
                    alldata.push(data[key]);
                    keys.push(key)

                }
                console.log(keys)
                console.log(alldata, "course wala data")
                dispatch(FieldAction.fetchingCourseCo(alldata, keys))
            })

        }
    }

    // fetch course state update
    static fetchingCourseCo(payload, keys) {
        // console.log(payload)
        return {
            type: FieldAction.FETCHCOURSESDATA,
            payload,
            keys
        }
    }

    // delete a Field
    static deleteField(index) {
        return (dispatch) => {
            fireBase.database().ref('Field/' + index).remove();
        }

    }

    // delete a course
    static deleteCourse(indexField, indexCourse) {
        return (dispatch) => {
            console.log(indexField, indexCourse)
            fireBase.database().ref('Field/' + indexField).child('courses/' + indexCourse).remove();
        }
    }
    // Add out line

    static addOutline(outLinename, courseName, i, keyforFetch) {

        return (dispatch) => {
            var allkeys = []
            var dataRef = fireBase.database().ref('Field/' + keyforFetch).child("courses")
            dataRef.on('value', (snapshot) => {
                var data = snapshot.val()
                for (let key in data) {
                    allkeys.push(key);
                }
            })
            fireBase.database().ref("AllOutLines/" + allkeys[i] + "/").child(courseName).push(outLinename)
        }
    }


    // fetch out line
    static fetchOutLine(key, courseName) {
        console.log(key, courseName)
        return (dispatch) => {
            var dataRef = fireBase.database().ref('AllOutLines/' + key).child("/" + courseName)
            dataRef.on('value', (snapshot) => {
                var allData = []
                var keys = []
                var data = snapshot.val()
                for (let key in data) {
                    allData.push(data[key]);
                    keys.push(key)
                }
                console.log(allData)
                dispatch(FieldAction.fetchOutLineCo(allData, keys))
            })
            // comment.....
        }
    }
    // fetch out line update
    static fetchOutLineCo(payload, keys) {
        return {
            type: FieldAction.FETCHOUTLINE,
            payload,
            keys
        }
    }

    static deleteOutLine(index,key,courseName){
        return (dispatch) => {
            fireBase.database().ref('AllOutLines/' + key).child("/" + courseName + "/" + index).remove()
        }
    }


}