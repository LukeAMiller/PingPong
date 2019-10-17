import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom"
import Pong from './Pong'
ReactDOM.render(<Router>
    <Pong/>
    </Router>, document.getElementById('root'));

