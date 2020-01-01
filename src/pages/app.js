import React from 'react';
import { Router } from '@reach/router';
import Provider from 'providers/Provider';
import AppWrapper from 'components/AppWrapper';
import App from 'components/App';
import Screams from 'components/screams';
import Scream from 'components/scream';
import Task from 'components/Task';
import Tasks from 'components/Tasks';
import AddTask from 'components/AddTask';
import NotFound from 'components/common/NotFound';
import Register from 'components/Register';
import Login from 'components/Login';

export default () => (
  <Provider>
    <AppWrapper>
      <Router>
        <App path="/app/" component={App} />
        <Screams path="/app/screams/" component={Screams} />
        <Scream path="/app/scream/:id" component={Scream} />
        <Tasks path="/app/tasks/" component={Tasks} />
        <Register path="/app/register/" component={Register} />
        <Login path="/app/login/" component={Login} />
        <Task path="/app/task/:id" component={Task} />
        <AddTask path="/app/task/new" component={AddTask} />
        <NotFound default component={NotFound} />
      </Router>
    </AppWrapper>
  </Provider>
);
