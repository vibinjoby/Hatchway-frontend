import { createSlice } from '@reduxjs/toolkit';

import { fetchAllStudents } from '../../network/StudentService';
import { apiCallBegan } from '../../store/actions/api';
import { store } from '../../store/store';

export interface StudentState {
  city: string;
  company: string;
  email: string;
  firstName: string;
  grades: Array<string>;
  id: string;
  lastName: string;
  pic: string;
  skill: string;
  tags?: Array<string>;
}

interface State {
  studentData: Array<StudentState>;
  filteredStudentData: Array<StudentState>;
}

const initialState: State = {
  studentData: [],
  filteredStudentData: [],
};

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    loadStudents: (state: State, action) => {
      const { data } = action.payload;
      state.studentData = data.students;
      state.filteredStudentData = data.students;
    },
    searchByName: (state: State, action) => {
      const { data } = action.payload;
      if (!data) state.filteredStudentData = state.studentData;
      else {
        state.filteredStudentData = state.studentData.filter(
          student =>
            student.firstName.toLowerCase().includes(data) ||
            student.lastName.toLowerCase().includes(data),
        );
      }
    },
    addTag: (state: State, action) => {
      const { data } = action.payload;

      state.studentData.map(student => {
        if (student.id === data.id) {
          if (student.tags && student.tags.length > 0) {
            student.tags.push(data.tag);
          } else {
            student.tags = [];
            student.tags.push(data.tag);
          }
        }
        return student;
      });

      state.filteredStudentData = state.studentData;
    },
    searchByTag: (state: State, action) => {
      const { data } = action.payload;
      if (!data) state.filteredStudentData = state.studentData;
      else {
        state.filteredStudentData = state.studentData.filter(student =>
          student.tags?.find(tag => tag.includes(data)),
        );
      }
    },
  },
});

export const {
  loadStudents,
  searchByName,
  addTag,
  searchByTag,
} = studentsSlice.actions;

export default studentsSlice.reducer;

export const loadStudentsAction = () => (dispatch: typeof store.dispatch) => {
  dispatch({
    type: apiCallBegan.type,
    payload: {
      apiMethod: fetchAllStudents,
      onSucess: [loadStudents.type],
    },
  });
};
