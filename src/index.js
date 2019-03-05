import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducer'
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import './config'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/authroute/authRoute'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
))

function Boss() {
    return <h2>Boss Page</h2>
}

ReactDOM.render(
    (
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path='/boss' component={Boss}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/Register' component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>
),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
