import React, {Component} from 'react';
import Home from './Homepage/Home';
import ProductDetail from './ProductDetail/ProductDetail';
import TermsAndConditions from './Static/TermsAndConditions';
import GuaranteePolicy from './Static/GuaranteePolicy';
import PrivacyPolicy from './Static/PrivacyPolicy';
import UserRegistration from './User/UserRegistration';
import Login from './User/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/styles.css';
import ProductList from './ProductDetail/ProductList';

export default class App extends Component {

    render () {
        return (
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/product/details/:id' component={ProductDetail} />    
                <Route exact path='/info/terms-conditions' component={TermsAndConditions} />
                <Route exact path='/info/guarantee-return-policy' component={GuaranteePolicy} />
                <Route exact path='/info/privacy-policy' component={PrivacyPolicy} />
                <Route exact path='/auth/register' component={UserRegistration} />
                <Route exact path='/auth/login' component={Login} />
                <Route exact path='/product/list' component={ProductList} />
            </Switch>
                </div>
            );
    }
}


