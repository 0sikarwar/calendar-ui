import {
    combineReducers
} from 'redux'
import {
    routerReducer
} from 'react-router-redux'
import loginUser from './loginUser'
import event from './event'

const rootReducer = combineReducers({
    routing: routerReducer,
    loginUser: loginUser,
    event: event
})

export default rootReducer