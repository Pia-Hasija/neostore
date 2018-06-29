import React, {Component} from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap.js';
// import { Navbar, Nav, Input, NavbarHeader,NavDropdown,MenuItem,FormControl, NavbarForm, NavItem, Jumbotron, Button } from 'react-bootstrap';
import { Switch, Link } from 'react-router-dom';

export default class Header extends Component {
	// componentDidMount() {

	// 	$('.toggleInput').bootstrapToggle();


	// }
    render () {
        return (					
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand" href="#"><i className="fa fa-shopping-bag" >NeoStore</i></a>
					</div>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						
						<ul className="nav navbar-nav fa fa-user">
							<li className="active"><a href="#">Login <span className="sr-only">(current)</span></a></li>
							<li><Link to={`/auth/register`}>Register</Link></li>
						</ul>
						<form className="navbar-form navbar-left" role="search">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Search"/>
						</div>
						<button type="submit" className="btn btn-default">Submit</button>
						</form>
					</div>
				</div>
			</nav>
        	);
    }
}


