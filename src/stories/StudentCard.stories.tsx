import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StudentCard from '../components/StudentCard';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default {
  title: 'StudentCard',
  component: StudentCard,
  argTypes: {},
} as ComponentMeta<typeof StudentCard>;

const Template: ComponentStory<typeof StudentCard> = args => (
  <Provider store={store}>
    <StudentCard {...args} />
  </Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  city: 'Fushë-Muhurr',
  company: 'Yadel',
  email: 'iorton0@imdb.com',
  firstName: 'Ingaberg',
  grades: ['78', '100', '92', '86', '89', '88', '91', '87'],
  id: '1',
  lastName: 'Orton',
  pic:
    'https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg',
  skill: 'Oracle',
};
