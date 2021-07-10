import { combineReducers } from '@reduxjs/toolkit';

import studentReducer from '../features/students/studentsSlice';

const rootReducer = combineReducers({
  students: studentReducer,
});

export default rootReducer;
