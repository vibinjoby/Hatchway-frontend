import { FC } from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import AppRouter from './router/AppRouter';
import './App.css';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
