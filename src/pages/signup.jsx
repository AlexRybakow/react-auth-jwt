import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button"
import { Link } from 'react-router-dom';
import AuthUser from "../service/auth";

export class SignUp extends Component {
    constructor(props) {
      super(props);
      this.handleSignUp = this.handleSignUp.bind(this);
      this.emailChanged = this.emailChanged.bind(this);
      this.usernameChanged = this.usernameChanged.bind(this);
      this.passwordChanged = this.passwordChanged.bind(this);
      this.checkInput = this.checkInput.bind(this);
  
      this.state = {
        email:"",
        username: "",
        password: "",
        success: false,
        message: ""
      };
    }
    
    handleSignUp(event) {
        event.preventDefault();
        this.setState({ success: false, message: '' });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthUser.signUp( this.state.username, this.state.email, this.state.password
            ).then(
              response => {
                this.setState({
                  message: response.data.message,
                  success: true
                });
              },
              error => {
                const errorMessage = error.message;
      
                this.setState({
                  success: false,
                  message: errorMessage
                });
              }
            );
          }
        }

        emailChanged(event) {
            this.setState({
            email: event.target.value})
        }

        usernameChanged(event) {
            this.setState({
            username: event.target.value})
        }
   
        passwordChanged(event) {
           this.setState({
           password: event.target.value})
       }

        checkInput = (value) => {
        if (!value) {
          return (
            <div className="alert-danger" role="alert">
             Please fill in this field!
            </div>
          );
        }
      };

       render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.handleSignUp}
                        ref={reg => {
                            this.form = reg;
                        }}
                    >
                        {!this.state.success && (
                            <div>
                                <div className="user-input">
                                    <label htmlFor="email">E-mail</label>
                                    <Input
                                        type="email"
                                        name="username"
                                        className="form-input"
                                        value={this.state.email}
                                        onChange={this.emailChanged}
                                        validations={[this.checkInput]}
                                    />
                                </div>
                                <div className="user-input">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        name="username"
                                        className="form-input"
                                        value={this.state.username}
                                        onChange={this.usernameChanged}
                                        validations={[this.checkInput]}
                                    />
                                </div>
                                <div className="user-input">
                                    <label htmlFor="username">Password</label>
                                    <Input
                                        type="password"
                                        name="password"
                                        className="form-input"
                                        value={this.state.password}
                                        onChange={this.passwordChanged}
                                        validations={[this.checkInput]}
                                    />
                                </div>
                                <div className="user-input">
                                    <button type="submit"
                                        className="btn btn-primary btn-block"
                                    >Sign Up</button>
                                    <button className="btn"><Link to='login' className="btn-nav-to">Login</Link></button>
                                </div>
                            </div>
                        )}
                        {this.state.message && (
                            <div className="user-input">
                                <div className="alert-danger" role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={check => {
                                this.checkBtn = check;
                            }}
                        />
                    </Form>
                </div>
            </div>
        )
  }
}
