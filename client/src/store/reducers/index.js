import { combineReducers } from 'redux'

import userReducer from './userReducer'
import taskReducer from './taskReducer'

const reducers = combineReducers({
    user: userReducer,
    tasks: taskReducer,
})

export default reducers
