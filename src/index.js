import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/Components/App/App';
// import registerServiceWorker from './registerServiceWorker';
// import { Route } from 'react-router';
import { HashRouter, Route } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <div>
            <Route path='/' component={App}/>
        </div>
    </HashRouter>
    , document.getElementById('root'));
// registerServiceWorker();
