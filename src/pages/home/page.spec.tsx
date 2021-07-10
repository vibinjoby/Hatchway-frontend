import '@testing-library/jest-dom/extend-expect';
import Home from './index';
import renderWithRedux from '../../renderWithRedux';

test('renders a message', () => {
  const { container } = renderWithRedux(<Home />);
  expect(container.firstChild).toMatchSnapshot();
});
