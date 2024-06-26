import {combineReducers} from 'redux'
import LoginReducer from './LoginReducer'
const rootReducer=combineReducers({
    loginId:LoginReducer
})

export default rootReducer