import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css';

ReactDOM.render( <BrowserRouter ><App /></BrowserRouter>, document.getElementById('root') );
