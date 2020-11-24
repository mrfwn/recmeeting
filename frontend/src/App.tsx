import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvaider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AppProvaider>
      <Routes />
    </AppProvaider>
    <GlobalStyle />
  </Router>
);
export default App;
