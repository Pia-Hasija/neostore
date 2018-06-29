import React, {Component} from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import axios from 'axios';
import { Switch, Link,Redirect } from 'react-router-dom';
import './registration.css';

export default class Login extends Component {

    render(){
        return(
            [
                <Header />,
                <div>Login Page</div>,
                <Footer />
            ]
        )
    }
}