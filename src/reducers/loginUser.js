import {
    GET_LOGIN_USER_SUCCESS
} from "Actions/login";
export default (state = {
    Loggedin: 'false'

}, action) => {
    let newState;
    if (action.type === GET_LOGIN_USER_SUCCESS) {
        newState = {
            ...state,
            Loggedin: true
        }
        console.log('new State', newState);
    }
    return newState || state;
}