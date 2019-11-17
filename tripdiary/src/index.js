import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, BrowserRouter, Switch} from 'react-router-dom'; 
import Login from './Components/Login'; 
import Feed from './Components/Feed'; 
import imageUpload from './Components/imageUpload'; 
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/feed" component={Feed}/>
            <Route path="/imageUpload" component={imageUpload}/>
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
serviceWorker.unregister();
