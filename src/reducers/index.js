import {
    combineReducers
} from 'redux'
import {
    routerReducer
} from 'react-router-redux'
import loginUser from './loginUser'

const rootReducer = combineReducers({
    routing: routerReducer,
    loginUser: loginUser
})

export default rootReducer