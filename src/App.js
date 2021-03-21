import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignPage from './pages/SignPage';
import MainPage from './pages/MainPage';
import ApplyPage from './pages/ApplyPage';
import ErrorPage from './pages/ErrorPage';
import ManagePage from './pages/ManagePage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/main" component={MainPage} />
                <Route path="/apply" component={ApplyPage} />
                <Route path="/manage" component={ManagePage} />
                <Route path="/" exact component={SignPage} />
                <Route render={ErrorPage} />
            </Switch>
        </Router>
    );
}

export default App;
