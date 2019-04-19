export const LOGIN_USER = 'LOGIN_USER';
export const GET_LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const GET_LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const loginUser = userData => {
    return {
        type: LOGIN_USER,
        data: userData
    }
}

export const getLoginUserSuccess = userData => {
    console.log('getLoginUserSuccess')
    return {
        type: GET_LOGIN_USER_SUCCESS,
        data: userData
    }
}