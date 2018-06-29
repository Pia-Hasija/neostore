import React, {Component} from 'react';
// import '.../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';
// import { Navbar, Nav, Input, NavbarHeader,NavDropdown,MenuItem,FormControl, NavbarForm, NavItem, Jumbotron, Button } from 'react-bootstrap';

export default class Footer extends Component {
    render(){
        return(
            <footer className="footer">
                <div className="container text-center">
                    <div className="row">
                    <div className="col-md-4">
                        <h4 >About Company</h4>
                        <div >
                        <p>NeoSOFT Technologies is here at your quick and easy service for shooping .</p>
                        <h6>Contact information</h6>
                        <p>Email: contact@neosofttech.com</p>
                        <p>Phone: +91 0000000000</p>
                        <p>MUMBAI, INDIA</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <h4 >Information</h4>
                        <ul className="list-unstyled">
                        <li>
                        <Link to={`/info/terms-conditions`}>Terms &amp; Conditions</Link>
                        </li>
                        <li>
                            <Link to="/info/guarantee-return-policy">Guarantee &amp; Return Policy</Link>
                        </li>
                        <li>
                            <a >Contact us</a>
                        </li>
                        <li>
                            <Link to="/info/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                            <a>Locate Us</a>
                        </li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h4 >Newsletter</h4>
                        <form>
                        <div>
                            <p>Sign up to get exclusive offers from our favorite brands and to be well up in the news.</p>
                            <div className="form-group">
                            <input type="text" className="form-control" placeholder="your email..." />
                            </div>
                            <button type="button" tooltip="Coming Soon" className="btn btn-default">Subscribe</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="container">
                    <p className="copywrite text-center">Copyright © 2017 NeoSOFT Technologies All rights reserved | Design by <a href="http://www.neosofttech.com/">NeoSOFT Technologies</a></p>
                </div>
                </footer>
        )
    }
}