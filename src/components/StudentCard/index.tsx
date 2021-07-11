import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';

import { addTag, StudentState } from '../../features/students/studentsSlice';
import { CssTextField } from '../../pages/home';
import { Button } from '@material-ui/core';

const StudentCard: FC<StudentState> = ({
  city,
  company,
  email,
  firstName,
  grades,
  id,
  lastName,
  pic,
  skill,
  tags,
}: StudentState) => {
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);
  const [tagValue, setTagValue] = useState('');

  const calculateAverage = () => {
    var sum = 0;
    for (var i = 0; i < grades.length; i++) {
      sum += parseFloat(grades[i]);
    }
    return sum / grades.length;
  };

  const DropdownContainer = () => (
    <>
      {grades.map((grade, index) => (
        <GradeContainer key={index}>
          <Typography>Test {index + 1}:</Typography>
          <Typography className="grade">{grade}%</Typography>
        </GradeContainer>
      ))}
    </>
  );

  const Tags = () => {
    return (
      <>
        <TagContainer>
          {tags && tags.length > 0 ? (
            tags.map((tag, index) => (
              <TagWrapper key={index}>
                <Typography>{tag}</Typography>
              </TagWrapper>
            ))
          ) : (
            <></>
          )}
        </TagContainer>
        <CssTextField
          focused
          placeholder="Add a tag"
          className="add-tag-input"
          value={tagValue}
          onChange={e => setTagValue(e.target.value)}
          onKeyPress={e => {
            if (e.keyCode || e.which === 13) {
              dispatch({
                type: addTag.type,
                payload: { data: { tag: tagValue, id } },
              });
              setTagValue('');
            }
          }}
        />
      </>
    );
  };

  return (
    <Container>
      <ImageWrapper src={pic} alt={'Student-pic'} />
      <Wrapper>
        <Typography variant="h4">
          <b>
            {firstName.toUpperCase()} {lastName.toUpperCase()}
          </b>
        </Typography>
        <StudentData>
          <Typography>Email: {email}</Typography>
          <Typography>Company: {company}</Typography>
          <Typography>Skill: {skill}</Typography>
          <Typography>Average: {calculateAverage()}%</Typography>
          {/** Dropdown with grades is shown only when clicked on + */}
          <DropdownWrapper>
            <Collapse in={isSelected}>
              <DropdownContainer />
            </Collapse>
          </DropdownWrapper>
          {/** Show tags horizontally when the user has added tag for each student */}
          {isSelected ? Tags() : <></>}
        </StudentData>
      </Wrapper>
      <Button
        disableRipple
        className="expand-btn"
        onClick={() => setIsSelected(val => !val)}>
        {!isSelected ? '+' : '-'}
      </Button>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  .expand-btn {
    position: absolute;
    cursor: pointer;
    font-size: 50px;
    font-weight: bold;
    color: grey;
    height: 0em;
    margin-left: auto;
    margin-top: 10px;
    right: 0;
    background: transparent;
  }
  .expand-btn:hover {
    background-color: #fff;
  }
`;

const ImageWrapper = styled.img`
  width: 80px;
  height: 80px;
  border: 1px solid grey;
  border-radius: 40px;
  margin: 10px 0;
`;

const Wrapper = styled.div`
  margin: 0 40px;
`;

const StudentData = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 12px;
  span {
    margin: 2px 0;
  }

  .add-tag-input {
    margin: 10px 0;
  }
`;

const DropdownWrapper = styled.div`
  margin: 20px 0 0 0;
`;

const GradeContainer = styled.div`
  display: flex;
  flex-direction: row;
  .grade {
    margin-left: 22px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TagWrapper = styled.div`
  background-color: #dcdcdc;
  margin-right: 10px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
`;

export default StudentCard;
