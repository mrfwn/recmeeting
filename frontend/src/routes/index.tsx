import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Profile from '../pages/Profile';
import Transcription from '../pages/Transcription';
import Dashboard from '../pages/Dashboard';
import Metric from '../pages/Metric';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/transcription" component={Transcription} isPrivate />
      <Route path="/metrics" component={Metric} isPrivate />
    </Switch>
  );
};

export default Routes;
