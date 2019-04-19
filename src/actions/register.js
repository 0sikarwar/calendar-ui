export const ADD_NEW_USER = 'ADD_NEW_USER';
export const GET_REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const GET_REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const addNewUser = userData => {
    return {
        type: ADD_NEW_USER,
        data: userData
    }
}