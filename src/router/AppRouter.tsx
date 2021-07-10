import { FC } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../pages/home';

const AppRouter: FC = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/home" component={Home} />
    </Router>
  );
};

export default AppRouter;
