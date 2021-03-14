import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignPage from './pages/SignPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/main" component={MainPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/" exact component={SignPage} />
                <Route render={ErrorPage} />
            </Switch>
        </Router>
    );
}

export default App;
