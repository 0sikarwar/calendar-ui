export const ADD_NEW_USER = 'ADD_NEW_USER';
export const GET_REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const GET_REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const addNewUser = userData => {
    return {
        type: ADD_NEW_USER,
        data: userData
    }
}

export const getRegisterUserSuccess = userData => {
    console.log('getRegisterUserSuccess')
    return {
        type: GET_REGISTER_USER_SUCCESS,
        data: userData
    }
}
export const getRegisterUserError = userData => {
    console.log('getRegisterUserError')
    return {
        type: GET_REGISTER_USER_ERROR,
        data: userData
    }
}