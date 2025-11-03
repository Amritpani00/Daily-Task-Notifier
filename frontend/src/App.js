import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import TaskPage from './components/TaskPage';
import AnalyticsPage from './components/AnalyticsPage';
import PrivateRoute from './components/PrivateRoute';
import Notification from './components/Notification';

function App() {
  return (
    <Router>
      <Notification />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <PrivateRoute path="/tasks" component={TaskPage} />
        <PrivateRoute path="/analytics" component={AnalyticsPage} />
        <Redirect from="/" to="/tasks" />
      </Switch>
    </Router>
  );
}

export default App;
