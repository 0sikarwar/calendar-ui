import {
    GET_LOGIN_USER_SUCCESS,
    GET_LOGIN_USER_ERROR,
    NOT_REGISTERED_USER
} from "Actions/login";
import {
    GET_REGISTER_USER_SUCCESS,
    GET_REGISTER_USER_ERROR
} from "Actions/register";
export default (state = {
    loginStatus: 'false',
    submission: 'failed'

}, action) => {
    let newState;
    if (action.type === GET_LOGIN_USER_SUCCESS) {
        newState = {
            ...state,
            loginStatus: true,
            data: action.data,
            submission: 'success'

        }
        if (typeof (Storage) !== "undefined") {
            sessionStorage.setItem("userData", JSON.stringify(action.data));
        }
        window.location = '/'
    } else if (action.type === GET_LOGIN_USER_ERROR) {
        window.alert("Wrong PASSWORD try again")
        newState = {
            ...state,
            loginStatus: 'auth',
            submission: 'failed'
        }
    } else if (action.type === NOT_REGISTERED_USER) {
        newState = {
            ...state,
            loginStatus: 'invalid',
            data: action.data,
            submission: 'failed'
        }
    } else if (action.type === GET_REGISTER_USER_SUCCESS) {
        newState = {
            ...state,
            loginStatus: true,
            data: action.data,
            submission: 'success'
        }
        if (typeof (Storage) !== "undefined") {
            sessionStorage.setItem("userData", JSON.stringify(action.data));
        }
        window.location = '/'
    } else if (action.type === GET_REGISTER_USER_ERROR) {
        newState = {
            ...state,
            loginStatus: 'exists',
            submission: 'failed'
        }
        console.log('new State', newState);
    }
    return newState || state;
}