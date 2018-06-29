import React, {Component} from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import axios from 'axios';
import {Carousel, CarouselItem, CarouselCaption} from 'react-bootstrap';
import { Switch, Link,Redirect } from 'react-router-dom';
import './registration.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export default class Registration extends Component {
    
    registerUser = (data) =>{
        console.log('data',data);
        let userInfo = {
            first_name: '',
            last_name: '',
            gender: data.gender,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            username: '',
            role: 'AppUser',
            orderId: '',
            shoppingcartId: '',
            is_active: true,
            birth_of_date: 0,
            confirmPassword:''
          }
       axios.post("http://180.149.241.208:3000/api/user_accounts",userInfo)
            .then(response =>{
                console.log('Hi');
                return <Redirect to='/auth/login' />
            })     
            .catch(function (error) {
                if(error.statusCode==422){
                    alert(error.details.message[0]);
                }
              });
    }

    // validateUser = (data) =>{        
    //         return (
    //           this.state.email.length > 0 &&
    //           this.state.password.length > 0 &&
    //           this.state.password === this.state.confirmPassword
    //         );        
    // }
    // validateConfirmationForm() {
    //     return this.state.confirmationCode.length > 0;
    //   }

    //   handleChange = event => {
    //     this.setState({
    //       [event.target.id]: event.target.value
    //     });
    //   }

    //   handleSubmit = async event => {
    //     event.preventDefault();
    
    //     this.setState({ isLoading: true });
    
    //     this.setState({ newUser: "test" });
    
    //     this.setState({ isLoading: false });
    //   }
    
    //   handleConfirmationSubmit = async event => {
    //     event.preventDefault();
    
    //     this.setState({ isLoading: true });
    //   }
    render(){
        return(
          [
              <Header />,
              <RegForm submit={this.registerUser} />,
              <Footer />
          ]              
        );
    }
    
}

class RegForm extends Component {
    constructor (props) {
        super(props);
        this.state = {                        
                confirmPassword:'',
                phoneNumber: '',                
                email: '',
                password: '',
                formErrors: {email: '', password: '',confirmPassword: '',phoneNumber:''},
                emailValid: false,
                passwordValid: false,
                confirmPasswordValid: false,
                phoneValid: false,
                formValid: false       
            }
    }
    handleUserInput (e) {
        e.persist();
        // console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => { this.validateField(name, value) });    
      }
    validateField(fieldName, value) {
        // console.log(value);
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        let phoneValid = this.state.phoneValid;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            break;
          case 'confirmPassword':
            confirmPasswordValid = value==this.state.password;
            fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': ' do not match password';
            break;
          case 'phoneNumber':
            phoneValid = value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
            fieldValidationErrors.phoneNumber = phoneValid ? '': ' is not valid';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        confirmPasswordValid: confirmPasswordValid,
                        phoneValid:phoneValid
                      }, this.validateForm);
      }
      
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid && this.state.phoneValid});
      }

      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
     }

     submitForm = (e) =>{
         e.preventDefault();
         if(this.state.formValid){
             let user = {email: this.state.email, password: this.state.password,confirmPassword: this.state.confirmPassword,phoneNumber:this.state.phoneNumber}
             this.props.submit(user);
         }
     }

     responseFacebook(response) {
        console.log(response);
      }
      
    render(){
    return(
        <div className="container">
                <div className="col-md-5">
                    <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="text-center text-muted">Register to NeoSTORE</h2>
                    </div>
                    <div className="panel-body">
                        <p className="text-muted text-center">EASILY USING</p>
                        {/* <button className="btn btn-default btn-lg">
                        <i className="fa fa-facebook fa-lg  text-primary" ></i>
                        Facebook
                        </button> */}
                        <FacebookLogin
                            appId="2510809019144738"
                            autoLoad
                            callback={this.responseFacebook}
                            fields="name,email,gender"
                            render={renderProps => (
                                <button onClick={renderProps.onClick}>FB button</button>
                            )}
                            />
                        <button className="btn btn-default btn-lg pull-right">
                        <i className="fa fa-google fa-lg text-danger"></i>
                        Google
                        </button>
                        <p className="text-muted text-center">--OR USING--</p>                        

                        <form className="form-custom" autocomplete="on" method="post" onSubmit={(e)=>this.submitForm(e)}>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                            <input type="email" 
                                name="email"
                                className="form-control" 
                                formControlName="email"
                                placeholder="Your Email Address" 
                                value={this.state.email} 
                                onChange={(event) => this.handleUserInput(event)} />                     
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                            <input type="password"
                                validateEqual="confirmPassword"
                                reverse="true"                   
                                className="form-control" 
                                formControlName="password"                                       
                                placeholder="Choose Password" 
                                value={this.state.password}
                                name="password"
                                onChange={(event) => this.handleUserInput(event)} />               
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.confirmPassword)}`}>
                                <input type="password"
                                    validateEqual="password"
                                    reverse="false"                     
                                    className="form-control" 
                                    formControlName="confirmPassword"                    
                                    placeholder="Confirm Password" 
                                    value={this.state.confirmPassword}
                                    name="confirmPassword"
                                    onChange={(event) => this.handleUserInput(event)} />          
                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.phoneNumber)}`}>                     
                                <input type="number" 
                                    className="form-control" 
                                    formControlName="phoneNumber"                    
                                    placeholder="Enter Phone Number"
                                    value={this.state.phoneNumber}
                                    name="phoneNumber"
                                    onChange={(event) => this.handleUserInput(event)} />            
                            </div>
                            <legend className="gender-legend">I'm</legend>
                            <div className="checkbox" >
                            <label>
                                <input type="radio" 
                                       formControlName="gender" 
                                       value="male" 
                                       name="gender"/> 
                                       <strong>Male</strong>
                            </label>
                            <label>
                                <input type="radio" 
                                       formControlName="gender" 
                                       value="female" 
                                       name="gender"/>
                                       <strong>Female</strong>
                            </label>
                            </div>         
                            <button type="submit" disabled={!this.state.formValid} className="btn btn-lg btn-primary btn-block">Register</button>                        
                        </form>
                    </div>
                    </div>
                </div>
            </div>
    )
}
}

export const FormErrors = ({formErrors}) =>{
return(
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
)
}
