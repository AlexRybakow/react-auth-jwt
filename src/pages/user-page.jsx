import React, { Component } from "react";
import AuthUser from "../service/auth";

export class UserPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
      newUser: AuthUser.getUser()
      }
    }

    render() {
    const { newUser } = this.state;
        return (
        <div className="containter">
            <div className="header">
        <h3 className="greeting">Hello, { newUser.username }</h3>
            </div>
        <p className="text-content">Token is valid</p>
        </div>
        )
    }
}