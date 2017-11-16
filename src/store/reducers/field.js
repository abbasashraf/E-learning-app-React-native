import { FieldAction } from '../actions/field'

const INITIAL_STATE = {
    data: [],
    fetchData: [],
    key: [],
    courseData: [],
    outlineData: [],
    isfetchData: false,
    isfetchCourseData: false,
    isOutLineFetchData: false,
    coursesKeys: [],
    outLineKeys: []

}

export var FieldReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FieldAction.ADDFIELD:
            return { ...state, data: action.payload }
        case FieldAction.FETCHDATA:
            return { ...state, fetchData: action.payload, key: action.key, isfetchData: true }
        case FieldAction.FETCHCOURSESDATA:
        console.log(action.keys, "action.key coursess keyy in reducer")
            return { ...state, courseData: action.payload, isfetchCourseData: true, coursesKeys: action.keys }
        case FieldAction.FETCHOUTLINE:
            return { ...state, outlineData: action.payload, isOutLineFetchData: true, outLineKeys: action.keys }
        default:
            return state;
    }
}