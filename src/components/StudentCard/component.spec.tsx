import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';

import StudentCard from './index';
import renderWithRedux from '../../renderWithRedux';

test('renders a message', () => {
  const MOCK_IMAGE =
    'https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg';
  const MOCK_EMAIL = 'iorton0@imdb.com';
  const MOCK_COMPANY = 'Yadel';
  const MOCK_SKILL = 'Oracle';
  const MOCK_FIRSTNAME = 'Ingaberg';
  const MOCK_LASTNAME = 'Orton';
  const MOCK_GRADES = ['78', '100', '92', '86', '89', '88', '91', '87'];

  const { container, getByText } = renderWithRedux(
    <StudentCard
      city={'Fushë-Muhurr'}
      company={MOCK_COMPANY}
      email={MOCK_EMAIL}
      firstName={MOCK_FIRSTNAME}
      grades={MOCK_GRADES}
      id={'1'}
      lastName={MOCK_LASTNAME}
      pic={MOCK_IMAGE}
      skill={MOCK_SKILL}
      tags={[]}
    />,
  );
  //Match the snapshot for content change
  expect(container.firstChild).toMatchSnapshot();
  //Check if all student data is rendered
  expect(
    getByText(`${MOCK_FIRSTNAME.toUpperCase()} ${MOCK_LASTNAME.toUpperCase()}`),
  ).toBeTruthy();

  expect(getByText(`Email: ${MOCK_EMAIL}`)).toBeTruthy();
  expect(getByText(`Company: ${MOCK_COMPANY}`)).toBeTruthy();
  expect(getByText(`Skill: ${MOCK_SKILL}`)).toBeTruthy();

  //Should be able to expand contents with button press
  fireEvent.click(screen.getByText('+'));

  //Check if all grades are visible when expanded
  MOCK_GRADES.map((grade, index) => {
    expect(getByText(`Test ${index + 1}:`)).toBeTruthy();
    expect(getByText(`${grade}%`)).toBeTruthy();
  });

  //Should be able to hide the grades
  fireEvent.click(screen.getByText('-'));
});
