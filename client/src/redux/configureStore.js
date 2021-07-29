import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import patientsReducer from './features/patients';
import commentReducer from './features/comments';
import statusesReducer from './features/statuses'




const logger = createLogger({
  diff: true,
  collapsed: true
})

export const store = createStore(
  combineReducers({
    patients: patientsReducer,
    comments: commentReducer,
    statuses: statusesReducer
  }),
  applyMiddleware(thunk,logger)
)