
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import React from 'react';

import Inicio from './screens/inicio/Inicio';

const history = createBrowserHistory();

const Routes = () => (
    <>
        <Router history={history}>
            <Switch>
                <Route path="*" component={Inicio} />
            </Switch>
        </Router>
        <ToastContainer />
    </>
);

export default Routes;
