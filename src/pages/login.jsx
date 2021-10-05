import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button"
import { Link } from 'react-router-dom';
import AuthUser  from "../service/auth";

export class Login extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.usernameChanged = this.usernameChanged.bind(this);
      this.passwordChanged = this.passwordChanged.bind(this);
      this.checkInput = this.checkInput.bind(this)
  
      this.state = {
        username: "",
        password: "",
        loading: false,
        message: ""
      };
    }

     handleLogin(event) {
         event.preventDefault();
         this.setState({loading: true, message:''});

         this.form.validateAll();

         if (this.checkBtn.context._errors.length === 0) {
            AuthUser.login(this.state.username, this.state.password).then(
              () => {
                this.props.history.push("/me");
                window.location.reload();
              }, error => {
                  const errorMessage = error.message;
                  this.setState({
                  loading: false,
                  message: errorMessage,
                })
              } 
            )
     } else {
        this.setState({
            loading: false,
          })
     }
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
                        onSubmit={this.handleLogin}
                        ref={login => {
                            this.form = login;
                        }}
                    >
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
                            <label htmlFor="password">Password</label>
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
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >Login</button>
                            <button className="btn"><Link to='signup' className="btn-nav-to">Sign Up</Link></button>
                        </div>
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

