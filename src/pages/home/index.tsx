import { Card, Divider, List, ListItem, TextField } from '@material-ui/core';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import StudentCard from '../../components/StudentCard';
import {
  loadStudentsAction,
  searchByName,
  searchByTag,
} from '../../features/students/studentsSlice';
import { RootState } from '../../store/store';

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      borderColor: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderColor: 'grey',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: 'grey',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'grey',
      },
    },
  },
})(TextField);

const Home: FC = () => {
  const dispatch = useDispatch();
  const studentsData = useSelector(
    (state: RootState) => state.students.filteredStudentData,
  );

  useEffect(() => {
    dispatch(loadStudentsAction());
  }, []);

  return (
    <Container>
      <Wrapper>
        <Card className="card">
          <CssTextField
            id="name-input"
            placeholder="Search by name"
            className="name-search"
            onChange={e =>
              dispatch({
                type: searchByName.type,
                payload: { data: e.target.value },
              })
            }
          />
          <CssTextField
            id="tag-input"
            placeholder="Search by tag"
            className="tag-search"
            onChange={e =>
              dispatch({
                type: searchByTag.type,
                payload: { data: e.target.value },
              })
            }
          />
          <List component="nav" className="card-list">
            {studentsData.map((student, index) => (
              <div key={index}>
                <ListItem>
                  <StudentCard
                    city={student.city}
                    company={student.company}
                    email={student.email}
                    firstName={student.firstName}
                    grades={student.grades}
                    id={student.id}
                    lastName={student.lastName}
                    pic={student.pic}
                    skill={student.skill}
                    tags={student.tags}
                  />
                </ListItem>
                {index !== studentsData.length - 1 ? <Divider /> : <></>}
              </div>
            ))}
          </List>
        </Card>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  .card {
    border-radius: 7px;
  }

  .name-search {
    width: 97%;
    margin: 15px 10px;
    border-color: #dcdcdc;
  }
  .tag-search {
    width: 97%;
    margin: 0px 10px 20px;
    border-color: #dcdcdc;
  }

  .card-list {
    height: 500px;
    overflow-y: auto;
  }
`;

export default Home;
