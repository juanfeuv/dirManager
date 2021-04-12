
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';

import React from 'react';

import Inicio from './screens/inicio/Inicio';
import NotFound from './screens/notFound/NotFound';

const history = createBrowserHistory();

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Inicio} />
            <Route path="*" component={NotFound} history={history} />
        </Switch>
    </Router>
);

export default Routes;
