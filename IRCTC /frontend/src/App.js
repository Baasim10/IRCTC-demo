import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Trains from './components/Trains';
import Book from './components/Book';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/trains" component={Trains} />
                <Route path="/book/:id" component={Book} />
            </Switch>
        </Router>
    );
};

export default App;
