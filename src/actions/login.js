export const LOGIN_USER = 'LOGIN_USER';
export const GET_LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const GET_LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const NOT_REGISTERED_USER = 'NOT_REGISTERED_USER'
export const RESET_LOGIN_USER = 'RESET_LOGIN_USER';

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

export const getLoginUserError = userData => {
    console.log('getLoginUserError')
    return {
        type: GET_LOGIN_USER_ERROR,
        data: userData
    }
}

export const sentToRegisterPage = userData => {
    console.log('sentToRegisterPage')
    return {
        type: NOT_REGISTERED_USER,
        data: userData
    }
}

export const resetLoginUser = () => ({
    type: RESET_LOGIN_USER
})