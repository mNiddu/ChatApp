import {combineReducers} from 'redux'
import LoginReducer from './LoginRedux/LoginReducer'
import ContactReducer from './ContactList/ContactReducer'

const rootReducer=combineReducers({
    loginId:LoginReducer,
    contactList:ContactReducer,
})

export default rootReducer