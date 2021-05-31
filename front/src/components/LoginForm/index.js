import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

// composants import
import Header from '../Header';
import Footer from '../Footer';

// style import
import './style.scss';

//auth import
import { login } from '../../services';


class LoginForm extends Component {
  /* initial state of form */

  state = {
    email: '',
    password: '',
  };

  onEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }; // focus on email data

  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }; // focus on password data

  handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,

    }; // when we click on valid button , the initial state change

    const message = 'il y a une erreur sur l\'email ou le mot de passe';
    console.log('data', data);
    try {
      const response = await login({ email: data.email, password: data.password });
      console.log(response);
      this.props.history.push('/');
    }
    catch ({ response }) {
      console.log(response);
    }
    // we verify that there is a user with this email and password or we send an error
  };

  render() { // = the visuel
    if (this.props.history.location.state) {
      this.state.password = this.props.history.location.state[0];
      this.state.email = this.props.history.location.state[1];
    }

    return (
      <div className="loginForm_container">
        <Header />
        <form className="login" onSubmit={this.handleSubmit}>
          <div className="login_loginForm">
            <input
              type="email"
              className="loginForm_pseudo"
              id="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.onEmailChange}
              required
            />
            <input
              type="password"
              className="loginForm_password"
              id="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              required
            />
            <button type="submit" className="loginForm_validButton"><div className="validButton_validLogin">Me connecter</div></button>
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

export default LoginForm;
