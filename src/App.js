import React, { Component } from "react"
import { Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { UserPage } from "./pages/user-page";
import AuthUser from "./service/auth";
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined
        }

    }

    componentDidMount() {
        const user = AuthUser.getUser();
    
        if (user) {
        this.setState({ currentUser: user})
        }
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path={['/','/login']} exact>
                        <Login />
                    </Route>
                    <Route path='/signup'>
                        <SignUp />
                    </Route>
                    <Route path='/me' >
                        <UserPage />
                    </Route>
                </Switch>
            </div>
        )
    }
}


