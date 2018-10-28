import React from 'react';
import { Route, Switch } from 'react-router';
import LandingPage from './container/LandingPage';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={LandingPage} />
            </Switch>
        );
    }
};
export default Routes;
